import Question from "./Question"
import Paper from "./Paper"
import Link from 'next/link'

export default function IntrebariFrecventeComponent ({lang}) {
    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
                <Link href={lang == "ro" ? "/" : "/ru"}>
                    <a>
                        <span className="mr-1 hover:underline transition duration-300">
                            {
                                lang == "ro" ?
                                "Pagina principală"
                                :
                                lang == "ru" ?
                                "Главная страница"
                                :
                                "Homepage"
                            }
                        </span>
                    </a>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>
                    {
                        lang == "ro" ?
                        "Întrebări frecvente"
                        :
                        lang == "ru" ?
                        "Часто задаваемые вопросы"
                        :
                        "Frequently asked questions"
                    }
                </span>
            </div>

            <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-40px md:mb-52px text-shadow-text2">
                {
                    lang == "ro" ?
                    "Întrebări frecvente"
                    :
                    lang == "ru" ?
                    "Часто задаваемые вопросы"
                    :
                    "Frequently asked questions"
                }
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full mr-40px">
                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                        {
                            lang == "ro" ?
                            "Întrebări despre comandă"
                            :
                            lang == "ru" ?
                            "Часто задаваемые вопросы"
                            :
                            "Frequently asked questions"
                        }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Când voi primi produsul comandat?"
                                :
                                lang == "ru" ?
                                "Когда я получу заказанный товар?"
                                :
                                "When will I receive the ordered product?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Veți primi produsul în timp de 10-20 zile lucrătoare de la confirmarea comenzii. În acest timp noi confecționăm și livrăm oglinda."
                                :
                                lang == "ru" ?
                                "Вы получите товар в течение 10-20 рабочих дней с момента подтверждения заказа. За это время изготавливаем и доставляем зеркало."
                                :
                                "You will receive the product within 10-20 working days from order confirmation. During this time we make and deliver the mirror."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil să comandați oglinzi de dimensiuni mari?"
                                :
                                lang == "ru" ?
                                "Можно ли заказать большие зеркала?"
                                :
                                "Is it possible to order large mirrors?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Site-ul nostru vă permite să comandați o oglindă într-o gamă largă de dimensiuni de până la 2,5m."
                                :
                                lang == "ru" ?
                                "На нашем сайте вы можете заказать зеркало в широком диапазоне размеров до 2,5м."
                                :
                                "Our website allows you to order a mirror in a wide range of sizes up to 2.5m."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil de comandat oglindă de design personalizat?"
                                :
                                lang == "ru" ?
                                "Можно ли заказать зеркало нестандартного дизайна?"
                                :
                                "Is it possible to order a custom design mirror?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului!"
                                :
                                lang == "ru" ?
                                "На нашем сайте мы предлагаем нашим покупателям большой выбор моделей зеркал. Но вы можете установить размер своего зеркала и даже при желании легко изменить узор и положение рисунка!"
                                :
                                "On our website, we offer our customers a large selection of mirror models. But, you can set the size of your mirror and even if you want, easily change the pattern and position of the drawing!"
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Întrebări despre opțiunile oglinzilor"
                                :
                                lang == "ru" ?
                                "Вопросы по опциям зеркала"
                                :
                                "QUESTIONS ABOUT MIRROR OPTIONS"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum să alegeți dimensiunea încălzitorului pentru a elimina aburirea?"
                                :
                                lang == "ru" ?
                                "Как выбрать размер каменки для отвода пара?"
                                :
                                "How to choose the size of the heater to remove the steam?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Alegerea dimensiunii încălzitorului este determinată de partea din oglindă pe care doriți să o încălziți. Dimensiunea încălzitorului 25 * 25 cm este suficientă pentru a vedea reflectarea feței într-o baie foarte umezită. Un încălzitor mai mare va furniza o suprafață corespunzătoare de încălzire. De asemenea, merită luat în considerare faptul că zona încălzită a oglinzii este puțin mai mare decât dimensiunea încălzitorului. Zonele oglinzii din imediată apropiere a zonelor ilumunate tot se încălzesc ușor și nu fac ceață."
                                :
                                lang == "ru" ?
                                "Выбор размера обогревателя определяется той частью зеркала, которую вы хотите обогреть. Размер утеплителя 25 * 25 см хватит, чтобы увидеть отражение лица в очень влажной ванной. Нагреватель большего размера обеспечит подходящую поверхность нагрева. Также стоит отметить, что нагреваемая площадь зеркала немного больше, чем размер нагревателя. Зеркальные участки в непосредственной близости от освещенных участков еще немного нагреваются и не запотевают."
                                :
                                "The choice of heater size is determined by the part of the mirror you want to heat. The size of the heater 25 * 25 cm is enough to see the reflection of the face in a very humid bathroom. A larger heater will provide a suitable heating surface. It is also worth noting that the heated area of ​​the mirror is slightly larger than the size of the heater. The mirror areas in the immediate vicinity of the illuminated areas still heat up slightly and do not fog."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Aplicații și logotipuri color?"
                                :
                                lang == "ru" ?
                                "Вы также применяете цветные логотипы?"
                                :
                                "Do you also apply colorful logos?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, folosim banda color care se lipește pe interior. Pentru un efect mai mare, instalam diode suplimentare care ilumineaza logotipul."
                                :
                                lang == "ru" ?
                                "Да, мы используем цветной скотч, который наклеивается с внутренней стороны. Для большего эффекта устанавливаем дополнительные диоды, подсвечивающие логотип."
                                :
                                "Yes, we use colored tape that sticks on the inside. For a greater effect, we install additional diodes that illuminate the logo."
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Garanție și servicii post-garanție"
                                :
                                lang == "ru" ?
                                "Гарантия"
                                :
                                "Guarantee"

                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Oferiti garantie?"
                                :
                                lang == "ru" ?
                                "Вы предлагаете гарантию?"
                                :
                                "Do you offer a guarantee?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, noi garantăm ca LED-urile, senzorul și transformatoarele vor functiona impecabil cel puțin 2 ani. Dacă sistemul de iluminare nu funcționează perfect, contactați-ne și acesta va fi înlocuit."
                                :
                                lang == "ru" ?
                                "Да, мы гарантируем, что светодиоды, датчик и трансформаторы будут безупречно работать как минимум 2 года. Если система освещения не работает идеально, свяжитесь с нами, и она будет заменена."
                                :
                                "Yes, we guarantee that the LEDs, sensor and transformers will work flawlessly for at least 2 years. If the lighting system does not work perfectly, contact us and it will be replaced."
                            }
                        />
                    </Paper>
                </div>

                <div className="w-full">
                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Livrare și plată"
                                :
                                lang == "ru" ?
                                "Доставка и оплата"
                                :
                                "Delivery and Payment"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cât costă livrarea?"
                                :
                                lang == "ru" ?
                                "Сколько стоит доставка?"
                                :
                                "How much does delivery cost?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Livrăm comanda gratuit pe teritoriului Chișinău. Livrarea pe teritoriul Moldovei sau în altă țară este contra-cost, prețul se stabilește în dependență de greutatea oglinzii."
                                :
                                lang == "ru" ?
                                "Доставляем заказ бесплатно по Кишиневу. Доставка по территории Молдовы или в другую страну платная, цена устанавливается в зависимости от веса зеркала."
                                :
                                "We deliver the order free of charge in Chisinau. Delivery on the territory of Moldova or in another country is for a fee, the price is set depending on the weight of the mirror."
                            }
                        />
                        <Question
                            question =
                            {
                                lang == "ro" ?
                                "Care sunt modalitățile de plata?"
                                :
                                lang == "ru" ?
                                "Какие существуют способы оплаты?."
                                :
                                "What are the payment methods?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pentru a achita produsele comandate aveți la dispoziție mai multe opțiuni: plata cu card bancar, transfer bancar sau plata ramburs (doar pentru produsele din categoria Livrare Express)."
                                :
                                lang == "ru" ?
                                "Для оплаты заказанных товаров у вас есть несколько вариантов: оплата банковской картой, банковский перевод или наложенный платеж (только для товаров категории Экспресс-доставка)."
                                :
                                "To pay for the ordered products you have several options: bank card payment, bank transfer or cash on delivery (only for products in the Express Delivery category)."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil achitare și în rate?"
                                :
                                lang == "ru" ?
                                "Можно ли платить в рассрочку?"
                                :
                                "Is it possible to pay in installments as well?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Aveți posibilitatea de a achiziționa oglinda în rate cu ajutorul companiei de creditare."
                                :
                                lang == "ru" ?
                                "Купить зеркало можно в рассрочку с помощью кредитной компании."
                                :
                                "You can buy the mirror in installments with the help of the lending company."
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Întrebări tehnice"
                                :
                                lang == "ru" ?
                                "Технические вопросы"
                                :
                                "Technical Questions"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum pot schimba dimensiunile oglinzii?"
                                :
                                lang == "ru" ?
                                "Как изменить размер зеркала?"
                                :
                                "How can I change the size of the mirror?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală."
                                :
                                lang == "ru" ?
                                "На нашем сайте мы предлагаем нашим покупателям большой выбор моделей зеркал. Но вы можете установить размер своего зеркала и даже при желании легко изменить узор и положение рисунка! Помимо представленных моделей, по вашему запросу мы готовы изготовить зеркало индивидуального дизайна."
                                :
                                " On our website, we offer our customers a large selection of mirror models. But, you can set the size of your mirror and even if you want, easily change the pattern and position of the drawing! In addition to the models presented, at your request, we are ready to produce an individual design mirror."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce să faceți dacă oglinda este deteriorată în timpul transportării?"
                                :
                                lang == "ru" ?
                                "Что делать, если зеркало было повреждено при транспортировке?."
                                :
                                "What to do if the mirror is damaged during transportation?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Responsabilitatea pentru siguranța oglinzii în timpul livrării revine magazinului. Oglinzile noastre au ambalaje speciale pentru transportare care le protejează de posibile deteriorări în timpul livrării. Oglinzile mari sunt ambalate în ambalaj din lemn. Cu toate acestea, atunci când primiți o oglindă în serviciul de livrare, trebuie să vă asigurați că oglinda nu este deteriorată. Deschideți pachetul la primire și verificați oglinda."
                                :
                                lang == "ru" ?
                                "Ответственность за сохранность зеркала при доставке лежит на магазине. Наши зеркала имеют специальную транспортную упаковку, которая защищает их от возможных повреждений при доставке. Большие зеркала упакованы в деревянную тару. Однако при получении зеркала в службе доставки нужно убедиться, что зеркало не повреждено. Откройте посылку при получении и проверьте зеркало."
                                :
                                "The responsibility for the safety of the mirror during delivery lies with the store. Our bullets have special packaging for transport that protects them from possible damage during delivery. Large mirrors are packed in wooden packaging. However, when you receive a mirror in the delivery service, you need to make sure that the mirror is not damaged. Open the package on receipt and check the mirror."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum se aprinde lumina?"
                                :
                                lang == "ru" ?
                                "Как включается свет?"
                                :
                                "How does the light turn on?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe oglinzile cu iluminare montăm, de bază, întrerupător mecanic (în dependență de model, pentru unele modele trebuie strict prevăzut un întrerupator pe perete). Oferim posibilitatea să alegeți alt tip de întrerupator: buton touch, senzor de misșcare sau buton touch dublu. Indicați tipul de întrerupator ales în formularul de comanda."
                                :
                                lang == "ru" ?
                                "На зеркала с подсветкой монтируем, базовый, механический выключатель (в зависимости от модели, для некоторых моделей обязательно должен быть настенный выключатель). Мы предлагаем возможность выбора другого типа переключателя: сенсорная кнопка, датчик движения или кнопка двойного касания. Укажите выбранный тип переключателя в форме заказа."
                                :
                                "On the mirrors with lighting we mount, basic, mechanical switch (depending on the model, for some models a switch on the wall must be strictly provided). We offer the possibility to choose another type of switch: touch button, motion sensor or double touch button. Indicate the type of switch chosen in the order form."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Care este temperatura de culoare a luminii?"
                                :
                                lang == "ru" ?
                                "Какая цветовая температура света?"
                                :
                                "What is the color temperature of the light?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Temperatura de culoare a luminii emanată de LED-uri este de 6000K. La dorință, puteți comanda o lumina cu nuanță mai caldă – 4000K. Puteți alege aceasta opțiune din pagina produsului."
                                :
                                lang == "ru" ?
                                "Цветовая температура света, излучаемого светодиодами, составляет 6000К. При желании можно заказать более теплый свет - 4000К. Вы можете выбрать этот вариант на странице продукта."
                                :
                                "The color temperature of the light emitted by the LEDs is 6000K. If desired, you can order a warmer light - 4000K. You can choose this option from the product page."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Am nevoie de o oglinda de marime atipica. Mi-o puteti face?"
                                :
                                lang == "ru" ?
                                "Мне нужно зеркало нестандартного размера. Ты можешь сделать это для меня?"
                                :
                                "I need a mirror of atypical size. Can you do it for me?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, noi putem produce o oglinda de marime atipică, dacă aceasta nu depaseste 2,5 x 2,1 metri. De asemenea, producem oglinzi-mozaic dintr-un număr mare de elemente. Pentru a discuta comanda, vă rugăm să ne contactați."
                                :
                                lang == "ru" ?
                                "Да, мы можем изготовить зеркало нестандартного размера, если оно не превышает 2,5 х 2,1 метра. Также мы производим мозаичные зеркала из большого количества элементов. Для обсуждения заказа свяжитесь с нами."
                                :
                                "Yes, we can produce a mirror of atypical size, if it does not exceed 2.5 x 2.1 meters. We also produce mosaic mirrors from a large number of elements. To discuss the order, please contact us."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce grosime are oglinda?"
                                :
                                lang == "ru" ?
                                "Какая толщина у зеркала?"
                                :
                                "How thick is the mirror?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Grosimea oglinzilor cu LED este de 25 mm, luand in calcul și carcasa pentru sistemul de iluminat."
                                :
                                lang == "ru" ?
                                "Толщина светодиодных зеркал составляет 25 мм с учетом корпуса для системы освещения."
                                :
                                "The thickness of the LED mirrors is 25 mm, taking into account the housing for the lighting system."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ramele sunt vopsite manual sau în camera de pulverizare?"
                                :
                                lang == "ru" ?
                                "Рамы окрашиваются вручную или в распылительной камере?"
                                :
                                "Are the frames painted by hand or in the spray chamber?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Toate produsele sunt vopsite într-o cameră specială. Aceasta metoda asigura o suprafața uniformă, fără striații și rizuri."
                                :
                                lang == "ru" ?
                                "Все изделия расписываются в специальном помещении. Этот метод обеспечивает однородную поверхность без разводов и морщин."
                                :
                                "All products are painted in a special room. This method ensures a uniform surface, without streaks and wrinkles."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce culori sunt disponibile?"
                                :
                                lang == "ru" ?
                                "Какие цвета доступны?"
                                :
                                "What colors are available?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pentru fiecare produs care poate avea rama colorata, pe site sunt afișate culorile disponibile. Daca doriti sa comandati o alta culoare decat cele prezentate, vă rugăm să ne contactați."
                                :
                                lang == "ru" ?
                                "Доступные цвета отображаются на сайте для каждого товара, который может иметь цветную рамку. Если вы хотите заказать цвет, отличный от представленных, свяжитесь с нами."
                                :
                                "For each product that can have a colored frame, the available colors are displayed on the site. If you want to order a different color than the ones presented, please contact us."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Din ce sunt făcute ramele pentru oglindă?"
                                :
                                lang == "ru" ?
                                "Из чего сделаны зеркальные рамы?"
                                :
                                "What are mirror frames made of?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "În dependență de modelul oglinzii, ramele sunt produse din metal, plastic, lemn și mdf."
                                :
                                lang == "ru" ?
                                "В зависимости от модели зеркала рамы изготавливаются из металла, пластика, дерева и МДФ."
                                :
                                "Depending on the model of the mirror, the frames are made of metal, plastic, wood and MDF."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "În regiunea mea se produc cutremure de pământ. Oglinda nu va cădea?"
                                :
                                lang == "ru" ?
                                "Землетрясения происходят в моем регионе. Зеркало не упадет?"
                                :
                                "Earthquakes occur in my region. Will the mirror not fall?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Nu. Dacă veți instala oglinda drept, folosind toate piesele de fixare din set, oglinda va rămâne pe perete chiar și în cazul unor vibrații puternice."
                                :
                                lang == "ru" ?
                                "Нет. Если установить зеркало прямо, используя все приспособления в комплекте, зеркало останется на стене даже при сильных вибрациях."
                                :
                                "No. If you install the mirror straight, using all the fixtures in the set, the mirror will remain on the wall even in case of strong vibrations."
                            }
                        />
                    </Paper>
                </div>
            </div>

        </div>
    )
}