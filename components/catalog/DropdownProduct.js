import { useEffect, useState, useContext } from "react"
import {PopupContext} from "../context"
import { useForm } from "react-hook-form";

export default function DropdownProduct(props) {

    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [open, setOpen] = useState(0)
    const [chosen , setChosen] = useState(0)
    const [lastChosen, setLastChosen] = useState(0)
    const [checked, setChecked] = useState(0)
    const [openCustom, setOpenCustom] = useState(0)
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
            setChecked(!checked)
        }
    }

    const onSubmit = (data) => {
        if(lastChosen === 0){
            props.setPrice(Math.trunc(props.price + ( data.width * data.height / 1000000 * props.m2price * (1 + props.coeficientFinder(data))) - props.initialPrice))
            setLastChosen("custom")
        }
        else if(lastChosen == "custom"){
            props.setPrice(props.price + Math.trunc(data.width * data.height / 1000000 * props.m2price * (1 + props.coeficientFinder(data))) - Math.trunc(props.sizeGlobal.width * props.sizeGlobal.height / 1000000 * props.m2price * ( 1 + props.coeficientFinder(props.sizeGlobal))))
            setLastChosen("custom")
        }
        else{
            let lastOptionPriceRaw = props.options.filter((option) => option.typename == lastChosen)
            let lastOptionPrice = lastOptionPriceRaw[0].price
            props.setPrice(props.price + Math.trunc(data.width * data.height / 1000000 * props.m2price * (1 + props.coeficientFinder(data))) - lastOptionPrice)
            setLastChosen("custom")
        }
        props.setSizeGlobal(
            {
                height : data.height,
                width : data.width,
            }
        )        
    }

    useEffect(() => {
        if(checked === 0 ){
        }
        else if(checked){
            props.setPrice(props.price + props.options[0].price)
        }
        else{
            props.setPrice(props.price - props.options[0].price)
        }
    }, [checked])

    useEffect(() => {
        if(chosen === 0){
        }
        else{
            let optionPriceRaw = props.options.filter((option) => option.typename == chosen)
            let optionPrice = optionPriceRaw[0].price
            if(lastChosen === 0){
                if(props.name == "Dimensiuni recomandate"){
                    props.setPrice(props.price + optionPrice - props.initialPrice)
                    props.setSizeGlobal({
                        height : optionPriceRaw[0].height,
                        width : optionPriceRaw[0].width
                    })
                }
                else{
                    props.setPrice(props.price + optionPrice)
                }
                setLastChosen(chosen)
            }
            else if(lastChosen == "custom"){
                props.setPrice(props.price + optionPrice - Math.trunc(props.sizeGlobal.width * props.sizeGlobal.height / 1000000 * props.m2price * (1 + props.coeficientFinder(props.sizeGlobal))))
                props.setSizeGlobal({
                    height : optionPriceRaw[0].height,
                    width : optionPriceRaw[0].width
                })
                setLastChosen(chosen)
            }
            else{
                let lastOptionPriceRaw = props.options.filter((option) => option.typename == lastChosen)
                let lastOptionPrice = lastOptionPriceRaw[0].price
                
                if(props.name == "Dimensiuni recomandate"){
                    props.setSizeGlobal({
                        height : optionPriceRaw[0].height,
                        width : optionPriceRaw[0].width
                    })
                }
                
                props.setPrice(props.price + optionPrice - lastOptionPrice)
                setLastChosen(chosen)
            }
        }
    }, [chosen])

    return (
        <div className={`${open ? "shadow mb-1" : ""} font-Ubuntu`}>
            <div 
                className={`w-full ${open ? "bg-ui-grey" : "bg-ui-white border-b border-ui-blueishGrey"} h-auto py-3 flex flex-row justify-between items-start px-2 font-Ubuntu group transition duration-300 cursor-pointer`}
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
                        {props.name == "Dimensiuni recomandate" ? `${props.sizeGlobal.height}x${props.sizeGlobal.width}` : props.options.length != 1 ? chosen ? chosen : "" : checked ? "Da" : ""}
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
                <div className="w-full bg-ui-white">
                    <label 
                        className={`w-full h-auto py-3 flex flex-row justify-between items-start px-4 ${props.options.length != 1 ? chosen==option.typename ? "text-type-dark":"text-type-grey hover:text-type-manatee" : checked ? "text-type-dark" : "text-type-grey hover:text-type-manatee"} transition duration-300 cursor-pointer`}
                        key={index}
                    >
                        <div className="flex-grow text-lg-14 flex flex-row justify-start items-center">
                            {
                                props.options.length != 1?
                                <input 
                                    { ...props.register( props.name ) } 
                                    type="radio" 
                                    className="h-3 w-3 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                                    name={props.name}
                                    value={option.typename}
                                    checked={chosen == option.typename}
                                    onClick={e => {
                                        handleClick(e)
                                        setChosen(option.typename)
                                    }}
                                />
                                :
                                <input 
                                    { ...props.register( props.name ) } 
                                    type="checkbox" 
                                    className="h-3 w-3 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                                    name={props.name}
                                    onClick={(e) => {
                                        handleClick(e)
                                        setChecked(!checked)
                                    }}
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
                    <div className={`${props.options.length != 1 ? chosen == option.typename ? "block" : "hidden" : checked ? "block" : "hidden"} text-type-grey text-lg-12 pl-34px pb-14px max-w-4xl`}>
                        {option.description}
                    </div>
                </div>
                )}
                {
                    props.name == "Dimensiuni recomandate" &&
                    <div className="w-full pl-4 pb-4">
                        <div 
                            className="flex flex-row justify-start items-center mt-14px mb-4 cursor-pointer text-accent-accent hover:text-accent-light"
                            onClick={() => setOpenCustom(!openCustom)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px mr-2 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <div className="text-lg-14 transition duration-300">
                                Comandați o altă dimensiune
                            </div>
                        </div>

                        <form className={`flex flex-row justify-start items-center ${openCustom ? "block" : "hidden"}`}>
                            <div className="mr-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-14 font-medium">Înălțime</span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-17">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        placeholder={props.sizeGlobal.height}
                                        {...register("height", { min: props.minHeight, max: props.maxHeight, valueAsNumber : true , required : true})}
                                    />
                                    {errors.height?.type === 'min' && `Min height is ${props.minHeight}`}
                                    {errors.height?.type === 'max' && `Max height is ${props.maxHeight}`}

                                    <span className="text-ui-black font-medium">
                                        cm
                                    </span>
                                </div>
                            </div>

                            <div className="text-lg-17 text-ui-black font-medium">
                                x
                            </div>

                            <div className="ml-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-14 font-medium">Lățime</span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-17">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        placeholder={props.sizeGlobal.width}
                                        {...register("width", { min: props.minWidth, max: props.maxWidth, valueAsNumber : true , required : true})}
                                    />
                                    {errors.width?.type === 'min' && `Min width is ${props.minWidth}`}
                                    {errors.width?.type === 'max' && `Max width is ${props.maxWidth}`}

                                    <span className="text-ui-black font-medium">
                                        cm
                                    </span>
                                </div>
                            </div>
                        </form>

                        <div 
                            className={`flex flex-row justify-center items-center w-128px px-10 h-34px bg-accent-accent text-ui-white hover:bg-accent-light font-bold rounded-lg transition duration-300 text-lg-14 cursor-pointer mt-14px ${openCustom ? "block" : "hidden"}`}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Salvează
                        </div>
                    </div>



                    // <form 
                    //     className={`w-full flex-row justify-start items-center px-4 py-14px`}
                    // >
                    //     <input
                    //         className="w-full"
                    //         type="number"
                    //         placeholder="Înălțime"
                    //         {...register("height", { min: props.minHeight, max: props.maxHeight, valueAsNumber : true })}
                    //     />
                    //     {errors.height?.type === 'min' && `Min height is ${props.minHeight}`}
                    //     {errors.height?.type === 'max' && `Max height is ${props.maxHeight}`}

                    //     <input
                    //         className="w-full"
                    //         type="number"
                    //         placeholder="Lățime"
                    //         {...register("width", { min: props.minWidth, max: props.maxWidth, valueAsNumber : true })}
                    //     />
                    //     {errors.width?.type === 'min' && `Min width is ${props.minWidth}`}
                    //     {errors.width?.type === 'max' && `Max width is ${props.maxWidth}`}

                    //     <input
                    //         className="bg-accent-accent type-ui-white"
                    //         type="button"
                    //         value="Alege"
                    //         onClick={handleSubmit(onSubmit)}
                    //     />
                    // </form>
                }
            </div>

        </div>
    )
}