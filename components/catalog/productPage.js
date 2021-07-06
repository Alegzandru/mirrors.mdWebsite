import ProductComponent from "./productComponent"
import ProductDescription from "./productDescription"
import RecentProducts from "../multiPage/recentProducts"
import { DeviceTypeContext, SeenRecentlyContext } from "../../components/context";
import { useContext, useEffect, useState } from "react";

export default function ProductPage ({deviceType, name, price, images, description, category, options, optionVariants, productData, optionsRaw, lang}) {

    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)
    const [contor, setContor] = useState(productData[0].name)

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
            else{
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

    return (
        <div>
            <ProductComponent 
                deviceType={deviceType} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                price={price}
                images={images}
                category={category}
                productData={productData}
                optionsRaw={optionsRaw}
                lang={lang}
            />
            <ProductDescription 
                deviceType={deviceType} 
                images={images} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                description={description}
                productData={productData}
                lang={lang}
            />
            <RecentProducts 
              deviceType={deviceType}
              lang={lang}
            >
            </RecentProducts>
        </div>
    )
}