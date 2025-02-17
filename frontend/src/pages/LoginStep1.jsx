


import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import SecondaryButton from "./SecondaryButton.jsx";
import Context from '../context/AppContext.jsx';

function LoginStep1() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [activeSection, setActiveSection] = useState("PHONE");
  const [mobileNumber, setMobileNumber] = useState('');
  const hasNavigated = useRef(false); // Uncommented this line
  const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    initOTPless(handleUserData);
  }, []);

  const handleUserData = async (otplessUser) => {
    if (hasNavigated.current) return; 

    const identityValue =
      otplessUser?.identities?.[0]?.identityValue || "No Identity Found";

    setGlobalMobileNumber(identityValue); 

    try {
      const response = await axios.post("/api/auth/login/checkuserexistance2", {
        phoneNumber: identityValue,
      });

      if (response.data.message === "Login successful") {
        hasNavigated.current = true; 
        navigate("/success-login"); 
      } else {
        navigate("/signup"); 
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      alert("User does not exist please signup.");
    }

    localStorage.setItem("otplessUser", JSON.stringify(otplessUser)); 
  };

  const switchActiveSection = (e) => {
    setActiveSection(e.target.value);
    setPhone("");
    setEmail("");
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">
          
        </div>
        <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
          Welcome back to{" "}
          <span className="text-[#85e7a7] font-semibold">Secure Sign</span>, please
          log in to continue
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <div>
          <input
            type="radio"
            id="mobile"
            name="section"
            value="PHONE"
            checked={activeSection === "PHONE"}
            onChange={switchActiveSection}
          />
          <label htmlFor="mobile" className="ml-2">Mobile</label>
        </div>

        {activeSection === "PHONE" && (
          <div id="mobile-section">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded"
              id="mobile-input"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={() => {
                Authenticate({ channel: "PHONE", phone })
                  .then((res) => {
                    if (res.success) {
                      document.getElementById("mobile-input").disabled = true;
                    }
                  })
                  .catch((error) => {
                    console.error("Authentication error:", error);
                  });
              }}
              className="w-full py-2 bg-red-600 text-white rounded mt-2"
            >
              Proceed
            </button>
          </div>
        )}

        <div id="otp-section">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded"
            id="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            minLength={6}
            maxLength={6}
          />
          <button
            onClick={() => {
              verifyOTP({ channel: activeSection, otp, phone, email })
                .then((res) => {
                  if (res.success) {
                    document.getElementById("otp-input").disabled = true;
                    setOtp("Verified");
                  }
                })
                .catch((error) => {
                  console.error("OTP verification error:", error);
                });
            }}
            className="w-full py-2 bg-red-600 text-white rounded mt-2"
          >
            Verify OTP
          </button>
        </div>

        <button
          onClick={() =>
            Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })
          }
          // className="w-full py-2 bg-green-600 text-white rounded mt-2"
        >
          Authenticate with WhatsApp
        </button>

        <div className="flex items-center justify-between mt-4">
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
          <span className="text-[#B8BFC7] text-xs">Don't have an account?</span>
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
        </div>

        <SecondaryButton title="SignupStep1" action={() => navigate("/SignupStep1")} />

        <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
          Don't have an account? Sign up to access your personalized dashboard
          and experience our services
        </div>
      </div>
    </div>
  );
}

export default LoginStep1;
