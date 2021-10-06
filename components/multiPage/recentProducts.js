import Image from "next/image"
import UAParser from "ua-parser-js";
import {useEffect, useState, useContext} from "react"
import { SeenRecentlyContext } from "../../components/context";
import Link from 'next/link'
import {getCurrency, getCurrencyString, getPrice, isRoDomain} from '../../utils/general'

export default function RecentProducts ({deviceType, lang}) {

    const roDomain = isRoDomain()

    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)

    const [itemNr, setItemNr] = useState(0)

    const [currency , setCurrency] = useState(4)
    
    useEffect(() => {
        if(deviceType == "desktop"){
            setItemNr(4)
        }
        else{
            setItemNr(3)
        }
    }, [deviceType])

    useEffect(async() => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }, [])

    return (
        <div>
            {
                seenRecently.length != 0 ?
                <div className="hidden md:block w-full bg-ui-grey px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl py-160px font-Ubuntu">
                    <div className="text-md-h4 lg:text-lg-32 text-type-dark font-medium mb-3">
                        {
                            lang == "ro" ? 
                            "Ați privit mai devreme"
                            :
                            lang == "ru" ?
                            "Вы смотрели раньше"
                            :
                            "You watched earlier"
                        }
                    </div>
    
                    <div className="w-full h-px bg-ui-blueishGrey mb-6"/>
    
                    <div className="w-full flex flex-row justify-start items-center">
                        {seenRecently.slice(4-itemNr, itemNr+1).map((product, index)=>{
                            return(
                                <Link href={
                                  lang == "ro" ? 
                                  `/produse/${product.slug}` 
                                  : 
                                  lang == "ru" ?
                                  `/ru/produse/${product.slug}`
                                  :
                                  `/en/produse/${product.slug}`
                                }>
                                    <a  className="w-full max-w-md">
                                        <div className="flex-grow mr-2 h-140px bg-ui-white rounded-lg flex flex-row items-center justify-start hover:shadow-md transition duration-300 px-4 py-2">
                                            <div className="h-124px w-124px relative mr-4 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt={product.name}
                                                />
                                            </div>
    
                                            <div className="h-auto">
                                                <div className="text-lg-17 font-medium text-type-dark mb-10px">
                                                    {
                                                        lang == "ro" ?
                                                        product.name
                                                        :
                                                        lang == "ru" ? 
                                                        product.nameru
                                                        :
                                                        product.nameen
                                                    }
                                                </div>
                                                <div className="text-lg-14 font-normal text-type-grey">
                                                    {
                                                        lang == "ro" ? 
                                                        "de la "
                                                        :
                                                        lang == "ru" ?
                                                        "от "
                                                        :
                                                        "from "
                                                    }
                                                    {
                                                      roDomain ?
                                                      currency === 4 ? 
                                                        '...':
                                                        Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient_ro) / currency) 
                                                      :
                                                      Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient))
                                                    }
                                                    {
                                                      getCurrencyString(lang, roDomain)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        }
                        )}
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}