
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAvailabilityContext } from "../AvailabilityContext";
import SecondaryButton from "./SecondaryButton.jsx";
import Context from '../context/AppContext.jsx';

function SignupStep1() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [activeSection, setActiveSection] = useState("PHONE");
  const [mobileNumber, setMobileNumber] = useState('');
  const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    initOTPless(handleUserData);
  }, []);

  const handleUserData = async (otplessUser) => {
    console.log(otplessUser);

    const identityValue =
      otplessUser?.identities?.[0]?.identityValue || "No Identity Found";
    setMobileNumber(identityValue);
    setGlobalMobileNumber(identityValue);
  

    try {
      const response = await axios.post("/api/auth/signup/checkuserexistance", {
        phoneNumber: identityValue,
      });

      if (response.data.userExists) {
        navigate("/login");
      } else {
        navigate("/success-signup");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      alert("User already exist please login.");
    }

    localStorage.setItem("otplessUser", JSON.stringify(otplessUser));
  };

  const switchActiveSection = (e) => {
    setActiveSection(e.target.value);
    setPhone("");
    setEmail("");
  };

  const handleProceed = async () => {
    try {
      if (activeSection === "PHONE") {
        const res = await Authenticate({ channel: "PHONE", phone });
        if (res.success) {
          document.getElementById("mobile-input").disabled = true;
        }
      } else if (activeSection === "EMAIL") {
        const res = await Authenticate({ channel: "EMAIL", email });
        if (res.success) {
          document.getElementById("email-input").disabled = true;
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred during authentication.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await verifyOTP({
        channel: activeSection,
        otp,
        phone,
        email,
      });
      if (res.success) {
        document.getElementById("otp-input").disabled = true;
        setOtp("Verified");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="font-Montserrat text-2xl font-bold leading-10 text-[#1A1C1F]">
          Welcome Back
        </div>
        <div className="text-[#1A1C1F] font-medium text-[14px] mt-1 sm:text-[14px]">
          Welcome back to{" "}
          <span className="text-[#E40443] font-semibold">DOOPER</span>, please
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
          <label htmlFor="mobile">Mobile</label>
          {/* <input
          type="radio"
          id="email"
          name="section"
          value="EMAIL"
          checked={activeSection === 'EMAIL'}
          onChange={switchActiveSection}
        />
        <label htmlFor="email">Email</label> */}
        </div>

        {activeSection === "PHONE" && (
          <div id="mobile-section">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded"
              id="mobile-input"
              placeholder="Enter mobile number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleProceed}
              className="w-full py-2 bg-red-600 text-white rounded"
            >
              Proceed
            </button>
          </div>
        )}

        {/* {activeSection === "EMAIL" && (
          <div id="email-section">
            <input
              id="email-input"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleProceed} >Proceed</button>
          </div>
        )} */}

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
            onClick={handleVerifyOTP}
            className="w-full py-2 bg-red-600 text-white rounded"
          >
            Verify OTP
          </button>
        </div>

        <button
          onClick={() =>
            Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })
          }
        >
          Authenticate with WhatsApp
        </button>
        {/* <button onClick={() => Authenticate({ channel: 'OAUTH', channelType: 'GOOGLE' })}>
        Authenticate with Gmail
      </button> */}
        <div className="flex items-center justify-between mt-4">
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
          <span className="text-[#B8BFC7] text-xs">
            Already have an account?
          </span>
          <hr className="flex-1 bg-[#B8BFC7] h-[1px]" />
        </div>

        <SecondaryButton title="Login" action={() => navigate("/login")} />
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex items-center text-sm font-normal text-[#000000]">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-2 border-[#4B465C]"
          />
          By signing up you agree to{" "}
          <a href="#" className="text-[#E40443]">
            Terms of use
          </a>
        </div>
        <div className="flex items-center text-sm font-normal text-[#000000]">
          <input
            type="checkbox"
            className="mr-2 h-4 w-4 border-2 border-[#000000]"
          />
          Get updates on WhatsApp
        </div>
      </div>

      <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
        Join the community of smart and experienced doctors. Login to access
        your personalized dashboard, track your record or process and get
        informed by our services
      </div>
    </div>
  );
}

export default SignupStep1;