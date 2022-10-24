import { useContext, useEffect, useState, useMemo } from 'react';
import { coeficientFinder } from '../../lib/products';

import { getCurrency, getCurrencyString, getPrice, getPriceAddon, isRoDomain } from '../../utils/general';
import { AddonPopupContext } from '../context';

export default function DropdownProduct2({sizeGlobal, textAcrilic, productData, price, setPrice, minWidth, maxWidth, maxHeight, minHeight, options, initialPrice, setSizeGlobal, lang, name, nameru, nameen, setTextAcrilic, register, optionsRaw, activeAddons, setActiveAddons, inStock}) {

  const roDomain = isRoDomain()

  const customSize = name == "Dimensiuni recomandate"
  const stockSize = name === 'Dimensiune:'

  const {setAddonOpen} = useContext(AddonPopupContext)

  const [open, setOpen] = useState(true)
  const [chosen , setChosen] = useState(inStock ? options[0].typename : 0)
  const [lastChosen, setLastChosen] = useState(0)
  const [checked, setChecked] = useState(inStock ? 1 : 0)
  const [inputValues, setInputValues] = useState({
    height : sizeGlobal.height,
    width: sizeGlobal.width
  })
  const [errorInputs, setErrorInputs] = useState({})
  const [currency, setCurrency] = useState(4)

  const emptyTextAcrilic = textAcrilic === '' && productData.category.name === 'Text Acrilic'

  const asRadio = options.length !== 1 || stockSize || (options.length === 1 && inStock)

  const handleClick = (e) => {
    if (asRadio) {
      if (chosen == e.target.value){
        setChosen(0)
      }
      else {
        setChosen(e.target.value)
      }
    }
    else {
      setChecked(!checked)
    }
  }

  const onSubmit = (data) => {
    if (lastChosen === 0){
      setPrice(Math.round( price + ( getPrice(productData, data) * (1 + coeficientFinder(data, productData, roDomain))) - initialPrice))
      setLastChosen("custom")
    }
    else if (lastChosen == "custom"){
      setPrice(price + Math.round( getPrice(productData, data) * (1 + coeficientFinder(data, productData, roDomain))) - Math.round(getPrice(productData, sizeGlobal) * ( 1 + coeficientFinder(sizeGlobal, productData, roDomain))))
      setLastChosen("custom")
    }
    else {
      let lastOptionRaw = options.filter((option) => option.typename == lastChosen)
      let lastOptionPrice = lastOptionRaw[0].price
      setPrice(price + Math.round( getPrice(productData, data) * (1 + coeficientFinder(data, productData, roDomain))) - lastOptionPrice)
      setLastChosen("custom")
    }
    setSizeGlobal(
      {
        height : data.height,
        width : data.width,
      }
    )
  }

  useEffect(() => {
    if (customSize) {
      if (inputValues.height <= minHeight-1 && inputValues.width >= minWidth-1 && inputValues.width <= maxWidth+1){
        return setErrorInputs({...errorInputs, height : "min", width: ""})
      }
      else if (inputValues.height >= maxHeight+1 && inputValues.width >= minWidth-1 && inputValues.width <= maxWidth+1){
        return setErrorInputs({...errorInputs, height : "max", width: ""})
      }
      else if (inputValues.width <= minWidth-1 && inputValues.height >= minHeight-1 && inputValues.height <= maxHeight+1){
        return setErrorInputs({...errorInputs, width : "min", height: ""})
      }
      else if (inputValues.width >= maxWidth+1 && inputValues.height >= minHeight-1 && inputValues.height <= maxHeight+1){
        return setErrorInputs({...errorInputs, width : "max", height: ""})
      }
      else if (inputValues.height <= minHeight-1){
        return setErrorInputs({...errorInputs, height : "min"})
      }
      else if (inputValues.height >= maxHeight+1){
        return setErrorInputs({...errorInputs, height : "max"})
      }
      else if (inputValues.width <= minWidth-1){
        return setErrorInputs({...errorInputs, width : "min"})
      }
      else if (inputValues.width >= maxWidth+1){
        return setErrorInputs({...errorInputs, width : "max"})
      }
      else if (inputValues.width >= minWidth-1 && inputValues.width <= maxWidth+1 && inputValues.height >= minHeight-1 && inputValues.height <= maxHeight+1){
        setErrorInputs({height: "", width: ""})
        onSubmit({height: parseInt(inputValues.height), width: parseInt(inputValues.width)})
      }
      else if (inputValues.height >= minHeight-1 && inputValues.height <= maxHeight+1){
        setErrorInputs({...errorInputs, height: ""})
      }
      else if (inputValues.width >= minWidth-1 && inputValues.width <= maxWidth+1){
        setErrorInputs({...errorInputs, width: ""})
      }
    }
  }, [inputValues])

  useEffect(() => {
    if (checked === 0 || inStock ) return
    else if (checked) {
      if (setActiveAddons) {
        setActiveAddons([...activeAddons, options[0][addonName]])
      }

      setPrice(price + getPriceAddon(options[0], sizeGlobal) )
    }
    else {
      if (setActiveAddons) {
        setActiveAddons(activeAddons.filter((name) => name != options[0][addonName]))
      }

      setPrice(price - getPriceAddon(options[0], sizeGlobal) )
    }
  }, [checked])

  const addonName = useMemo(() => lang === 'en' ? 'nameen' : lang === 'ru' ? 'nameru' : 'name', [lang])

  useEffect(() => {
    if (inStock) return
    else if (chosen === 0){
      if (lastChosen != 0 && !customSize){
        let lastOptionRaw = options.filter((option) => option.typename == lastChosen)
        let lastOptionPrice = getPriceAddon(lastOptionRaw[0], sizeGlobal)

        
        if (setActiveAddons) {
          setActiveAddons(activeAddons.filter((name) => name != lastOptionRaw[0][addonName]))
        }

        setPrice(price - lastOptionPrice)
        setLastChosen(0)
      }
    }
    else {
      let optionRaw = options.filter((option) => option.typename == chosen)
      let optionPrice = 0
      if (customSize) {
        optionPrice = optionRaw[0].price
      }
      else {
        optionPrice = getPriceAddon(optionRaw[0], sizeGlobal)
      }

      if (lastChosen === 0) {
        
        if (setActiveAddons) {
          setActiveAddons([...activeAddons, optionRaw[0][addonName]])
        }

        if (customSize){
          setPrice(price + optionPrice - initialPrice)
          setSizeGlobal({
            height : optionRaw[0].height,
            width : optionRaw[0].width
          })
        }
        else {
          setPrice(price + optionPrice)
        }
        setLastChosen(chosen)
      }
      else if (lastChosen == "custom") {
        setPrice(price + optionPrice - Math.round( getPrice(productData, sizeGlobal) * (1 + coeficientFinder(sizeGlobal, productData, roDomain))))
        setSizeGlobal({
          height : optionRaw[0].height,
          width : optionRaw[0].width
        })
        setLastChosen(chosen)
      }
      else {
        let lastOptionRaw = options.filter((option) => option.typename == lastChosen)
        let lastOptionPrice = lastOptionRaw[0].price

        
        if (setActiveAddons) {
          setActiveAddons([...activeAddons.filter((name) => name != lastOptionRaw[0][addonName]), optionRaw[0][addonName]])
        }

        if (customSize){
          setSizeGlobal({
            height : optionRaw[0].height,
            width : optionRaw[0].width
          })
        }
        setPrice(price + optionPrice - lastOptionPrice)
        setLastChosen(chosen)
      }
    }
  }, [chosen])

  const handleOnChange = (type) => ({target: {value}}) => {
    setInputValues({...inputValues, [type]:value})
  }

  const handleOnChangeText = () => ({target: {value}}) => {
    setTextAcrilic(value)
  }

  useEffect(() => {
    const withCurrency = async () => {
    const currencyStrapi = await getCurrency()
    setCurrency(currencyStrapi)
    }
  
    withCurrency()
  }, [])

  return (
    <div className={`font-Ubuntu`}>
      <div className={`w-full`}>
      {
          customSize &&
          <div className="w-full md:px-2">
            <div 
              className="flex flex-row justify-start items-center mt-14px text-accent-accent mb-6"
            >
              <div className="text-lg-card-price lg:text-lg-17 font-medium transition duration-300">
                {
                  lang == "ro" ?
                  "Alegeți dimensiunile"
                  :
                  lang == "ru" ?
                  "Выберите размеры"
                  :
                  "Choose the size"
                }
              </div>
            </div>

            <form className={`flex flex-row justify-start items-center mt-4`}>
              <div className="mr-4">
                <div className="text-type-grey text-lg-12 mb-2">
                  <span className="text-type-manatee text-lg-17 lg:text-lg-14 font-medium">
                    {
                      lang == "ro" ?
                      "Înălțime"
                      :
                      lang == "ru" ?
                      "Высота"
                      :
                      "Height"
                    }
                  </span>
                </div>
                <div className="flex flex-row justify-start items-center text-lg-card-price">
                  <input
                    className="bg-ui-grey border-0 outline-none rounded w-84px mr-2"
                    type="number"
                    value={inputValues.height}
                    onChange={handleOnChange("height")}
                    disabled={productData.category.name === 'Text Acrilic' ? true : false}
                  />
                  <span className="text-ui-black font-medium">
                    mm
                  </span>
                </div>
                <div className="h-10 text-accent-error">
                  {
                    lang == "ro" ?
                    errorInputs.height === 'min' && `Înălțimea min - ${minHeight}`
                    :
                    lang == "ru" ?
                    errorInputs.height === 'min' && `Мин. высота - ${minHeight}`
                    :
                    errorInputs.height === 'min' && `Min height - ${minHeight}`
                  }
                  {
                    lang == "ro" ?
                    errorInputs.height === 'max' && `Înălțimea max - ${maxHeight}`
                    :
                    lang == "ru" ?
                    errorInputs.height === 'max' && `Макс. высота - ${maxHeight}`
                    :
                    errorInputs.height === 'max' && `Max height - ${maxHeight}`
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
                      lang == "ro" ?
                      "Lățime"
                      :
                      lang == "ru" ?
                      "Ширина"
                      :
                      "Width"
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
                    lang == "ro" ?
                    errorInputs.width === 'min' && `Lățimea min. - ${minWidth}`
                    :
                    lang == "ru" ?
                    errorInputs.width === 'min' && `Мин. ширина - ${minWidth}`
                    :
                    errorInputs.width === 'min' && `Min width - ${minWidth}`
                  }
                  {
                    lang == "ro" ? 
                    errorInputs.width === 'max' && `Lățimea max. - ${maxWidth}`
                    :
                    lang == "ru" ?
                    errorInputs.width === 'max' && `Макс. ширина - ${maxWidth}`
                    :
                    errorInputs.width === 'max' && `Max width - ${minWidth}`
                  }
                  {""}
                </div>
              </div>
            </form>
          </div>
        }
      </div>

      {
        productData.category.name === 'Text Acrilic' && customSize &&
        <div className="text-lg-card-price px-2 mt-4">
        <div 
          className="text-accent-accent mb-4"
        >
          <div className="text-lg-card-price lg:text-lg-17 font-medium transition duration-300">
            {
              lang == "ro" ?
              "Introduceți textul"
              :
              lang == "ru" ?
              "Вставьте текст"
              :
              "Insert the text"
            }
          </div>
        </div>

        <textarea
          className={`bg-ui-grey border-2 outline-none rounded-b w-full mr-2 shadow-md ${emptyTextAcrilic ? 'border-accent-error' : 'border-ui-blueishGrey'} transition-all duration-300`}
          value={textAcrilic}
          onChange={handleOnChangeText()}
        />
        {emptyTextAcrilic &&
          <div className="text-accent-error text-lg-12 mt-2">
            {
              lang == "ro" ?
              "* Introduceți textul Dvs."
              :
              lang == "ru" ?
              "* Введите ваш текст."
              :
              "* Insert your text"
            }
          </div>
        }
        </div>
      }
      
      {
        options && options.length !== 0 &&
        <div 
          className={`w-full ${customSize ? "border-ui-blueishGrey border-b bg-ui-white mt-40px cursor-pointer" : "bg-ui-grey"} h-auto py-3 flex flex-row justify-between items-start px-2 font-Ubuntu group transition duration-300`}
          onClick={() => {
            if (customSize){
              setOpen(!open)
            }
          }}
        >
          <div className={`${customSize ? open ? "font-medium" : "font-normal" : "font-medium"} flex-grow text-lg-17 md:text-lg-14 text-type-grey group-hover:text-type-manatee transition duration-300 flex flex-row justify-start items-center`}>
            {
            lang == "ro" ? 
            name
            :
            lang == "ru" ?
            nameru
            :
            nameen
            }
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="text-lg-17 lg:text-lg-14 font-medium text-type-dark mr-2 md:mr-2">
              { customSize 
                  ? `${sizeGlobal.height}x${sizeGlobal.width}` 
                  : (asRadio) 
                    ? chosen 
                      ? lang == "ro" 
                        ? chosen
                        : lang == "ru"
                          ? stockSize 
                            ? options.filter((option) => option.typename == chosen)[0].typenameru
                            : optionsRaw.filter((optionRaw) => optionRaw.typename == chosen)[0].typenameru
                          : stockSize 
                            ? options.filter((option) => option.typename == chosen)[0].typenameen
                            : optionsRaw.filter((optionRaw) => optionRaw.typename == chosen)[0].typenameen
                      : "" 
                    : checked 
                      ? lang == "ro" 
                        ? "Da" 
                        : lang == "ru" 
                          ? "Да" 
                          : "Yes"
                      : "" }
            </div>

            <div className={`${customSize ? "block" : "hidden"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "hidden" : "block"} h-4 w-4 text-ui-blueishGrey group-hover:text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" className={`${open ? "block" : "hidden"} h-4 w-4 text-type-manatee transition duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      }

      <div className={`w-full pb-3 bg-ui-white ${customSize ? open ? "block" : "hidden" : "block"}`}>

        {options && options.map((option, index)=>
        <div className="w-full bg-ui-white">
          <div 
            className={`w-full h-auto py-3 flex flex-row justify-between items-start px-4 ${asRadio ? chosen==option.typename ? "text-type-dark":"text-type-grey hover:text-type-manatee" : checked ? "text-type-dark" : "text-type-grey hover:text-type-manatee"} transition duration-300`}
            key={index}
          >
            <label className={`flex-grow text-lg-17 lg:text-lg-14 flex flex-row justify-start items-center ${inStock ? 'pointer-events-none' : 'cursor-pointer'}`}>
              {
                asRadio ?
                <input 
                  { ...register( name ) } 
                  type="radio" 
                  className="h-3 w-3 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                  name={name}
                  value={option.typename}
                  checked={chosen == option.typename}
                  onClick={e => {
                    handleClick(e)
                  }}
                />
                :
                <input 
                  { ...register( name ) } 
                  type="checkbox" 
                  className="h-3 w-3 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300" 
                  name={name}
                  checked={checked}
                  onClick={(e) => {
                    handleClick(e)
                  }}
                />
              }
              <div>
                {
                  lang == "ro" ?
                  asRadio? option.typename : option.name
                  :
                  lang == "ru" ?
                  asRadio? option.typenameru : option.nameru
                  :
                  asRadio? option.typenameen : option.nameen
                }
              </div>
            </label>
            <div className={`flex flex-row ${inStock ? 'justify-end' : 'justify-between'} items-center min-w-75px`}>
              {!inStock &&
                (<div className="text-lg-17 lg:text-lg-14 font-medium">
                  {roDomain 
                    ? Math.round(getPriceAddon(option, sizeGlobal) / currency)
                    : Math.round(getPriceAddon(option, sizeGlobal))} 
                  {getCurrencyString(lang, roDomain)}
                </div>)}

              {option[`popup${
              lang === 'ro' ? 
              '' 
              : 
              lang == 'ru' ?
              'ru'
              :
              'en'
              }`] &&
              <svg 
              xmlns="http://www.w3.org/2000/svg" className={`${customSize ? "hidden" : "block"} h-4 w-4 text-accent-accent ml-2 cursor-pointer`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => {
                const addon = option.typename ? name + " " + option.typename : name
                setAddonOpen(addon)
              }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              }
            </div>
          </div>
          <div className={`${asRadio ? chosen == option.typename ? "block" : "hidden" : checked ? "block" : "hidden"} text-type-grey text-lg-12 px-34px max-w-4xl`}>
            {option.description}
          </div>
        </div>
        )}
      </div>

    </div>
  )
}