import { useState } from "react"
import { Rotate } from "react-awesome-reveal";

export default function Question (props) {

    const [open, setOpen] = useState(0)

    return (
        <div 
            className="w-full cursor-pointer group"
            onClick={() => {
                setOpen(!open)
            }}
        >
            <div className="w-full h-auto flex flex-row justify-between py-4 px-2 items-center text-lg-p text-type-manatee font-medium group-hover:text-accent-dark transition duration-300">
                <span className="mr-4">
                    {props.question}
                </span>

                <Rotate left className={`${open ? "block" : "hidden"} h-6 w-6`} duration={500}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </Rotate>

                <Rotate left className={`${open ? "hidden" : "block"} h-6 w-6`} duration={500}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </Rotate>

            </div>

            <div className={`${open ? "block" : "hidden"} w-full px-4 pt-2 pb-6 text-type-grey text-lg-p font-normal`}>
                {props.answer}
            </div>

            <div className="w-full h-px bg-ui-blueishGrey"/>
        </div>
    )
}