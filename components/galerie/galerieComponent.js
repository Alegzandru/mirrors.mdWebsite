import Image from "next/image"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import Link from 'next/link'

export default function GalerieComponent (props) {

    const [photoNr, setPhotoNr] = useState(28)
    const [lightboxOpen, setLightboxOpen] = useState(0)
    const images = props.products.map((product) => {
        return product.image[0].formats.medium.url
    })

    function getColSpan(deviceType, index) {
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
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
                <Link href="/">
                    <a>
                        <span className="mr-1 hover:underline transition duration-300">
                            Pagina principală
                        </span>
                    </a>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>
                    Galerie
                </span>
            </div>

            <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-40px md:mb-52px text-shadow-text2">
                Galerie
            </h2>

            <div className="grid grid-flow-row grid-cols-12 gap-2 md:gap-4">                
                {images.slice(0, photoNr).map((img, index)=>{
                    return(
                        <div 
                            key={index} 
                            className={`${getColSpan(props.deviceType, index)} h-224px md:h-268px lg:h-284px relative cursor-pointer`}
                            onClick={() => setLightboxOpen(1)}
                        >
                            <Image
                                src={img}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                    )
                }
                )}
            </div>

            <div 
                className={`h-12 w-full md:w-238px rounded-lg mx-auto font-bold text-lg-button flex flex-row justify-center items-center mt-56px md:mt-8 border-2 border-transparent transition duration-300 ${photoNr >= images.length ? "bg-ui-blueishGrey text-ui-white" : "bg-accent-transparent text-accent-accent hover:border-accent-accent cursor-pointer"}`}
                onClick={ () => {
                    images.length > photoNr && setPhotoNr(photoNr+photoNr)
                }}
            >
                Mai multe fotografii
            </div>
            {
                lightboxOpen ? 
                <Lightbox doubleClickZoom={1.2} images={images} onClose={() => setLightboxOpen(0)}/>
                :
                ""
            }
        </div>
    )
}