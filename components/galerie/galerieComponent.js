import Image from "next/image"
import { useState } from "react";

export default function GalerieComponent (props) {

    const [photoNr, setPhotoNr] = useState(10)

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

    const images = [
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
    ];

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
                <span className="mr-1">
                    Pagina principală
                </span>
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
                        <div key={index} className={`${getColSpan(props.deviceType, index)} h-224px md:h-268px lg:h-284px relative`}>
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
                className="h-12 w-fullcmd md:w-238px rounded-lg mx-auto bg-accent-transparent font-bold text-lg-button text-accent-accent flex flex-row justify-center items-center mt-56px md:mt-8"
                onClick={ () => {
                    images.length > photoNr && setPhotoNr(photoNr+10)
                    console.log(photoNr)
                }}
            >
                Mai multe fotografii
            </div>
        </div>
    )
}