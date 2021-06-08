import { useState } from "react"

export default function DropdownProduct(props) {

    const [open, setOpen] = useState(0)
    const [chosen , setChosen] = useState(0)
    const handleClick = (e) => {
        if(props.options.length != 1) {
            if(chosen == e.target.value){
                setChosen(0)
            }
            else{
                setChosen(e.target.value)
            }
        }
        else{
            chosen ? setChosen(0) : setChosen(e.target.value)
        }
        console.log(chosen)
    }

    return (
        <div className={`${open ? "shadow mb-1" : ""} font-Ubuntu`}>
            <div 
                className={`w-full ${open ? "bg-ui-grey" : "bg-ui-white"} h-auto py-3 flex flex-row justify-between items-start px-2 border-b border-ui-blueishGrey font-Ubuntu group transition duration-300`}
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
                        {props.options.length != 1 ? chosen ? chosen : "" : chosen ? "Da" : ""}
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-4 w-4 text-ui-blueishGrey group-hover:text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-4 w-4 text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            </div>

            <div 
                className={`${open ? "block" : "hidden"} w-full`}
                // onChange={(e) => {
                //     if(props.options.length != 1) {
                //         if(chosen == e.target.value){
                //             setChosen(0)
                //         }
                //         else{
                //             setChosen(e.target.value)
                //         }
                //     }
                //     else{
                //         chosen ? setChosen(0) : setChosen(e.target.value)
                //     }
                //     console.log(chosen)
                // }}
            >
                {props.options.map((option, index)=>
                    <label 
                        className={`w-full bg-ui-white h-auto py-3 flex flex-row justify-between items-start px-4 ${props.options.length != 1 ? chosen==option.typename ? "text-type-dark":"text-type-grey hover:text-type-manatee" : chosen ? "text-type-dark" : "text-type-grey hover:text-type-manatee"} transition duration-300`}
                        key={index}
                    >
                        <div className="flex-grow text-lg-14 flex flex-row justify-start items-center">
                            {
                                props.options.length != 1?
                                <input 
                                    { ...props.register( props.name+"-"+option.name ) } 
                                    type="radio" 
                                    className="h-4 w-4 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                                    name={props.name}
                                    value={option.typename}
                                    checked={chosen == option.typename}
                                    onClick={e => handleClick(e)}
                                />
                                :
                                <input 
                                    { ...props.register( props.name+"-"+option.name ) } 
                                    type="checkbox" 
                                    className="h-4 w-4 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                                    name={props.name}
                                    value={option.name}
                                    onClick={(e) => handleClick(e)}
                                />
                            }
                            <div>
                                {props.options.length != 1? option.typename : option.name}
                            </div>
                        </div>
                        <div className="md:w-200px text-lg-14 font-medium">
                            {option.price} lei
                        </div>
                    </label>
                )}
                {/* <div className="w-full flex flex-row justify-start items-center px-4 py-14px">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px text-accent-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div className="text-lg-14 text-accent-accent">
                        Comandați o altă dimensiune
                    </div>
                </div> */}
            </div>
        </div>
    )
}