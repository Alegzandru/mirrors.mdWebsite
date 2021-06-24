import Image from "next/image"
import Link from 'next/link'

export default function ContacteMap () {
    return(
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-16 md:pb-120px font-Ubuntu bg-ui-darkGrey">
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
                    Contacte
                </span>
            </div>

            <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-40px md:mb-52px text-shadow-text2">
                Contacte
            </h2>

            <div className="w-full card-shadow rounded-xl flex flex-col-reverse md:flex-row justify-between items-center overflow-hidden">
                <div className="pt-8 md:pt-72px pb-8 md:pb-16 px-8 md:px-8 lg:px-24 bg-ui-white flex flex-col justify-between items-start h-auto md:h-588px lg:h-600px w-full md:w-1/2 lg:w-auto">
                    <div className="flex flex-row justify-between items-center w-full">
                        <a 
                            href="https://www.facebook.com/mirrorsmd"
                            target="blank"
                        >
                            <div className="h-72px w-148px bg-ui-grey rounded-xl flex flex-col items-center justify-between py-2 mr-4 flex-grow hover:bg-accent-transparent transition duration-300">
                                <Image
                                    src="/branding/facebook.svg"
                                    height={24}
                                    width={24}
                                />

                                <div className="text-lg-14 font-black mt-3" style={{color : "#1977F3"}}>
                                    mirrorsmd
                                </div>
                            </div>
                        </a>

                        <a 
                            href="https://www.instagram.com/mirrorsmd/"
                            target="blank"
                        >
                            <div className="h-72px w-148px bg-ui-grey rounded-xl flex flex-col items-center justify-between py-2 flex-grow hover:bg-accent-transparent transition duration-300">
                                <Image
                                    src="/branding/instagram.svg"
                                    height={24}
                                    width={24}
                                />

                                <div className="text-lg-14 gradient-text font-black mt-3">
                                    mirrorsmd
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="w-full text-lg-p text-type-manatee font-normal mt-40px md:mt-0">
                        <a href="tel:37369482034">
                            <div className="flex flex-row items-center justify-start mb-8 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:text-accent-accent transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                </svg>

                                <span className="group-hover:text-accent-accent transition duration-300">
                                    +373 69 482 034
                                </span>
                            </div>
                        </a>

                        <a href="https://goo.gl/maps/Cr1ju6WohV8NYeYf6" target="blank">
                            <div className="flex flex-row items-center justify-start mb-8 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:text-accent-accent transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                <span className="group-hover:text-accent-accent transition duration-300">
                                    str. Ismail 98
                                </span>
                            </div>
                        </a>
                    </div>

                    <div>
                        <div className="text-lg-card-description text-type-grey font-normal flex flex-row justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <div>
                                Luni−Vineri:  9:00-18:00
                            </div>
                        </div>
                        <div className="text-lg-card-description text-type-grey font-normal flex flex-row justify-start items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <div>
                                Sâmbătă:  9:00-14:00
                            </div>
                        </div>
                        <div className="text-lg-card-description text-type-grey font-normal flex flex-row justify-start items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <div>
                                Duminică:  zi liberă
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex-grow h-320px md:h-full w-full md:w-auto">
                    <iframe src="https://yandex.com/map-widget/v1/?um=constructor%3A79dbbe95bd2531da704341e99cfe83c018aa307df04f33dd9c1332b1fa43ef0f&amp;source=constructor" width="100%" className="h-320px md:h-588px lg:h-600px" frameBorder="0"></iframe>
                </div>
            </div>
        </div>
    )
}