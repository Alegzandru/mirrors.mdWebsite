import Image from "next/image"

export default function Options({lang}) {
    return(
        <div className="w-full flex flex-row justify-start items-center h-auto lg:h-640px font-Ubuntu bg-ui-white">
            <div className="w-1/2 flex-row items-start justify-end hidden lg:flex">
                <div className="w-632px h-auto -mr-156px">
                    <h2 className="text-lg-hLarge text-ui-dark font-bold tracking-tighter z-0 relative">
                        {
                            lang == "ro" ? 
                            "Opțiuni disponibile"
                            :
                            lang == "ru" ?
                            "Доступные опции"
                            :
                            "Additional options"
                        }
                    </h2>
                    <h2 className="text-lg-hLarge text-transparent font-bold tracking-tighter z-20 relative -mt-88px withStroke mb-40px">
                        {
                            lang == "ro" ? 
                            "Opțiuni disponibile"
                            :
                            lang == "ru" ?
                            "Доступные опции"
                            :
                            "Additional options"
                        }
                    </h2>
                    <ul className="list-inside list-disc text-lg-p text-type-manatee h-180px relative z-0">
                        <li>
                            {
                                lang == "ro" ? 
                                "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                :
                                lang == "ru" ?
                                "Датчик движения, датчик-диммер или сенсорные переключатели"
                                :
                                "Motion sensor, dimmer or touch switch"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Element de încălzire pentru a preveni aburirea oglinzii"
                                :
                                lang == "ru" ?
                                "Нагревательный элемент для предотвращения запотевания зеркала"
                                :
                                "Heating element to prevent fogging of the mirror"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                :
                                lang == "ru" ?
                                "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                                :
                                "Mirror lighting tint: cold, neutral or warm"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Lumina de fundal RGB 64K și telecomandă"
                                :
                                lang == "ru" ?
                                "Подсветка RGB 64K и пульт дистанционного управления"
                                :
                                "64K RGB backlight and remote control"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                :
                                lang == "ru" ?
                                "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                                :
                                "Built-in wireless audio system: bluetooth, radio, clock"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Oglindă măritoare cu zonă separată de iluminat"
                                :
                                lang == "ru" ?
                                "Увеличительное зеркало с отдельной зоной освещения"
                                :
                                "Magnifying mirror with separate lighting area"
                            }
                        </li>
                        <li>           
                            {
                                lang == "ro" ? 
                                "Senzor cu termometru sau ceas electronic"
                                :
                                lang == "ru" ?
                                "Датчик с термометром или электронными часами"
                                :
                                "Sensor with thermometer or electronic clock"
                            }             
                        </li>
                    </ul>
                    <ul className="list-inside list-disc text-lg-p h-180px text-transparent withStrokeSmall -mt-180px z-20 relative">
                        <li>
                            {
                                lang == "ro" ? 
                                "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                :
                                lang == "ru" ?
                                "Датчик движения, датчик-диммер или сенсорные переключатели"
                                :
                                "Motion sensor, dimmer or touch switch"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Element de încălzire pentru a preveni aburirea oglinzii"
                                :
                                lang == "ru" ?
                                "Нагревательный элемент для предотвращения запотевания зеркала"
                                :
                                "Heating element to prevent fogging of the mirror"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                :
                                lang == "ru" ?
                                "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                                :
                                "Mirror lighting tint: cold, neutral or warm"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Lumina de fundal RGB 64K și telecomandă"
                                :
                                lang == "ru" ?
                                "Подсветка RGB 64K и пульт дистанционного управления"
                                :
                                "64K RGB backlight and remote control"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                :
                                lang == "ru" ?
                                "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                                :
                                "Built-in wireless audio system: bluetooth, radio, clock"
                            }
                        </li>
                        <li>
                            {
                                lang == "ro" ? 
                                "Oglindă măritoare cu zonă separată de iluminat"
                                :
                                lang == "ru" ?
                                "Увеличительное зеркало с отдельной зоной освещения"
                                :
                                "Magnifying mirror with separate lighting area"
                            }
                        </li>
                        <li>           
                            {
                                lang == "ro" ? 
                                "Senzor cu termometru sau ceas electronic"
                                :
                                lang == "ru" ?
                                "Датчик с термометром или электронными часами"
                                :
                                "Sensor with thermometer or electronic clock"
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
                                lang == "ru" ?
                                "Доступные опции"
                                :
                                "Additional options"
                            }
                        </h2>
                        <ul className="list-inside list-disc text-sm-p md:text-md-p">
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Senzor de mișcare, senzor-dimmer sau comutatoare tactile"
                                    :
                                    lang == "ru" ?
                                    "Датчик движения, датчик-диммер или сенсорные переключатели"
                                    :
                                    "Motion sensor, dimmer or touch switch"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Element de încălzire pentru a preveni aburirea oglinzii"
                                    :
                                    lang == "ru" ?
                                    "Нагревательный элемент для предотвращения запотевания зеркала"
                                    :
                                    "Heating element to prevent fogging of the mirror"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Tenta de iluminare a oglinzii: rece, neutră sau caldă"
                                    :
                                    lang == "ru" ?
                                    "Оттенок подсветки зеркал: холодный, нейтральный или теплый"
                                    :
                                    "Mirror lighting tint: cold, neutral or warm"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Lumina de fundal RGB 64K și telecomandă"
                                    :
                                    lang == "ru" ?
                                    "Подсветка RGB 64K и пульт дистанционного управления"
                                    :
                                    "64K RGB backlight and remote control"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Sistem audio wireless încorporat: bluetooth, radio, ceas"
                                    :
                                    lang == "ru" ?
                                    "Встроенная беспроводная аудиосистема: блютуз, радио, часы"
                                    :
                                    "Built-in wireless audio system: bluetooth, radio, clock"
                                }
                            </li>
                            <li>
                                {
                                    lang == "ro" ? 
                                    "Oglindă măritoare cu zonă separată de iluminat"
                                    :
                                    lang == "ru" ?
                                    "Увеличительное зеркало с отдельной зоной освещения"
                                    :
                                    "Magnifying mirror with separate lighting area"
                                }
                            </li>
                            <li>           
                                {
                                    lang == "ro" ? 
                                    "Senzor cu termometru sau ceas electronic"
                                    :
                                    lang == "ru" ?
                                    "Датчик с термометром или электронными часами"
                                    :
                                    "Sensor with thermometer or electronic clock"
                                }            
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}