import Link from 'next/link'
import enableInlineVideo from 'iphone-inline-video';
import { useEffect, useRef } from 'react';

export default function Hero({lang}){

    // const videoRef = useRef(null);

    // useEffect(() => {
    //     enableInlineVideo(videoRef);

    //     var promise = videoRef.current.play();

    //     if (promise !== undefined) {
    //     promise.then(_ => {
    //     }).catch(error => {
    //         videoRef.current.muted = true;
    //         videoRef.current.play();
    //     });
    // }
    // }, [])

    return(
        <div className="w-full overflow-hidden h-70vh md:h-screen bg-ui-darkGrey">
            <div className="h-70vh md:h-screen w-full overflow-hidden relative">
                <video 
                    autoPlay loop muted playsInline className="filter brightness-25 -mt-4 z-10 relative object-cover" 
                    // ref={videoRef}
                >
                    <source src="/mainPage/heroGif.mp4" type="video/mp4"/>
                </video>
            </div>
            <div className="overflow-hidden h-70vh md:h-screen bg-transparent bg-cover bg-center -mt-70vh md:-mt-hero z-20 relative">
                <div className="mx-container-sm md:mx-container-md lg:mx-container-lg flex flex-row justify-center items-center h-full">
                    <div className="mx-auto text-center w-776px h-auto font-Ubuntu">
                        <h1 className="text-sm-h1 md:text-md-h1 lg:text-lg-h1 font-bold text-white text-ui-white">
                            {
                                lang == "ro" ? 
                                "Oglinzi de la producător"
                                :
                                "Зеркала от производителя"
                            }
                        </h1>

                        <p className="font-normal text-ui-darkGrey mx-auto text-sm-p md:text-md-p lg:text-lg-p w-full md:w-472px mt-4 md:mt-6 lg:mt-8">
                            {
                                lang == "ro" ? 
                                "Oferim o selecție excelentă, de peste 400 de modele, fiecare fiind produs în orice dimensiune de până la 2,5m."
                                :
                                "Мы предлагаем отличный выбор из более чем 400 моделей, каждая из которых выпускается любого размера до 2,5 м."
                            }
                        </p>

                        <Link href={lang == "ro" ? "/oglinzi" : "/ru/oglinzi"}>
                            <a>
                                <div className="text-sm-button md:text-md-button lg:text-lg-button font-bold mt-48px lg:mt-56px mx-auto rounded-lg h-48px w-full md:w-210px bg-accent-transparent text-accent-accent flex flex-row justify-center items-center border-2 border-transparent hover:border-accent-accent transition duration-300">
                                    {
                                        lang == "ro" ? 
                                        "Alegeți oglinda"
                                        :
                                        "Выберите зеркало"
                                    }
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}