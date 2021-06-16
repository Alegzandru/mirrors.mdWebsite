import { useContext, useState } from "react"
import Image from "next/image"
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import { DeviceTypeContext } from "../context";

export default function ProductDescription ({options, optionVariants, images, name ,description}) {
    
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    
    const [page, setPage] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(0)
    const imagesLightbox = images.map((image) => {
        return image.src
    })
    const [autoHeight, setAutoHeight] = useState(0)

    const products = [
        "Norma",
        "Norma",
        "Norma",
        "Norma",
        "Norma",
        "Norma",
        "Norma",
    ]

    function getColSpan (deviceType, index) {
        switch(deviceType){
            case "mobile" : 
                return index % 3 == 0 ? "col-span-12" : "col-span-6"
            break;

            case "tablet" :
                return index % 5 <= 1 ? "col-span-6" : "col-span-4"
            break;

            case "desktop" :
                return index % 7 <= 2 ? "col-span-4" : "col-span-3"
            break;

            default :
                return index % 3 == 0 ? "col-span-12" : "col-span-6"
        }
    }

    return (
        <div className="px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu bg-ui-darkGrey pb-92px md:pb-0">
            <div className="flex flex-row justify-center items-center mb-60px">
                <div 
                    className={`${page == 0 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(0)}
                >
                    Descriere
                </div>
                <div 
                    className={`${page == 1 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(1)}
                >
                    Fotografii(27)
                </div>
                <div 
                    className={`${page == 2 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(2)}
                >
                    Recenzii(0)
                </div>
            </div>

            <div className={`${page == 0 ? "block" : "hidden"} w-full lg:px-300px`}>
                <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 mb-10">
                    {name}
                </h4>

                <pre className={`md:text-md-p lg:text-lg-p text-type-manatee mb-11 w-full ${autoHeight ? "h-auto" : "h-240px"} overflow-y-hidden`}>
                    {description}
                </pre>

                <div 
                    className="text-accent-accent text-lg-p underline cursor-pointer"
                    onClick={() => setAutoHeight(1)}
                >
                    mai multe detalii...
                </div>
            </div>

            <div className={`${page == 1 ? "block" : "hidden"} w-full`}>
                <div className="grid grid-flow-row grid-cols-12 gap-2 md:gap-4">                
                    {images.map((img, index)=>{
                        return(
                            <div 
                                key={index} 
                                className={`${getColSpan(deviceType, index)} h-224px md:h-268px lg:h-284px relative cursor-pointer`}
                                onClick={() => setLightboxOpen(1)}
                            >
                                <Image
                                    src={img.src}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>
                        )
                    }
                    )}
                </div>
                {
                    lightboxOpen ? 
                    <Lightbox doubleClickZoom={1.2} images={imagesLightbox} onClose={() => setLightboxOpen(0)}/>
                    :
                    ""
                }
            </div>

            <div className="w-full pt-40">
                <div className="text-lg-32 text-type-dark font-medium mb-3">
                    Produse similare
                </div>
                <div className="w-full h-px bg-ui-blueishGrey mb-6"/>
                <div className="flex flex-row justify-between items-start">
                    {products.map((product, index) => 
                        deviceType == "desktop" ?
                            index < 4 &&
                            <div className="md:h-320px bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1">
                                <div className="w-full h-92px md:h-204px relative mb-6">
                                    <Image
                                        src="/product/product.png"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="w-full text-center text-lg-card-name text-type-dark mb-1">
                                    {product}
                                </div>
                                <div className="text-card-description text-type-grey w-full text-center">
                                    de la 2144 lei
                                </div>
                            </div>
                        :
                        deviceType == "tablet" ?
                            index < 3 &&
                            <div className="md:h-320px bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1">
                                <div className="w-full h-92px md:h-204px relative mb-6">
                                    <Image
                                        src="/product/product.png"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="w-full text-center text-lg-card-name text-type-dark mb-1">
                                    {product}
                                </div>
                                <div className="text-card-description text-type-grey w-full text-center">
                                    de la 2144 lei
                                </div>
                            </div>
                        :
                        deviceType == "mobile" ?
                            index < 2 &&
                            <div className="md:h-320px bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1">
                            <div className="w-full h-92px md:h-204px relative mb-6">
                                <Image
                                    src="/product/product.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-full text-center text-lg-card-name text-type-dark mb-1">
                                {product}
                            </div>
                            <div className="text-card-description text-type-grey w-full text-center">
                                de la 2144 lei
                            </div>
                            </div>
                        :
                            index < 2 &&
                            <div className="md:h-320px bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1">
                            <div className="w-full h-92px md:h-204px relative mb-6">
                                <Image
                                    src="/product/product.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-full text-center text-lg-card-name text-type-dark mb-1">
                                {product}
                            </div>
                            <div className="text-card-description text-type-grey w-full text-center">
                                de la 2144 lei
                            </div>
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}