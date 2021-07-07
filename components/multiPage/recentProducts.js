import Image from "next/image"
import UAParser from "ua-parser-js";
import {useEffect, useState, useContext} from "react"
import { SeenRecentlyContext } from "../../components/context";
import Link from 'next/link'

export default function RecentProducts ({deviceType, lang}) {
    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)

    const [itemNr, setItemNr] = useState(0)

    function getPrice(product, size) {
        let price = 0
        product.materials.forEach((material, index) => {
            if(material.type == "ml"){
                price += material.price * (size.height + size.width) * 2 / 1000
            }
            else if(material.type == "m2"){
                price += material.price * size.height * size.width / 1000000
            }
            else{
                price += material.price
            }
        });
        return price
    }
    
    useEffect(() => {
        if(deviceType == "desktop"){
            setItemNr(4)
        }
        else{
            setItemNr(3)
        }
    }, [deviceType])

    const items = [
        {
            name : "Hollywood 2",
            description : "de la 2 144 lei",
            img : "/multiPage/item1.png"
        },
        {
            name : "Silvia",
            description : "de la 2 144 lei",
            img : "/multiPage/item2.png"
        },
        {
            name : "Beatrice",
            description : "de la 2 144 lei",
            img : "/multiPage/item3.png"
        },
        {
            name : "Hollywood 2",
            description : "de la 2 144 lei",
            img : "/multiPage/item1.png"
        },
        {
            name : "Shape 004",
            description : "de la 2 144 lei",
            img : "/multiPage/item4.png"
        }
    ]

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
                            "Вы смотрели раньше"
                        }
                    </div>
    
                    <div className="w-full h-px bg-ui-blueishGrey mb-6"/>
    
                    <div className="w-full flex flex-row justify-start items-center">
                        {seenRecently.slice(4-itemNr, itemNr+1).map((product, index)=>{
                            return(
                                <Link href={`/produse/${product.slug}`}>
                                    <a  className="w-full max-w-md">
                                        <div className="flex-grow mr-2 h-140px bg-ui-white rounded-lg flex flex-row items-center justify-start hover:shadow-md transition duration-300 px-4 py-2">
                                            <div className="h-124px w-124px relative mr-4 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image[0].formats.small.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
    
                                            <div className="h-auto">
                                                <div className="text-lg-17 font-medium text-type-dark mb-10px">
                                                    {product.name}
                                                </div>
                                                <div className="text-lg-14 font-normal text-type-grey">
                                                    {
                                                        lang == "ro" ? 
                                                        "de la "
                                                        :
                                                        "от "
                                                    }
                                                    {Math.trunc( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient))}
                                                    {
                                                        lang == "ro" ? 
                                                        " lei"
                                                        :
                                                        " лей"
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

// RecentProducts.getInitialProps = ({ req }) => {
//     let userAgent;
//     if (req) {
//       userAgent = req.headers["user-agent"];
//     } else {
//       userAgent = navigator.userAgent;
//     }
//     const parser = new UAParser();
//     parser.setUA(userAgent);
//     const result = parser.getResult();
//     const deviceType = (result.device && result.device.type) || "desktop";
//     return { deviceType };
// };

// export default RecentProducts;