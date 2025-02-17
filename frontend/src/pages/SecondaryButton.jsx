

import React from 'react'

export default function SecondaryButton(props) {
    return (
        <button className="font-Montserrat font-[600] text-[14px] text-primary01 leading-[116%] bg-primary07 px-[24px] py-[14px] rounded-[8px] sm:w-full w-full sm:ml-0 ml-full mt-7 " onClick={()=>{props.action()}}>{props.title}</button>
    )
}
