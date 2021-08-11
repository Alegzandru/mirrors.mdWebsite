import { useContext, useEffect, useRef, useState } from 'react';

import { getPrice } from '../../utils/general';
import { getPriceAddon } from '../../utils/general'
import { AddonPopupContext, PopupContext } from '../context';

export default function DropdownProduct(props) {

    const {addonOpen, setAddonOpen} = useContext(AddonPopupContext)
    const {popupOpen, setPopupOpen} = useContext(PopupContext)

    const [open, setOpen] = useState(0)
    const [chosen , setChosen] = useState(0)
    const [lastChosen, setLastChosen] = useState(0)
    const [checked, setChecked] = useState(0)
    const [openCustom, setOpenCustom] = useState(0)
    const [inputValues, setInputValues] = useState({
        height : props.sizeGlobal.height,
        width: props.sizeGlobal.width
    })
    const [errorInputs, setErrorInputs] = useState({})

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
            props.setPrice(Math.trunc( props.price + ( getPrice(props.productData, data) * (1 + props.coeficientFinder(data))) - props.initialPrice))
            setLastChosen("custom")
        }
        else if(lastChosen == "custom"){
            props.setPrice(props.price + Math.trunc( getPrice(props.productData, data) * (1 + props.coeficientFinder(data))) - Math.trunc(getPrice(props.productData, props.sizeGlobal) * ( 1 + props.coeficientFinder(props.sizeGlobal))))
            setLastChosen("custom")
        }
        else{
            let lastOptionPriceRaw = props.options.filter((option) => option.typename == lastChosen)
            let lastOptionPrice = lastOptionPriceRaw[0].price
            props.setPrice(props.price + Math.trunc( getPrice(props.productData, data) * (1 + props.coeficientFinder(data))) - lastOptionPrice)
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
        if(props.name == "Dimensiuni recomandate"){
            if(inputValues.height <= props.minHeight-1 && inputValues.width >= props.minWidth-1 && inputValues.width <= props.maxWidth+1){
                return setErrorInputs({...errorInputs, height : "min", width: ""})
            }
            else if(inputValues.height >= props.maxHeight+1 && inputValues.width >= props.minWidth-1 && inputValues.width <= props.maxWidth+1){
                return setErrorInputs({...errorInputs, height : "max", width: ""})
            }
            else if(inputValues.width <= props.minWidth-1 && inputValues.height >= props.minHeight-1 && inputValues.height <= props.maxHeight+1){
                return setErrorInputs({...errorInputs, width : "min", height: ""})
            }
            else if(inputValues.width >= props.maxWidth+1 && inputValues.height >= props.minHeight-1 && inputValues.height <= props.maxHeight+1){
                return setErrorInputs({...errorInputs, width : "max", height: ""})
            }
            else if(inputValues.height <= props.minHeight-1){
              return setErrorInputs({...errorInputs, height : "min"})
            }
            else if(inputValues.height >= props.maxHeight+1){
                return setErrorInputs({...errorInputs, height : "max"})
            }
            else if(inputValues.width <= props.minWidth-1){
                return setErrorInputs({...errorInputs, width : "min"})
            }
            else if(inputValues.width >= props.maxWidth+1){
                return setErrorInputs({...errorInputs, width : "max"})
            }
            else if(inputValues.width >= props.minWidth-1 && inputValues.width <= props.maxWidth+1 && inputValues.height >= props.minHeight-1 && inputValues.height <= props.maxHeight+1){
                setErrorInputs({height: "", width: ""})
                onSubmit({height: parseInt(inputValues.height), width: parseInt(inputValues.width)})
            }
            else if(inputValues.height >= props.minHeight-1 && inputValues.height <= props.maxHeight+1){
                setErrorInputs({...errorInputs, height: ""})
            }
            else if(inputValues.width >= props.minWidth-1 && inputValues.width <= props.maxWidth+1){
                setErrorInputs({...errorInputs, width: ""})
            }
        }
    }, [inputValues])

    useEffect(() => {
        if(checked === 0 ){
        }
        else if(checked){
            props.setPrice(props.price + getPriceAddon(props.options[0], props.sizeGlobal) )
        }
        else{
            props.setPrice(props.price - getPriceAddon(props.options[0], props.sizeGlobal) )
        }
    }, [checked])

    useEffect(() => {
        if(chosen === 0){
            if(lastChosen != 0 && props.name != "Dimensiuni recomandate"){
                let lastOptionPriceRaw = props.options.filter((option) => option.typename == lastChosen)
                let lastOptionPrice = getPriceAddon(lastOptionPriceRaw[0], props.sizeGlobal)
    
                props.setPrice(props.price - lastOptionPrice)
                setLastChosen(0)
            }
        }
        else{
            let optionPriceRaw = props.options.filter((option) => option.typename == chosen)
            let optionPrice = 0
            if(props.name == "Dimensiuni recomandate"){
                optionPrice = optionPriceRaw[0].price
            }
            else{
                optionPrice = getPriceAddon(optionPriceRaw[0], props.sizeGlobal)
            }

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
                props.setPrice(props.price + optionPrice - Math.trunc( getPrice(props.productData, props.sizeGlobal) * (1 + props.coeficientFinder(props.sizeGlobal))))
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

    const handleOnChange = (type) => ({target: {value}}) => {
        setInputValues({...inputValues, [type]:value})
    }

    return (
        <div className={`font-Ubuntu`}>
          <div className={`w-full`}>
            {
                    props.name == "Dimensiuni recomandate" &&
                    <div className="w-full md:px-2">
                        <div 
                            className="flex flex-row justify-start items-center mt-14px cursor-pointer text-accent-accent hover:text-accent-light mb-6"
                        >
                            <div className="text-lg-card-price lg:text-lg-17 font-medium transition duration-300">
                                {
                                    props.lang == "ro" ?
                                    "Alegeți dimensiunile"
                                    :
                                    "Выберите размеры"
                                }
                            </div>
                        </div>

                        <form className={`flex flex-row justify-start items-center mt-4`}>
                            <div className="mr-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-17 lg:text-lg-14 font-medium">
                                        {
                                            props.lang == "ro" ?
                                            "Înălțime"
                                            :
                                            "Высота"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-card-price">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        value={inputValues.height}
                                        onChange={handleOnChange("height")}
                                    />
                                    <span className="text-ui-black font-medium">
                                        mm
                                    </span>
                                </div>
                                <div className="h-10 text-accent-error">
                                    {
                                        props.lang == "ro" ?
                                        errorInputs.height === 'min' && `Înălțimea min - ${props.minHeight}`
                                        :
                                        errorInputs.height === 'min' && `Мин. высота - ${props.minHeight}`
                                    }
                                    {
                                        props.lang == "ro" ?
                                        errorInputs.height === 'max' && `Înălțimea max - ${props.maxHeight}`
                                        :
                                        errorInputs.height === 'max' && `Макс. высота - ${props.maxHeight}`
                                    }
                                    {""}
                                </div>
                            </div>

                            <div className="text-lg-17 text-ui-black font-medium -mt-5">
                                x
                            </div>

                            <div className="ml-4">
                                <div className="text-type-grey text-lg-12 mb-2">
                                    <span className="text-type-manatee text-lg-17 lg:text-lg-14 font-medium">
                                        {
                                            props.lang == "ro" ?
                                            "Lățime"
                                            :
                                            "Ширина"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-row justify-start items-center text-lg-card-price">
                                    <input
                                        className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                                        type="number"
                                        value={inputValues.width}
                                        onChange={handleOnChange("width")}
                                    />

                                    <span className="text-ui-black font-medium">
                                        mm
                                    </span>
                                </div>
                                <div className="h-10 text-accent-error">
                                    { 
                                        props.lang == "ro" ?
                                        errorInputs.width === 'min' && `Lățimea min. - ${props.minWidth}`
                                        :
                                        errorInputs.width === 'min' && `Мин. ширина - ${props.minWidth}`
                                    }
                                    {
                                        props.lang == "ro" ? 
                                        errorInputs.width === 'max' && `Lățimea max. - ${props.maxWidth}`
                                        :
                                        errorInputs.width === 'max' && `Макс. ширина - ${props.maxWidth}`
                                    }
                                    {""}
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
            
            <div 
                className={`w-full ${props.name == "Dimensiuni recomandate" ? "border-ui-blueishGrey border-b bg-ui-white mt-40px" : "bg-ui-grey"} h-auto py-3 flex flex-row justify-between items-start px-2 font-Ubuntu group transition duration-300`}
                onClick={() => {
                    if(props.name == "Dimensiuni recomandate"){
                        setOpen(!open)
                    }
                }}
            >
                <div className={`${props.name == "Dimensiuni recomandate" ? open ? "font-medium" : "font-normal" : "font-medium"} flex-grow text-lg-17 md:text-lg-14 text-type-grey group-hover:text-type-manatee transition duration-300 flex flex-row justify-start items-center`}>
                    {props.lang == "ro" ? 
                        props.name
                        :
                        props.nameru
                    }
                </div>

                <div className="flex flex-row justify-between items-center">
                    <div className="text-lg-17 lg:text-lg-14 font-medium text-type-dark mr-2 md:mr-2">
                        {
                            props.name == "Dimensiuni recomandate" ? 
                                `${props.sizeGlobal.height}x${props.sizeGlobal.width}` 
                                : 
                                props.options.length != 1 ? 
                                    chosen ? 
                                        props.lang == "ro" ?
                                            chosen
                                            :
                                            props.optionsRaw.filter((optionRaw, index) => optionRaw.typename == chosen )[0].typenameru 
                                        : 
                                        "" 
                                    : 
                                    checked ? 
                                        props.lang == "ro" ? 
                                            "Da" 
                                            : 
                                            "Да" 
                                        : 
                                        ""
                        }
                    </div>

                    <div className={`${props.name === "Dimensiuni recomandate" ? "block" : "hidden"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-4 w-4 text-ui-blueishGrey group-hover:text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-4 w-4 text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className={`w-full pb-3 bg-ui-white ${props.name == "Dimensiuni recomandate" ? open ? "block" : "hidden" : "block"}`}>

                {props.options.map((option, index)=>
                <div className="w-full bg-ui-white">
                    <div 
                        className={`w-full h-auto py-3 flex flex-row justify-between items-start px-4 ${props.options.length != 1 ? chosen==option.typename ? "text-type-dark":"text-type-grey hover:text-type-manatee" : checked ? "text-type-dark" : "text-type-grey hover:text-type-manatee"} transition duration-300`}
                        key={index}
                    >
                        <label className="flex-grow text-lg-17 lg:text-lg-14 flex flex-row justify-start items-center cursor-pointer">
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
                                    }}
                                />
                            }
                            <div>
                                {
                                    props.lang == "ro" ?
                                    props.options.length != 1? option.typename : option.name
                                    :
                                    props.options.length != 1? option.typenameru : option.nameru
                                }
                            </div>
                        </label>
                        <div className="flex flex-row justify-between items-center min-w-75px">
                          <div className="text-lg-17 lg:text-lg-14 font-medium">
                              {getPriceAddon(option, props.sizeGlobal)} 
                              {
                                props.lang == "ro" ?
                                " lei"
                                :
                                " лей"
                              }
                          </div>

                          {option.popup &&
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" className={`${props.name == "Dimensiuni recomandate" ? "hidden" : "block"} h-4 w-4 text-accent-accent ml-2 cursor-pointer`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => {
                              const addon = option.typename ? props.name + " " + option.typename : props.name
                              setAddonOpen(addon)
                            }}
                          >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          }
                        </div>
                    </div>
                    <div className={`${props.options.length != 1 ? chosen == option.typename ? "block" : "hidden" : checked ? "block" : "hidden"} text-type-grey text-lg-12 px-34px max-w-4xl`}>
                        {option.description}
                    </div>
                </div>
                )}
          </div>

        </div>
    )
}