import ProductComponent from "./productComponent"
import ProductDescription from "./productDescription"
import RecentProducts from "../multiPage/recentProducts"
import { AddonPopupContext, SeenRecentlyContext } from "../../components/context";
import { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "../../components/context";
import {API_URL} from '../../utils/urls'

export default function ProductPage ({deviceType, name, price, images, description, category, options, optionVariants, productData, optionsRaw, lang, nameru, nameen, optionsRu, optionsEn, descriptionru, descriptionen}) {

    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)
    const [contor, setContor] = useState(productData[0].name)
    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    const {addonOpen, setAddonOpen} = useContext(AddonPopupContext)

    const [popupData, setPopupData] = useState('')
    const [popupName, setPopupName] = useState('')

    useEffect(() => {
        if(seenRecently.length == 0){
              setSeenRecently([
                ...seenRecently,
                productData[0]
              ])
        }
        else if(seenRecently[seenRecently.length - 1].name != productData[0].name){
            if(seenRecently.length < 4){
              setSeenRecently([
                ...seenRecently,
                productData[0]
              ])
            }
            else {
              let mutableRecent = seenRecently.slice(1, seenRecently.length)
              setSeenRecently([
                ...mutableRecent,
                productData[0]
              ])
            }
        }
    })

    useEffect(() => {
    localStorage.setItem('seenRecently',JSON.stringify(seenRecently))
    }, [seenRecently])

    useEffect(() => {
      const withPopup = async () => {
        setPopupOpen(addonOpen !== '')
        if(addonOpen){
          const addonRes = await fetch(`${API_URL}/add-ons?name_eq=${addonOpen}`)
          const addon = await addonRes.json()
          setPopupData(lang === "ro" ? addon[0].popup : lang == "ru" ? addon[0].popupru : addon[0].popupen)
          setPopupName(lang === "ro" ? addon[0].name : lang == "ru" ? addon[0].nameru : addon[0].nameen)
        }
        else {
          setPopupData('')
          setPopupName('')
        }
      }
      withPopup()
    }, [addonOpen])

    function useOutsideAlerter(ref) {
      useEffect(() => {
          function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target) && addonOpen) {
                  setAddonOpen('')
              }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)

    return (
        <div>
          {popupOpen && 
          <div className={`mx-auto max-w-1050px fixed overflow-y-auto inset-5 md:inset-10 bg-ui-white z-50 rounded-xl px-6 py-6 md:px-14 md:py-12`} ref={wrapperRef}>
            <div className="rounded-full bg-ui-grey sticky h-8 w-8 top-2 mb-3 ml-auto cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-type-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setAddonOpen('')}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-lg-32 text-accent-text2 font-medium mb-7 text-shadow-text2">
              {popupName}
            </div>

            <pre 
                className="font-Ubuntu"
                dangerouslySetInnerHTML={{ __html: popupData ? 
                  popupData
                  .replace(/{{{/g, `<img style="max-height: 400px; margin-right: auto; margin-left: auto;" src="`)
                  .replace(/}}/g, '"/>')
                  .replace(/&&&/g, '<b>').replace(/&&/g, '</b>')
                  .replace(/###/g, '<i>').replace(/##/g, '</i>')
                  .replace(/-#/g, "&#9679 ")
                : "<div></div>"}}>
            </pre>
          </div>
          }
          <div className={`${popupOpen ? 'filter brightness-50 transition duration-300' : ''}`}>
            <ProductComponent 
                deviceType={deviceType} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                nameru={nameru}
                nameen={nameen}
                price={price}
                images={images}
                category={category}
                productData={productData}
                optionsRaw={optionsRaw}
                lang={lang}
                optionsRu={optionsRu}
                optionsEn={optionsEn}
            />
            <ProductDescription 
                deviceType={deviceType} 
                images={images} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                nameru={nameru}
                nameen={nameen}
                description={description}
                descriptionru={descriptionru}
                descriptionen={descriptionen}
                productData={productData}
                lang={lang}
            />
            <RecentProducts 
              deviceType={deviceType}
              lang={lang}
            >
            </RecentProducts>
          </div>
        </div>
    )
}