import Image from "next/image"
import { Slide } from "react-awesome-reveal";
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";
import { set } from "react-hook-form";

export default function Benefits({lang}){

    const [benefit1 ,setBenefit1] = useState(0)
    const [benefit2 ,setBenefit2] = useState(0)
    const [benefit3 ,setBenefit3] = useState(0)
    const [benefit4 ,setBenefit4] = useState(0)
    const [benefit5 ,setBenefit5] = useState(0)

    return(
        <div className="w-full px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu pt-16 pb-24 md:pt-24 md:pb-20 lg:pt-140px lg:pb-130px bg-ui-grey overflow-hidden">
            <h3 className="text-lg-h3 font-bold text-center w-full mx-auto text-type-manatee mb-46px">
                {
                    lang == "ro" ? 
                    "Beneficii"
                    :
                    "Преимущества"
                }
            </h3>
            <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <div 
                    className="w-full lg:w-auto flex-grow bg-ui-dark lg:mr-5 rounded-xl h-258px md:h-488px lg:h-608px p-6 md:p-16 text-lg-card-name md:text-lg-h4 text-ui-grey flex flex-col justify-end items-start bg-icon5 bg-center bg-cover"
                    onMouseOver={() => setBenefit1(true)}
                    onMouseLeave={() => setBenefit1(false)}
                >
                    <div className="w-full md:w-500px">
                        {
                            lang == "ro" ? 
                            "Ne iubim clienții"
                            :
                            "Мы любим наших клиентов"
                        }
                        <CSSTransition
                            in={benefit1}
                            timeout={300}
                            classNames="alert"
                            unmountOnExit
                        >    
                            <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                {
                                    lang == "ro" ? 
                                    "O vânzare este considerată de succes numai dacă Cumpărătorul se bucură de produsul nostru în casa sa"
                                    :
                                    "Продажа считается успешной только в том случае, если покупатель радуется нашим товаром у себя дома."
                                }
                            </div>
                        </CSSTransition>                            
                    </div>
                </div>
                <div className="mt-4 md:mt-6 lg:mt-0 w-full lg:w-auto flex-grow h-auto lg:h-608px lg:ml-5">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 lg:mb-10">
                        <div 
                            className="w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:mr-3 lg:mr-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey"
                            onMouseOver={() => setBenefit2(true)}
                            onMouseLeave={() => setBenefit2(false)}
                        >
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon1.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                {
                                    lang == "ro" ? 
                                    "Configurarea oglinzii"
                                    :
                                    "Конфигурация зеркала"
                                }
                                <CSSTransition
                                    in={benefit2}
                                    timeout={300}
                                    classNames="alert"
                                    unmountOnExit
                                >                                
                                    <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                        {
                                            lang == "ro" ? 
                                            "Oglinda poate fi completată în mod independent cu o serie largă de opțiuni utile"
                                            :
                                            "Зеркало можно укомплектовать самостоятельно с широким набором полезных опций."
                                        }
                                    </div>
                                </CSSTransition>
                            </div>
                        </div>
                        <div 
                            className="mt-4 md:mt-0 w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:ml-3 lg:ml-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey group"
                            onMouseOver={() => setBenefit3(true)}
                            onMouseLeave={() => setBenefit3(false)}
                        >
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon2.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px transition duration-300">
                                {
                                    lang == "ro" ? 
                                    "400+ Modele"
                                    :
                                    "400+ Моделей"
                                }
                                <CSSTransition
                                    in={benefit3}
                                    timeout={300}
                                    classNames="alert"
                                    unmountOnExit
                                    // onEnter={() => setBenefit3(false)}
                                    // onExited={() => setBenefit3(true)}
                                >                                
                                    <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4 w-230px transition duration-300">
                                        {
                                            lang == "ro" ? 
                                            "Aici veți găsi cea mai largă selecție de modele de oglinzi și dulapuri"
                                            :
                                            "Здесь вы найдете широчайший выбор моделей зеркал и шкафов."
                                        }
                                    </div>
                                </CSSTransition>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div 
                            className="w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:mr-3 lg:mr-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey"
                            onMouseOver={() => setBenefit4(true)}
                            onMouseLeave={() => setBenefit4(false)}
                        >
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon3.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                {
                                    lang == "ro" ? 
                                    "Iluminare LED"
                                    :
                                    "Лед освещение"
                                }
                                <CSSTransition
                                    in={benefit4}
                                    timeout={300}
                                    classNames="alert"
                                    unmountOnExit
                                    // onEnter={() => setBenefit3(false)}
                                    // onExited={() => setBenefit3(true)}
                                >                                
                                    <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                        {
                                            lang == "ro" ? 
                                            "Zona de iluminare a oglinzii poate fi sub forma oricărui desen cu o lumină uniformă"
                                            :
                                            "Зона освещения зеркала может быть в виде любого рисунка с равномерным светом."
                                        }
                                    </div>
                                </CSSTransition>
                            </div>
                        </div>
                        <div 
                            className="mt-4 md:mt-0 w-full md:w-auto flex-grow h-258px md:h-284px bg-ui-dark md:ml-3 lg:ml-5 rounded-xl p-8 flex flex-col justify-between items-start text-lg-card-name-bold text-ui-grey"
                            onMouseOver={() => setBenefit5(true)}
                            onMouseLeave={() => setBenefit5(false)}
                        >
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/mainPage/benefits/icon4.png"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="w-230px">
                                {
                                    lang == "ro" ? 
                                    "100% Garantat"
                                    :
                                    "100% Гарантия"
                                }
                                <CSSTransition
                                    in={benefit5}
                                    timeout={300}
                                    classNames="alert"
                                    unmountOnExit
                                    // onEnter={() => setBenefit3(false)}
                                    // onExited={() => setBenefit3(true)}
                                >                                
                                    <div className="text-lg-card-description lg:text-lg-p text-type-grey mt-4">
                                        {
                                            lang == "ro" ? 
                                            "Veți fi mulțumit de achiziția din magazinul nostru. În caz contrar, vă vom rambursa banii.Veți fi mulțumit de achiziția din magazinul nostru. În caz contrar, vă vom rambursa banii."
                                            :
                                            "Вы останетесь довольны покупкой в ​​нашем магазине. В противном случае мы вернем вам деньги."
                                        }
                                    </div>
                                </CSSTransition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
