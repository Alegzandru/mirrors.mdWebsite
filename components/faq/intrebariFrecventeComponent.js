import Question from "./Question"
import Paper from "./Paper"
import Link from 'next/link'

export default function IntrebariFrecventeComponent ({lang}) {
    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
                <Link href="/">
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
                            Întrebări despre opțiunile oglinzilor
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Cum să alegeți dimensiunea încălzitorului pentru a elimina aburirea?"
                            answer = "Alegerea dimensiunii încălzitorului este determinată de partea din oglindă pe care doriți să o încălziți. Dimensiunea încălzitorului 25 * 25 cm este suficientă pentru a vedea reflectarea feței într-o baie foarte umezită. Un încălzitor mai mare va furniza o suprafață corespunzătoare de încălzire. De asemenea, merită luat în considerare faptul că zona încălzită a oglinzii este puțin mai mare decât dimensiunea încălzitorului. Zonele oglinzii din imediată apropiere a zonelor ilumunate tot se încălzesc ușor și nu fac ceață."
                        />
                        <Question
                            question = "Aplicații și logotipuri color?"
                            answer = "Da, folosim banda color care se lipește pe interior. Pentru un efect mai mare, instalam diode suplimentare care ilumineaza logotipul."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Garanție și servicii post-garanție
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Oferiti garantie?"
                            answer = "Da, noi garantăm ca LED-urile, senzorul și transformatoarele vor functiona impecabil cel puțin 2 ani. Dacă sistemul de iluminare nu funcționează perfect, contactați-ne și acesta va fi înlocuit."
                        />
                    </Paper>
                </div>

                <div className="w-full">
                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Livrare și plată
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Cât costă livrarea?"
                            answer = "Livrăm comanda gratuit pe teritoriului Chișinău. Livrarea pe teritoriul Moldovei sau în altă țară este contra-cost, prețul se stabilește în dependență de greutatea oglinzii."
                        />
                        <Question
                            question = "Care sunt modalitățile de plata?"
                            answer = "Pentru a achita produsele comandate aveți la dispoziție mai multe opțiuni: plata cu card bancar, transfer bancar sau plata ramburs (doar pentru produsele din categoria Livrare Express)."
                        />
                        <Question
                            question = "Este posibil achitare și în rate?"
                            answer = "Aveți posibilitatea de a achiziționa oglinda în rate cu ajutorul companiei de creditare."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Întrebări tehnice
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Cum pot schimba dimensiunile oglinzii?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală."
                        />
                        <Question
                            question = "Ce să faceți dacă oglinda este deteriorată în timpul transportării?"
                            answer = "Responsabilitatea pentru siguranța oglinzii în timpul livrării revine magazinului. Oglinzile noastre au ambalaje speciale pentru transportare care le protejează de posibile deteriorări în timpul livrării. Oglinzile mari sunt ambalate în ambalaj din lemn. Cu toate acestea, atunci când primiți o oglindă în serviciul de livrare, trebuie să vă asigurați că oglinda nu este deteriorată. Deschideți pachetul la primire și verificați oglinda."
                        />
                        <Question
                            question = "Cum se aprinde lumina?"
                            answer = "Pe oglinzile cu iluminare montăm, de bază, întrerupător mecanic (în dependență de model, pentru unele modele trebuie strict prevăzut un întrerupator pe perete). Oferim posibilitatea să alegeți alt tip de întrerupator: buton touch, senzor de misșcare sau buton touch dublu. Indicați tipul de întrerupator ales în formularul de comanda."
                        />
                        <Question
                            question = "Care este temperatura de culoare a luminii?"
                            answer = "Temperatura de culoare a luminii emanată de LED-uri este de 6000K. La dorință, puteți comanda o lumina cu nuanță mai caldă – 4000K. Puteți alege aceasta opțiune din pagina produsului."
                        />
                        <Question
                            question = "Am nevoie de o oglinda de marime atipica. Mi-o puteti face?"
                            answer = "Da, noi putem produce o oglinda de marime atipică, dacă aceasta nu depaseste 2,5 x 2,1 metri. De asemenea, producem oglinzi-mozaic dintr-un număr mare de elemente. Pentru a discuta comanda, vă rugăm să ne contactați."
                        />
                        <Question
                            question = "Ce grosime are oglinda?"
                            answer = "Grosimea oglinzilor cu LED este de 25 mm, luand in calcul și carcasa pentru sistemul de iluminat."
                        />
                        <Question
                            question = "Ramele sunt vopsite manual sau în camera de pulverizare?"
                            answer = "Toate produsele sunt vopsite într-o cameră specială. Aceasta metoda asigura o suprafața uniformă, fără striații și rizuri."
                        />
                        <Question
                            question = "Ce culori sunt disponibile?"
                            answer = "Pentru fiecare produs care poate avea rama colorata, pe site sunt afișate culorile disponibile. Daca doriti sa comandati o alta culoare decat cele prezentate, vă rugăm să ne contactați."
                        />
                        <Question
                            question = "Din ce sunt făcute ramele pentru oglindă?"
                            answer = "În dependență de modelul oglinzii, ramele sunt produse din metal, plastic, lemn și mdf."
                        />
                        <Question
                            question = "În regiunea mea se produc cutremure de pământ. Oglinda nu va cădea?"
                            answer = "Nu. Dacă veți instala oglinda drept, folosind toate piesele de fixare din set, oglinda va rămâne pe perete chiar și în cazul unor vibrații puternice."
                        />
                    </Paper>
                </div>
            </div>

        </div>
    )
}