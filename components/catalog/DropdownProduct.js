import { useState } from "react"

export default function DropdownProduct(props) {

    const [open, setOpen] = useState(0)

    return (
        <div className={`${open ? "shadow mb-1" : ""} font-Ubuntu`}>
            <div 
                className={`w-full ${open ? "bg-ui-grey" : "bg-ui-white"} h-44px flex flex-row justify-between items-center px-2 border-b border-ui-blueishGrey font-Ubuntu group transition duration-300`}
                onClick={() => setOpen(!open)}
            >
                <div className={`${open ? "font-medium" : "font-normal"} flex-grow text-lg-14 text-type-grey group-hover:text-type-manatee transition duration-300 flex flex-row justify-start items-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-4 w-4 text-accent-accent mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <div>
                        {props.name}
                    </div>
                </div>

                <div className="md:w-200px flex flex-row justify-between items-center">
                    <div className="text-lg-14 font-medium text-type-manatee mr-2 md:mr-0">
                        4mm
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-4 w-4 text-ui-blueishGrey group-hover:text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-4 w-4 text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            </div>

            <div className={`${open ? "block" : "hidden"} w-full`}>
                {props.options.map((option, index)=>
                    <label 
                        className="w-full bg-ui-white h-44px flex flex-row justify-between items-center px-4"
                        key={index}
                    >
                        <div className="flex-grow text-lg-14 text-type-grey flex flex-row justify-start items-center">
                            <input { ...props.register( props.name+"-"+option.name ) } type="radio" className="h-4 w-4 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent focus:bg-accent-accent focus:outline-none mr-2 transition duration-300" name={props.name}></input>
                            <div>
                                {option.name}
                            </div>
                        </div>
                        <div className="md:w-200px text-lg-14 font-medium text-type-grey">
                            {option.price}
                        </div>
                    </label>
                )}
                <div className="w-full flex flex-row justify-start items-center px-4 py-14px">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px text-accent-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div className="text-lg-14 text-accent-accent">
                        Comandați o altă dimensiune
                    </div>
                </div>
            </div>
        </div>
    )
}