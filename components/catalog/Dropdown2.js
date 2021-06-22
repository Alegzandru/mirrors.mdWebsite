import { useState } from "react"

export default function Dropdown2 (props) {

    const [open, setOpen] = useState(0)

    return (
        <div className="w-auto cursor-pointer">

            <div 
                className={`flex flex-row justify-between items-start text-accent-accent text-lg-14 hover:text-accent-dark transition duration-300 ${open? "text-accent-dark bg-ui-grey w-190px" : ""} p-2`}
                onClick={() => setOpen(!open)}
            >
                <div className="mr-2">
                    {props.options[props.chosen].name}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" className={`${open? "hidden" : "block"} h-14px w-14px`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" className={`${open? "block" : "hidden"} h-14px w-14px`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </div>

            <div className={`w-190px bg-ui-white ${open? "block" : "hidden"} absolute z-30`}>
                {props.options.filter(option => option.name != props.options[props.chosen].name).map((option) => 
                    <div 
                        key={option.index} 
                        className="w-full p-2 mb-2 text-lg-14 text-type-grey"
                        onClick={() => props.handleChange(option.index)}
                    >
                        {option.name}
                    </div>
                )}
            </div>

        </div>
    )
}