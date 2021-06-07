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
        <div className="px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu bg-ui-darkGrey pb-188px">
            <div className="flex flex-row justify-center items-center mb-60px">
                <div 
                    className={`${page == 0 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-lg-1 mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(0)}
                >
                    Descriere
                </div>
                <div 
                    className={`${page == 1 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-lg-17 mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(1)}
                >
                    Fotografii(27)
                </div>
                <div 
                    className={`${page == 2 ? "text-accent-accent border-b-2 border-t-0 border-l-0 border-r-0 border-accent-accent" : "text-type-dark"} text-lg-17 mx-8 h-12 flex flex-row justify-center items-center cursor-pointer`}
                    onClick={() => setPage(2)}
                >
                    Recenzii(0)
                </div>
            </div>

            <div className={`${page == 0 ? "block" : "hidden"} w-full lg:px-300px`}>
                <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 mb-10">
                    {name}
                </h4>

                <div className="md:text-md-p lg:text-lg-p text-type-manatee mb-11">
                    {description}
                </div>

                <div className="text-accent-accent text-lg-p underline">
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


        </div>
    )
}