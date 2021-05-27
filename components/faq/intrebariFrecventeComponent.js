import Question from "./Question"
import Paper from "./Paper"

export default function IntrebariFrecventeComponent () {
    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
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
                            question = "Este posibil de comandat oglindă de design personalizat?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Este posibil să comandați oglinzi de dimensiuni individuale?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Este posibil să comandați oglinzi de dimensiuni mari?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Întrebări despre opțiunile oglinzilor
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Unde este amplasat controlul al ceasului integrat ?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Cum să alegeți dimensiunea încălzitorului pentru a elimina aburirea?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Garanție și servicii post-garanție
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Perioada de garanție."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Cum este oferit serviciul de garanție?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Este posibil serviciul post-garanție?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
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
                            question = "Ce să faceți dacă oglinda este deteriorată în timpul transportării?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                    </Paper>

                    <Paper>
                        <h4 className="text-type-dark text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium mb-8">
                            Întrebări tehnice
                        </h4>

                        <div className="w-full h-px bg-ui-blueishGrey"/>
                        <Question
                            question = "Montarea oglinzii pe perete"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Conectarea oglinzei la alimentare."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "În ce loc trebuie să iasă firul din perete pentru a conecta oglinda?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Instalarea unei oglinzi într-o cameră umedă."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Durata de viață a LED-urilor."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Înlocuirea LED-urilor din oglindă cu iluminare LED."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Care este grosimea oglinzii?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Ce foaie de oglindă este folosită?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Instalarea unei oglinzi într-o nișă."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Cât de puternică este iluminarea oglinzii?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Cum să păstrați o oglindă înainte de instalare?"
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                        <Question
                            question = "Reguli de folosire a oglinzilor."
                            answer = "Pe site-ul nostru web, oferim clienților noștri o selecție mare de modele de oglinzi. Dar, puteți seta dimensiunea oglinzii dvs. și chiar dacă doriți, modificați ușor modelul și poziția desenului! Pe lângă modelele prezentate, la solicitarea dvs., suntem pregătiți să producem o oglindă de design individuală. Trimite-ne un e-mailinfo@j-mirror.comdorințele dvs.: dimensiuni, schiță, opțiuni, cerințe tehnice. În scurt timp, vom da un răspuns despre posibilitatea de a produce o astfel de oglindă, termenul de livrare și prețul."
                        />
                    </Paper>
                </div>
            </div>

        </div>
    )
}