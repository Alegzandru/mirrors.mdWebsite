import Link from 'next/link'
import enableInlineVideo from 'iphone-inline-video';
import { useEffect, useRef, useState } from 'react';

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

    const [errorVideo, setErrorVideo] = useState(0)

    return(
        <div className="w-full overflow-hidden h-70vh md:h-screen bg-ui-darkGrey">
            <div className="h-70vh md:h-screen w-full overflow-hidden relative">
                <video 
                    autoPlay loop muted playsInline className="filter brightness-25 -mt-4 z-10 relative object-cover" 
                    // ref={videoRef}
                >
                    <source src="/mainPage/heroGif.mp4" type="video/mp4" onError={() => setErrorVideo(1)} className={`${errorVideo ? "hidden" : "block"}`}/>
                    <img src="/mainPage/hero/bg.jpg" title="Video-ul nu este accesibil" className={`${errorVideo ? "block" : "hidden"}`}/>
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
                                lang == "ru" ?
                                "Зеркала от производителя"
                                :
                                "Mirrors from the manufacturer"
                            }
                        </h1>

                        <p className="font-normal text-ui-darkGrey mx-auto text-sm-p md:text-md-p lg:text-lg-p w-full md:w-472px mt-4 md:mt-6 lg:mt-8">
                            {
                                lang == "ro" ? 
                                "Oferim o selecție excelentă, de peste 400 de modele, fiecare fiind produs în orice dimensiune de până la 2,5m."
                                :
                                lang == "ru" ?
                                "Мы предлагаем отличный выбор из более чем 400 моделей, каждая из которых выпускается любого размера до 2,5 м."
                                :
                                "We offer an excellent selection of over 400 models, each being produced in any size up to 2.5m."
                            }
                        </p>

                        <Link href={
                          lang == "ro" ? 
                          "/oglinzi" 
                          : 
                          lang == "ru" ?
                          "/ru/oglinzi"
                          :
                          "/en/oglinzi"
                        }>
                            <a>
                                <div className="text-sm-button md:text-md-button lg:text-lg-button font-bold mt-48px lg:mt-56px mx-auto rounded-lg h-48px w-full md:w-210px bg-accent-transparent text-accent-accent flex flex-row justify-center items-center border-2 border-transparent hover:border-accent-accent transition duration-300">
                                    {
                                        lang == "ro" ? 
                                        "Alegeți oglinda"
                                        :
                                        lang == "ru" ?
                                        "Выберите зеркало"
                                        :
                                        "Choose a mirror"
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