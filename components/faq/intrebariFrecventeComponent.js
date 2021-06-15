import Question from "./Question"
import Paper from "./Paper"

export default function IntrebariFrecventeComponent () {
    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
                <span className="mr-1">
                    Pagina principală
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>
                    Întrebări frecvente
                </span>
            </div>

            <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-40px md:mb-52px text-shadow-text2">
                Întrebări frecvente
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full mr-40px">
                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Întrebări despre comandă
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Când voi primi produsul comandat?"
                            answer = "Veți primi produsul în timp de 10-20 zile lucrătoare de la confirmarea comenzii. În acest timp noi confecționăm si livram oglinda."
                        />
                        <Question
                            question = "Este posibil să comandați oglinzi de dimensiuni mari?"
                            answer = "Site-ul nostru vă permite să comandați o oglindă într-o gamă largă de dimensiuni de până la 2,5m."
                        />
                        <Question
                            question = "Este posibil de comandat oglindă de design personalizat?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului!"
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Întrebări despre opțiunile oglinzilor
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Cum să alegeți dimensiunea încălzitorului pentru a elimina aburirea?"
                            answer = "Alegerea dimensiunii încălzitorului este determinată de partea din oglindă pe care doriți să o încălziți. Dimensiunea încălzitorului 25 * 25 cm este suficientă pentru a vedea reflectarea feței într-o baie foarte umezită. Un încălzitor mai mare va furniza o suprafață corespunzătoare de încălzire. De asemenea, merită luat în considerare faptul că zona încălzită a oglinzii este puțin mai mare decât dimensiunea încălzitorului. Zonele oglinzii din imediata apropiere a zonelor ilumunate tot se încălzesc ușor și nu fac ceață."
                        />
                        <Question
                            question = "Aplicati si logotipuri color?"
                            answer = "Da, folosim banda color care se lipeste pe interior. Pentru un efect mai mare, instalam diode suplimentare care ilumineaza logotipul."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Garanție și servicii post-garanție
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Oferiti garantie?"
                            answer = "Da, noi garantam ca LED-urile, senzorul si transformatoarele vor functiona impecabil cel putin 2 ani. Daca sistemul de iluminare nu funcționeaza perfect, contactati-ne si acesta va fi inlocuit."
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
                            question = "Care sunt modalitatile de plata?"
                            answer = "Pentru a achita produsele comandate aveti la dispozitie mai multe optiuni: plata cu card bancar, transfer bancar sau plata ramburs (doar pentru produsele din categoria Livrare Express)."
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
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Ce să faceți dacă oglinda este deteriorată în timpul transportării?"
                            answer = "Responsabilitatea pentru siguranța oglinzii în timpul livrării revine magazinului. Oglinzile noastre au ambalaje speciale pentru transportare care le protejează de posibile deteriorări în timpul livrării. Oglinzile mari sunt ambalate în ambalaj din lemn. Cu toate acestea, atunci când primiți o oglindă în serviciul de livrare, trebuie să vă asigurați că oglinda nu este deteriorată. Deschideți pachetul la primire și verificați oglinda."
                        />
                        <Question
                            question = "Cum se aprinde lumina?"
                            answer = "Pe oglinzile cu iluminare montam, de baza, intrerupator mecanic (in dependenta de model, pentru unele modele trebuie stric prevazut un intrerupator pe perete). Oferim posibilitatea sa alegeti alt tip de intrerupator: buton touch, senzor de miscare sau buton touch dublu. Indicati tipul de intrerupator ales in formularul de comanda."
                        />
                        <Question
                            question = "Care este temperatura de culoare a luminii?"
                            answer = "Temperatura de culoare a luminii emanata de LED-uri este de 6000K. La dorinta, puteti comanda o lumina cu nuanta mai calda – 4000K. Puteti alege acesta optiune din pagina produsului."
                        />
                        <Question
                            question = "Am nevoie de o oglinda de marime atipica. Mi-o puteti face?"
                            answer = "Da, noi putem produce o oglinda de marime atipica, daca aceasta nu depaseste 2,5 x 2,1 metri. De asemenea, producem oglinzi-mozaic dintr-un numar mare de elemente. Pentru a discuta comanda, vă rugam sa ne contactati."
                        />
                        <Question
                            question = "Ce grosime are oglinda?"
                            answer = "Grosimea oglinzilor cu LED este de 25 mm, luand in calcul si carcasa pentru sistemul de iluminat."
                        />
                        <Question
                            question = "Ramele sunt vopsite manual sau in camera de pulverizare?"
                            answer = "Toate produsele sunt vopsite intr-o camera speciala. Aceasta metoda asigura o suprafata uniforma, fara striatii si rizuri."
                        />
                        <Question
                            question = "Ce culori sunt disponibile?"
                            answer = "Pentru fiecare produs care poate avea rama colorata, pe site sunt afisate culorile disponibile. Daca doriti sa comandati o alta culoare decat cele prezentate, va rugam sa ne contactati."
                        />
                        <Question
                            question = "Din ce sunt facute ramele pentru oglinda?"
                            answer = "In dependenta de modelul oglinzii, ramele sunt produse din metal, plastic, lemn și mdf."
                        />
                        <Question
                            question = "In regiunea mea se produc cutremure de pamant. Oglinda nu va cadea?"
                            answer = "Nu. Daca veti instala oglinda drept, folosind toate piesele de fixare din set, oglinda va ramane pe perete chiar si in cazul unor vibratii puternice."
                        />
                    </Paper>
                </div>
            </div>

        </div>
    )
}