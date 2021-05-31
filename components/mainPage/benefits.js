import Image from "next/image"

export default function Benefits(props){
    return(
        <div className="w-full px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu pt-16 pb-24 md:pt-24 md:pb-20 lg:pt-140px lg:pb-130px bg-ui-grey overflow-hidden">
            <h3 className="text-lg-h3 font-bold text-center w-full mx-auto text-type-manatee mb-46px">
                Beneficii
            </h3>
            <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <div 
                    className="w-full lg:w-auto flex-grow bg-ui-dark lg:mr-5 rounded-xl h-258px md:h-488px lg:h-608px p-6 md:p-16 text-lg-card-name md:text-lg-h4 text-ui-grey flex flex-col justify-end items-start bg-icon5 bg-center bg-cover"
                >
                    <div className="w-full md:w-500px">
                        Ne iubim clienții
                        <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                            O vânzare este considerată de succes numai dacă Cumpărătorul se bucură de produsul nostru în casa sa
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-0 w-full lg:w-auto flex-grow h-auto lg:h-608px lg:ml-5">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 lg:mb-10">
                        <div className="w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:mr-3 lg:mr-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey">
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon1.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                Configurarea oglinzii
                                <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                    Oglinda poate fi completată în mod independent cu o serie largă de opțiuni utile
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:ml-3 lg:ml-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey">
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon2.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                400+ Modele
                                <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                    Aici veți găsi cea mai largă selecție de modele de oglinzi și dulapuri
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:mr-3 lg:mr-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey">
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon3.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                Iluminare LED
                                <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                    Zona de iluminare a oglinzii poate fi sub forma oricărui desen cu o lumină uniformă
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:ml-3 lg:ml-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey">
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon4.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                100% Garantat
                                <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                    Veți fi mulțumit de achiziția din magazinul nostru. În caz contrar, vă vom rambursa banii.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
