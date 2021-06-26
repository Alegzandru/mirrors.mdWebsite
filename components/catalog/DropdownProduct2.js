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
    const [showButton, setShowButton] = useState(0)

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

    function handleChange(event) {
        if(event.target.value != ""){
            setShowButton(1)
        }
        else{
            setShowButton(0)
        }
    }

    return (
        <div className={`font-Ubuntu`}>

            <div className="w-full">
            {
                    props.name == "Dimensiuni recomandate" &&
                    <div className="w-full md:px-2">
                        <div 
                            className="flex flex-row justify-start items-center mt-14px cursor-pointer text-accent-accent hover:text-accent-light mb-6"
                        >
                            <div className="text-lg-card-price lg:text-lg-17 font-medium transition duration-300">
                                Alegeți dimensiunile
                            </div>
                        </div>

                        <form className={`flex flex-row justify-start items-center mt-4`}>
                            <div className="mr-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-17 lg:text-lg-14 font-medium">Înălțime</span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-card-price">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        placeholder={props.sizeGlobal.height}
                                        {...register("height", { min: props.minHeight, max: props.maxHeight, valueAsNumber : true , required : true})}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <span className="text-ui-black font-medium">
                                        mm
                                    </span>
                                </div>
                                <div className="h-10">
                                    {errors.height?.type === 'min' && `Înălțimea min - ${props.minHeight}`}
                                    {errors.height?.type === 'max' && `Înălțimea max - ${props.maxHeight}`}
                                    {""}
                                </div>
                            </div>

                            <div className="text-lg-17 text-ui-black font-medium -mt-5">
                                x
                            </div>

                            <div className="ml-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-17 lg:text-lg-14 font-medium">Lățime</span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-card-price">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        placeholder={props.sizeGlobal.width}
                                        {...register("width", { min: props.minWidth, max: props.maxWidth, valueAsNumber : true , required : true})}
                                        onChange={(e) => handleChange(e)}
                                    />

                                    <span className="text-ui-black font-medium">
                                        mm
                                    </span>
                                </div>
                                <div className="h-10">
                                    {errors.width?.type === 'min' && `Lățimea min - ${props.minWidth}`}
                                    {errors.width?.type === 'max' && `Lățimea max - ${props.maxWidth}`}
                                    {""}
                                </div>
                            </div>
                        </form>

                        {
                            showButton ?
                                <div 
                                    className={`flex flex-row justify-center items-center w-128px px-10 h-34px bg-accent-accent text-ui-white hover:bg-accent-light font-bold rounded-lg transition duration-300 text-lg-14 cursor-pointer mt-14px`}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Salvează
                                </div>
                            :
                                ""
                        }
                    </div>
                }
            </div>
            
            <div className={`w-full ${props.name == "Dimensiuni recomandate" ? "bg-ui-white mt-40px" : "bg-ui-grey"} h-auto py-3 flex flex-row justify-between items-start px-2 font-Ubuntu group transition duration-300 cursor-pointer`}>
                <div className={`flex-grow text-lg-17 lg:text-lg-14 text-type-manatee group-hover:text-type-manatee transition duration-300 flex flex-row justify-start items-center font-medium`}>
                    <div>
                        {props.name}
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <div className="text-lg-17 lg:text-lg-14 font-medium text-type-dark mr-2 md:mr-0">
                        {props.name == "Dimensiuni recomandate" ? `${props.sizeGlobal.height}x${props.sizeGlobal.width}` : props.options.length != 1 ? chosen ? chosen : "" : checked ? "Da" : ""}
                    </div>
                </div>
            </div>

            <div className="w-full pb-3 bg-ui-white">

                {props.options.map((option, index)=>
                <div className="w-full bg-ui-white">
                    <label 
                        className={`w-full h-auto py-3 flex flex-row justify-between items-start px-4 ${props.options.length != 1 ? chosen==option.typename ? "text-type-dark":"text-type-grey hover:text-type-manatee" : checked ? "text-type-dark" : "text-type-grey hover:text-type-manatee"} transition duration-300 cursor-pointer`}
                        key={index}
                    >
                        <div className="flex-grow text-lg-17 lg:text-lg-14 flex flex-row justify-start items-center">
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
                        <div className="text-lg-17 lg:text-lg-14 font-medium">
                            {option.price} lei
                        </div>
                    </label>
                    <div className={`${props.options.length != 1 ? chosen == option.typename ? "block" : "hidden" : checked ? "block" : "hidden"} text-type-grey text-lg-12 px-34px max-w-4xl`}>
                        {option.description}
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}