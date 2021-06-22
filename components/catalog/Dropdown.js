import { useState, useEffect, useRef } from "react"

export default function Dropdown (props) {

    const [open, setOpen] = useState(0)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(0)
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return(
        <div 
            className="w-full"
            ref={wrapperRef}
        >
            <div 
                className={`w-full h-52px ${open ? "bg-ui-grey text-type-dark z-30" : "text-type-manatee bg-ui-white"} border-t lg:border-t-0 border-l lg:border-l-0 border-r border-b border-option-border-color px-3 flex flex-row justify-between items-center text-lg-p group hover:shadow-inner transition duration-300`}
                onClick={ ()=> setOpen(!open)}
            >
                <div className="flex flex-row justify-start items-center">
                    <div className={`h-10px w-10px mr-10px ${props.active == true ? "block" : "hidden"} bg-accent-accent rounded-full`}/>
                    {props.name}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-20px w-20px group-hover:text-type-manatee text-ui-blueishGrey transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-20px w-20px text-type-dark`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>

            </div>

            <div className={`lg:w-dropdown ${open ? "block" : "hidden"} relative lg:absolute card2-shadow z-30`}>
                {props.filterOptions.map((option, index) => 
                    <label key={index} className="w-full h-12 bg-ui-white text-lg-14 text-type-manatee px-4 flex flex-row justify-start items-center hover:bg-ui-grey hover:text-accent-accent transition duration-300 cursor-pointer">
                        <input 
                            type="checkbox"
                            { ...props.register(props.name) } 
                            value={option.value}
                            className="mr-3"
                        />
                        {option.value}
                    </label>
                )}
            </div>
            
        </div>
    )
}