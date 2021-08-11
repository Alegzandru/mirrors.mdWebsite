import { useContext, useState } from "react"
import Image from "next/image"
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import { DeviceTypeContext } from "../context";
import Link from "next/link"

export default function ProductDescription ({options, optionVariants, images, name ,description, productData, lang, nameru, descriptionru}) {
    
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    
    const [page, setPage] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(0)
    const imagesLightbox = images.map((image) => {
        return image.src
    })
    const [autoHeight, setAutoHeight] = useState(0)

    const coeficientFinder = (size) => {
        if(size.width*size.height < productData[0].mediumsize.height * productData[0].mediumsize.width){
            return productData[0].smallcoeficient
        }
        else if(size.width*size.height < productData[0].bigsize.height * productData[0].bigsize.width) {
            return productData[0].mediumcoeficient
        }
        else{
            return productData[0].bigcoeficient
        }
    }

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
            <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin"/>
            <div className="flex flex-row justify-center items-center mb-60px">
                <div 
                    className={`${page == 0 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(0)}
                >
                    {
                        lang == "ro" ? 
                        "Descriere"
                        :
                        "Описание"
                    }
                </div>
                <div 
                    className={`${page == 1 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(1)}
                >
                    {
                        lang == "ro" ? 
                        `Fotografii(${imagesLightbox.length})`
                        :
                        `Фотографии(${imagesLightbox.length})`
                    }
                </div>
                {/* <div 
                    className={`${page == 2 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-sm-p md:text-lg-17 mx-2 md:mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(2)}
                >
                    Recenzii(0)
                </div> */}
            </div>

            <div className={`${page == 0 ? "block" : "hidden"} w-full lg:px-300px pb-60px`}>
                <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 mb-10">
                    {
                        lang=="ro" ?
                        name
                        :
                        nameru
                    }
                </h4>

                <pre 
                    className="font-Ubuntu"
                    dangerouslySetInnerHTML={{ __html: lang == "ro" ? description != null ? description.replace(/###/g, `<b style="font-size:24px">`).replace(/##/g, "</b>").replace(/-# /g, "&#9679 ") : "<div></div>" : descriptionru != null ? descriptionru.replace(/###/g, `<b style="font-size:24px">`).replace(/##/g, "</b>").replace(/-# /g, "&#9679 ") : "<div></div>"}} className={`md:text-md-p lg:text-lg-p text-type-manatee mb-11 w-full ${autoHeight ? "h-auto" : "max-h-240px"} overflow-y-hidden font-medium`}>
                        {/* {description} */}
                </pre>

                <div
                    className="text-accent-accent text-lg-p underline cursor-pointer"
                    onClick={() => setAutoHeight(!autoHeight)}
                >
                    {
                        lang == "ro" ? 
                        `mai ${autoHeight ? "puține" : "multe"} detalii...`
                        :
                        `${autoHeight ? "меньше деталей..." : "подробнее"}`
                    }
                </div>
            </div>

            <div className={`${page == 1 ? "block" : "hidden"} w-full pb-60px`}>
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

            {
                productData[0].related_products.length != 0 &&  
                <div className="w-full pt-40 pb-10">
                    <div className="text-lg-32 text-type-dark font-medium mb-3">
                        {
                            lang == "ro" ? 
                            "Produse similare"
                            :
                            "Похожие товары"
                        }
                    </div>
                    <div className="w-full h-px bg-ui-blueishGrey mb-6"/>
                    <div className="flex flex-row justify-between items-start">
                        {productData[0].related_products.map((product, index) => {
                            return (
                            deviceType == "desktop" ?
                                index < 4 &&
                                <Link href={lang == "ro" ? `/produse/${product.slug}` : `/ru/produse/${product.slug}`}>
                                    <a className="w-full mx-1">
                                        <div className=" bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px hover:shadow-md transition duration-300">
                                            <div className="w-full h-92px md:h-204px relative mb-6 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className="w-full text-center text-lg-card-name text-type-dark mb-1 font-medium">
                                                {   
                                                    lang == "ro" ?
                                                    product.name
                                                    :
                                                    product.nameru
                                                }
                                            </div>
                                            {/* <div className="text-card-description text-type-grey w-full text-center">
                                                {Math.trunc(product.defaultsize.width * product.defaultsize.height / 1000000 * product.m2price * (1 + coeficientFinder(product.defaultsize)))}
                                            </div> */}
                                        </div>
                                    </a>
                                </Link>
                            :
                            deviceType == "tablet" ?
                                index < 3 &&
                                <Link href={lang == "ro" ? `/produse/${product.slug}` : `/ru/produse/${product.slug}`}>
                                    <a className="w-full mx-1">
                                        <div className=" bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px hover:shadow-md transition duration-300">
                                            <div className="w-full h-92px md:h-204px relative mb-6 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className="w-full text-center text-lg-card-name text-type-dark mb-1 font-medium">
                                                {
                                                    lang == "ro" ?
                                                    product.name
                                                    :
                                                    product.nameru
                                                }
                                            </div>
                                            {/* <div className="text-card-description text-type-grey w-full text-center">
                                                {Math.trunc(product.defaultsize.width * product.defaultsize.height / 1000000 * product.m2price * (1 + coeficientFinder(product.defaultsize)))}
                                            </div> */}
                                        </div>
                                    </a>
                                </Link>
                            :
                            deviceType == "mobile" ?
                                index < 2 &&
                                <Link href={lang == "ro" ? `/produse/${product.slug}` : `/ru/produse/${product.slug}`}>
                                    <a className="w-full mx-1">
                                        <div className=" bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1 hover:shadow-md transition duration-300 min-h-216px">
                                        <div className="w-full h-92px md:h-204px relative mb-6 rounded-lg overflow-hidden">
                                            <Image
                                                  src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                  layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="w-full text-center text-lg-card-name text-type-dark mb-1 font-medium">
                                            {
                                                lang == "ro" ?
                                                product.name
                                                :
                                                product.nameru
                                            }
                                        </div>
                                        {/* <div className="text-card-description text-type-grey w-full text-center">
                                            {Math.trunc(product.defaultsize.width * product.defaultsize.height / 1000000 * product.m2price * (1 + coeficientFinder(product.defaultsize)))}
                                        </div> */}
                                        </div>
                                    </a>
                                </Link>
                            :
                                index < 2 &&
                                <Link href={lang == "ro" ? `/produse/${product.slug}` : `/ru/produse/${product.slug}`}>
                                    <a className="w-full mx-1">
                                        <div className=" bg-ui-white rounded-lg border border-ui-darkGrey w-full px-5 py-10px mx-1 hover:shadow-md transition duration-300">
                                        <div className="w-full h-92px md:h-204px relative mb-6 rounded-lg overflow-hidden">
                                            <Image
                                                src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="w-full text-center text-lg-card-name text-type-dark mb-1 font-medium">
                                            {
                                                lang == "ro" ?
                                                product.name
                                                :
                                                product.nameru
                                            }
                                        </div>
                                        {/* <div className="text-card-description text-type-grey w-full text-center">
                                            {Math.trunc(product.defaultsize.width * product.defaultsize.height / 1000000 * product.m2price * (1 + coeficientFinder(product.defaultsize)))}
                                        </div> */}
                                        </div>
                                    </a>
                                </Link>
                            )
                        }
                        )}
                    </div>
                </div>
            }
        </div>
    )
}