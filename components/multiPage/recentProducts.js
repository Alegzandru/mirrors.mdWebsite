import Image from "next/image"
import UAParser from "ua-parser-js";
import {useEffect, useState, useContext} from "react"
import { SeenRecentlyContext } from "../../components/context";
import Link from 'next/link'

export default function RecentProducts ({deviceType}) {
    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)
    useEffect(() => {
        console.log(seenRecently)
    }, [seenRecently])

    const [itemNr, setItemNr] = useState(0)
    
    useEffect(() => {
        if(deviceType == "desktop"){
            console.log("Happened desktop")
            setItemNr(4)
        }
        else{
            console.log("Happened not desktop")
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
        <div className="hidden md:block w-full bg-ui-grey px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl py-160px font-Ubuntu">
            <div className="text-md-h4 lg:text-lg-32 text-type-dark font-medium mb-3">
                Ați privit mai devreme
            </div>

            <div className="w-full h-px bg-ui-blueishGrey mb-6"/>

            <div className="w-full flex flex-row justify-start items-center">
                {seenRecently.slice(4-itemNr, itemNr+1).map((product, index)=>{
                    console.log(product)
                    return(
                        <Link href={`/produse/${product.slug}`}>
                            <a  className="w-full max-w-md">
                                <div className="flex-grow mr-2 h-140px bg-ui-white rounded-lg flex flex-row items-center justify-center max-w-">
                                    <div className="h-124px w-124px relative mr-4">
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
                                            de la {Math.trunc(product.defaultsize.width * product.defaultsize.height / 1000000 * product.m2price * product.smallcoeficient)} lei
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