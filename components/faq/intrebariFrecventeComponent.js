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
                                "Главная страница"
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
                        "Часто задаваемые вопросы"
                    }
                </span>
            </div>

            <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-40px md:mb-52px text-shadow-text2">
                {
                    lang == "ro" ?
                    "Întrebări frecvente"
                    :
                    "Часто задаваемые вопросы"
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
                            "Часто задаваемые вопросы"
                        }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Când voi primi produsul comandat?"
                                :
                                "Когда я получу заказанный товар?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Veți primi produsul în timp de 10-20 zile lucrătoare de la confirmarea comenzii. În acest timp noi confecționăm și livrăm oglinda."
                                :
                                "Вы получите товар в течение 10-20 рабочих дней с момента подтверждения заказа. За это время изготавливаем и доставляем зеркало."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil să comandați oglinzi de dimensiuni mari?"
                                :
                                "Можно ли заказать большие зеркала?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Site-ul nostru vă permite să comandați o oglindă într-o gamă largă de dimensiuni de până la 2,5m."
                                :
                                "На нашем сайте вы можете заказать зеркало в широком диапазоне размеров до 2,5м."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil de comandat oglindă de design personalizat?"
                                :
                                "Можно ли заказать зеркало нестандартного дизайна?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului!"
                                :
                                "На нашем сайте мы предлагаем нашим покупателям большой выбор моделей зеркал. Но вы можете установить размер своего зеркала и даже при желании легко изменить узор и положение рисунка!"
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Întrebări despre opțiunile oglinzilor"
                                :
                                "Вопросы по опциям зеркала"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum să alegeți dimensiunea încălzitorului pentru a elimina aburirea?"
                                :
                                "Как выбрать размер каменки для отвода пара?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Alegerea dimensiunii încălzitorului este determinată de partea din oglindă pe care doriți să o încălziți. Dimensiunea încălzitorului 25 * 25 cm este suficientă pentru a vedea reflectarea feței într-o baie foarte umezită. Un încălzitor mai mare va furniza o suprafață corespunzătoare de încălzire. De asemenea, merită luat în considerare faptul că zona încălzită a oglinzii este puțin mai mare decât dimensiunea încălzitorului. Zonele oglinzii din imediată apropiere a zonelor ilumunate tot se încălzesc ușor și nu fac ceață."
                                :
                                "Выбор размера обогревателя определяется той частью зеркала, которую вы хотите обогреть. Размер утеплителя 25 * 25 см хватит, чтобы увидеть отражение лица в очень влажной ванной. Нагреватель большего размера обеспечит подходящую поверхность нагрева. Также стоит отметить, что нагреваемая площадь зеркала немного больше, чем размер нагревателя. Зеркальные участки в непосредственной близости от освещенных участков еще немного нагреваются и не запотевают."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Aplicații și logotipuri color?"
                                :
                                "Вы также применяете цветные логотипы?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, folosim banda color care se lipește pe interior. Pentru un efect mai mare, instalam diode suplimentare care ilumineaza logotipul."
                                :
                                "Да, мы используем цветной скотч, который наклеивается с внутренней стороны. Для большего эффекта устанавливаем дополнительные диоды, подсвечивающие логотип."
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Garanție și servicii post-garanție"
                                :
                                "Гарантия"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Oferiti garantie?"
                                :
                                "Вы предлагаете гарантию?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, noi garantăm ca LED-urile, senzorul și transformatoarele vor functiona impecabil cel puțin 2 ani. Dacă sistemul de iluminare nu funcționează perfect, contactați-ne și acesta va fi înlocuit."
                                :
                                "Да, мы гарантируем, что светодиоды, датчик и трансформаторы будут безупречно работать как минимум 2 года. Если система освещения не работает идеально, свяжитесь с нами, и она будет заменена."
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
                                "Доставка и оплата"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cât costă livrarea?"
                                :
                                "Сколько стоит доставка?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Livrăm comanda gratuit pe teritoriului Chișinău. Livrarea pe teritoriul Moldovei sau în altă țară este contra-cost, prețul se stabilește în dependență de greutatea oglinzii."
                                :
                                "Доставляем заказ бесплатно по Кишиневу. Доставка по территории Молдовы или в другую страну платная, цена устанавливается в зависимости от веса зеркала."
                            }
                        />
                        <Question
                            question =
                            {
                                lang == "ro" ?
                                "Care sunt modalitățile de plata?"
                                :
                                "Какие существуют способы оплаты?."
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pentru a achita produsele comandate aveți la dispoziție mai multe opțiuni: plata cu card bancar, transfer bancar sau plata ramburs (doar pentru produsele din categoria Livrare Express)."
                                :
                                "Для оплаты заказанных товаров у вас есть несколько вариантов: оплата банковской картой, банковский перевод или наложенный платеж (только для товаров категории Экспресс-доставка)."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Este posibil achitare și în rate?"
                                :
                                "Можно ли платить в рассрочку?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Aveți posibilitatea de a achiziționa oglinda în rate cu ajutorul companiei de creditare."
                                :
                                "Купить зеркало можно в рассрочку с помощью кредитной компании."
                            }
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            {
                                lang == "ro" ?
                                "Întrebări tehnice"
                                :
                                "Технические вопросы"
                            }
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum pot schimba dimensiunile oglinzii?"
                                :
                                "Как изменить размер зеркала?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală."
                                :
                                "На нашем сайте мы предлагаем нашим покупателям большой выбор моделей зеркал. Но вы можете установить размер своего зеркала и даже при желании легко изменить узор и положение рисунка! Помимо представленных моделей, по вашему запросу мы готовы изготовить зеркало индивидуального дизайна."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce să faceți dacă oglinda este deteriorată în timpul transportării?"
                                :
                                "Что делать, если зеркало было повреждено при транспортировке?."
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Responsabilitatea pentru siguranța oglinzii în timpul livrării revine magazinului. Oglinzile noastre au ambalaje speciale pentru transportare care le protejează de posibile deteriorări în timpul livrării. Oglinzile mari sunt ambalate în ambalaj din lemn. Cu toate acestea, atunci când primiți o oglindă în serviciul de livrare, trebuie să vă asigurați că oglinda nu este deteriorată. Deschideți pachetul la primire și verificați oglinda."
                                :
                                "Ответственность за сохранность зеркала при доставке лежит на магазине. Наши зеркала имеют специальную транспортную упаковку, которая защищает их от возможных повреждений при доставке. Большие зеркала упакованы в деревянную тару. Однако при получении зеркала в службе доставки нужно убедиться, что зеркало не повреждено. Откройте посылку при получении и проверьте зеркало."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Cum se aprinde lumina?"
                                :
                                "Как включается свет?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pe oglinzile cu iluminare montăm, de bază, întrerupător mecanic (în dependență de model, pentru unele modele trebuie strict prevăzut un întrerupator pe perete). Oferim posibilitatea să alegeți alt tip de întrerupator: buton touch, senzor de misșcare sau buton touch dublu. Indicați tipul de întrerupator ales în formularul de comanda."
                                :
                                "На зеркала с подсветкой монтируем, базовый, механический выключатель (в зависимости от модели, для некоторых моделей обязательно должен быть настенный выключатель). Мы предлагаем возможность выбора другого типа переключателя: сенсорная кнопка, датчик движения или кнопка двойного касания. Укажите выбранный тип переключателя в форме заказа."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Care este temperatura de culoare a luminii?"
                                :
                                "Какая цветовая температура света?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Temperatura de culoare a luminii emanată de LED-uri este de 6000K. La dorință, puteți comanda o lumina cu nuanță mai caldă – 4000K. Puteți alege aceasta opțiune din pagina produsului."
                                :
                                "Цветовая температура света, излучаемого светодиодами, составляет 6000К. При желании можно заказать более теплый свет - 4000К. Вы можете выбрать этот вариант на странице продукта."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Am nevoie de o oglinda de marime atipica. Mi-o puteti face?"
                                :
                                "Мне нужно зеркало нестандартного размера. Ты можешь сделать это для меня?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Da, noi putem produce o oglinda de marime atipică, dacă aceasta nu depaseste 2,5 x 2,1 metri. De asemenea, producem oglinzi-mozaic dintr-un număr mare de elemente. Pentru a discuta comanda, vă rugăm să ne contactați."
                                :
                                "Да, мы можем изготовить зеркало нестандартного размера, если оно не превышает 2,5 х 2,1 метра. Также мы производим мозаичные зеркала из большого количества элементов. Для обсуждения заказа свяжитесь с нами."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce grosime are oglinda?"
                                :
                                "Какая толщина у зеркала?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Grosimea oglinzilor cu LED este de 25 mm, luand in calcul și carcasa pentru sistemul de iluminat."
                                :
                                "Толщина светодиодных зеркал составляет 25 мм с учетом корпуса для системы освещения."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ramele sunt vopsite manual sau în camera de pulverizare?"
                                :
                                "Рамы окрашиваются вручную или в распылительной камере?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Toate produsele sunt vopsite într-o cameră specială. Aceasta metoda asigura o suprafața uniformă, fără striații și rizuri."
                                :
                                "Все изделия расписываются в специальном помещении. Этот метод обеспечивает однородную поверхность без разводов и морщин."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Ce culori sunt disponibile?"
                                :
                                "Какие цвета доступны?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Pentru fiecare produs care poate avea rama colorata, pe site sunt afișate culorile disponibile. Daca doriti sa comandati o alta culoare decat cele prezentate, vă rugăm să ne contactați."
                                :
                                "Доступные цвета отображаются на сайте для каждого товара, который может иметь цветную рамку. Если вы хотите заказать цвет, отличный от представленных, свяжитесь с нами."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "Din ce sunt făcute ramele pentru oglindă?"
                                :
                                "Из чего сделаны зеркальные рамы?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "În dependență de modelul oglinzii, ramele sunt produse din metal, plastic, lemn și mdf."
                                :
                                "В зависимости от модели зеркала рамы изготавливаются из металла, пластика, дерева и МДФ."
                            }
                        />
                        <Question
                            question = 
                            {
                                lang == "ro" ?
                                "În regiunea mea se produc cutremure de pământ. Oglinda nu va cădea?"
                                :
                                "Землетрясения происходят в моем регионе. Зеркало не упадет?"
                            }
                            answer = 
                            {
                                lang == "ro" ?
                                "Nu. Dacă veți instala oglinda drept, folosind toate piesele de fixare din set, oglinda va rămâne pe perete chiar și în cazul unor vibrații puternice."
                                :
                                "Нет. Если установить зеркало прямо, используя все приспособления в комплекте, зеркало останется на стене даже при сильных вибрациях."
                            }
                        />
                    </Paper>
                </div>
            </div>

        </div>
    )
}