import Image from "next/image"

export default function Options({lang}) {
    return(
        <div className="w-full flex flex-row justify-start items-center h-auto lg:h-640px font-Ubuntu">
            <div className="w-1/2 flex-row items-start justify-end hidden lg:flex">
                <div className="w-632px h-auto -mr-156px">
                    <h2 className="text-lg-hLarge text-ui-dark font-bold tracking-tighter z-0 relative">
                        {
                            lang == "ro" ? 
                            "Opțiuni disponibile"
                            :
                            "Доступные опции"
                        }
                    </h2>
                    <h2 className="text-lg-hLarge text-transparent font-bold tracking-tighter z-20 relative -mt-88px withStroke mb-40px">
                        {
                            lang == "ro" ? 
                            "Opțiuni disponibile"
                            :
                            "Доступные опции"
                        }
                    </h2>
                    <ul className="list-inside list-disc text-lg-p text-type-manatee h-180px relative z-0">
                        <li>
                            {
                                lang == "ro" ? 
                                "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                :
                                "Датчик движения, датчик-диммер или сенсорные переключатели"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Element de încălzire pentru a preveni aburirea oglinzii"
                                :
                                "Нагревательный элемент для предотвращения запотевания зеркала"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                :
                                "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Lumina de fundal RGB 64K și telecomandă"
                                :
                                "Подсветка RGB 64K и пульт дистанционного управления"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                :
                                "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Oglindă măritoare cu zonă separată de iluminat"
                                :
                                "Увеличительное зеркало с отдельной зоной освещения"
                            }
                        </li>
                        <li>           
                            {
                                lang == "ro" ? 
                                "Senzor cu termometru sau ceas electronic"
                                :
                                "Датчик с термометром или электронными часами"
                            }             
                        </li>
                    </ul>
                    <ul className="list-inside list-disc text-lg-p h-180px text-transparent withStrokeSmall -mt-180px z-20 relative">
                        <li>
                            {
                                lang == "ro" ? 
                                "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                :
                                "Датчик движения, датчик-диммер или сенсорные переключатели"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Element de încălzire pentru a preveni aburirea oglinzii"
                                :
                                "Нагревательный элемент для предотвращения запотевания зеркала"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                :
                                "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Lumina de fundal RGB 64K și telecomandă"
                                :
                                "Подсветка RGB 64K и пульт дистанционного управления"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                :
                                "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Oglindă măritoare cu zonă separată de iluminat"
                                :
                                "Увеличительное зеркало с отдельной зоной освещения"
                            }
                        </li>
                        <li>           
                            {
                                lang == "ro" ? 
                                "Senzor cu termometru sau ceas electronic"
                                :
                                "Датчик с термометром или электронными часами"
                            }             
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full lg:w-1/2 h-auto md:h-596px lg:h-640px relative z-10 bg-options bg-center bg-cover ">
                <div className="px-container-sm backdrop-filter backdrop-brightness-50 pt-56px pb-12 md:py-0 w-full h-full flex flex-row items-center justify-center lg:hidden">
                    <div className="w-full md:w-472px h-auto text-ui-white">
                        <h2 className="text-sm-h2 font-bold tracking-tighter z-0 relative md:text-md-h1 mb-4 md:mb-6">
                            {
                                lang == "ro" ? 
                                "Opțiuni disponibile"
                                :
                                "Доступные опции"
                            }
                        </h2>
                        <ul className="list-inside list-disc text-sm-p md:text-md-p">
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                    :
                                    "Датчик движения, датчик-диммер или сенсорные переключатели"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Element de încălzire pentru a preveni aburirea oglinzii"
                                    :
                                    "Нагревательный элемент для предотвращения запотевания зеркала"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                    :
                                    "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Lumina de fundal RGB 64K și telecomandă"
                                    :
                                    "Подсветка RGB 64K и пульт дистанционного управления"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                    :
                                    "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Oglindă măritoare cu zonă separată de iluminat"
                                    :
                                    "Увеличительное зеркало с отдельной зоной освещения"
                                }
                            </li>
                            <li>           
                                {
                                    lang == "ro" ? 
                                    "Senzor cu termometru sau ceas electronic"
                                    :
                                    "Датчик с термометром или электронными часами"
                                }             
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}