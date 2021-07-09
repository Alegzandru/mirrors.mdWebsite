import Link from "next/link"

export default function TermeniSiConditii({lang}) {
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
                        "Termeni și condiții"
                        :
                        "Условия"
                    }
                </span>
            </div>

            <div className="bg-ui-grey w-full pt-12 px-3 md:pt-16 md:px-16 lg:pt-24 lg:px-272px pb-16">
                <div className="w-full text-type-manatee text-sm-p md:text-md-p lg:text-lg-p terms">
                    <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 mb-8 font-bold">
                        {
                            lang == "ro" ? 
                            "Termeni și condiții"
                            :
                            "Условия"
                        }
                    </h2>
                    <div>
                        {
                            lang == "ro" ? 
                            "Magazinul online este operat în conformitate cu prevederile acestor Termeni si Conditii, care se completează cu prevederile legii aplicabile."
                            :
                            "Интернет-магазин работает в соответствии с положениями настоящих Условий, которые дополняются положениями применимого законодательства."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Aplicarea Termenilor și Condițiilor."
                            :
                            "Применение Условий."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Modificarea și actualizarea acestora"
                            :
                            "Их изменение и обновление"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Navigarea pe acest Site și folosirea Magazinului online implică acceptarea în totalitate a Termenilor și Condițiilor. Utilizatorul site-ului și/sau Clientul declară că a înțeles pe deplin și este de acord cu Termenii și Condițiile prezentate mai jos."
                            :
                            "Просмотр этого Сайта и использование Интернет-магазина подразумевает полное принятие Условий. Пользователь сайта и / или Заказчик заявляют, что он полностью понял и согласен с Условиями, представленными ниже."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "'Elisei & Co' S.R.L. își rezerva dreptul de a modifica în mod unilateral orice informație din conținutul Site-ului, precum și de a actualiza oricând considera necesar acești Termeni și Condiții, fără o notificare prealabilă."
                            :
                            "'Elisei & Co' S.R.L. оставляет за собой право в одностороннем порядке изменять любую информацию в содержании Сайта, а также обновлять настоящие Условия в любое время без предварительного уведомления."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Definiții ale unor termeni folosiți în Termeni și Condiții"
                            :
                            "Определения терминов, используемых в Условиях"
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Client "
                                :
                                "Клиент "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "– Persoana fizica cu varsta peste 18 ani sau, dupa caz, persoana juridica, ce detine un Cont, efectuează o Comandă și în consecință acționează în calitate de cumpărător, fiind parte alături de Vanzator, a Contractului de vanzare-cumparare în forma electronică a produselor ce fac obiectul vânzării prin intermediul Magazinul online."
                            :
                            "- физическое лицо старше 18 лет или, в зависимости от обстоятельств, юридическое лицо, у которого есть Учетная запись, размещает Заказ и, следовательно, действует как покупатель, являясь частью Продавца, договора купли-продажи в в электронном виде товары для продажи через Интернет-магазин."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Comanda "
                                :
                                "Заказ "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Document electronic prin intermediul caruia, Clientul iși exprimă față de Vânzător intentia ferma si irevocabila de a cumpara produsele selectate."
                            :
                            "- Электронный документ, посредством которого Покупатель выражает Продавцу твердое и безотзывное намерение приобрести выбранные товары."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Ținem să vă atenționăm, că toate produsele reprezentate pe acest site se realizeaza pe baza de comandă specială. Timpul de realizare a produselor variază în dependență de model și tip. Produsele comandate se livrează timp de 3-6 saptamani din data confirmării comenzii."
                            :
                            "Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу. Время изготовления изделий зависит от модели и типа. Заказанные товары доставляются в течение 3-6 недель с момента подтверждения заказа."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Contract "
                                :
                                "Контракт "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Contractul de Vanzare – Cumparare în formă electronică încheiat la distanța dintre Vânzător și Client, având ca obiect Produsele arătate în Comandă și confirmate ulterior prin e-mail de către Vânzător, pentru Prețul aplicabil Produselor indicat pe Site și confirmat ulterior prin e-mail de către Vânzător, plătit de către Client conform specificațiilor din Termeni și Condiții."
                            :
                            "- Контракт купли-продажи - Покупка в электронной форме, заключенная на расстоянии между Продавцом и Покупателем, имея в качестве объекта Продукты, указанные в Заказе и впоследствии подтвержденные Продавцом по электронной почте, по Цене, применимой к Продуктам, указанным на на Сайте и впоследствии подтвержденное Продавцом по электронной почте, оплаченное Заказчиком в соответствии со спецификациями Условий."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Curier "
                                :
                                "Курьер "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Compania specializată în curierat de bunuri, aleasă de Vânzător."
                            :
                            "- Компания, специализирующаяся на курьерской доставке товаров, выбранных Продавцом."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Produse "
                                :
                                "Продукция "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Oglinzi, mese de make-up, texte acrilice, așa cum sunt acestea prezentate pe Site."
                            :
                            "- Зеркала, гримерные, акриловые тексты в том виде, в каком они представлены на Сайте."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Ținem să vă atenționăm, că toate produsele prezentate pe acest site se realizează pe bază de comandă specială și se conformează cerințelor și specificațiilor legislației în vigoare."
                            :
                            "Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу и соответствует требованиям и спецификациям действующего законодательства."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Utilizator "
                                :
                                "Пользователь "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Orice persoană care vizitează Site-ul, chiar dacă nu plasează o comandă"
                            :
                            "- любой, кто посещает Сайт, даже если он не размещает заказ."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Comandă "
                                :
                                "Заказ "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Produsele adăugate în coș de către cumpărător, după ce acestea au fost expediate către vânzător"
                            :
                            "- товары, добавленные покупателем в корзину после отправки продавцу."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Vânzător "
                                :
                                "Продавец "
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- ”Elisei & Co” S.R.L"
                            :
                            "- ”Elisei & Co” S.R.L"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Procedura de efectuare a comenzii"
                            :
                            "Порядок оформления заказа"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Crearea Contului. Furnizarea datelor. Acceptul obligatoriu pentru prelucrarea datelor cu caracter personal. Selectarea Produselor si adaugarea lor în coșul de cumpărături. După selectarea Produsului dorit, Clientul trebuie să selecteze opțiunea ”adaugă în coș”, după care Produsul este adaugat automat în ”Coșul de Cumpărături”, a cărui iconița este vizibilă pe bara de navigare din partea dreaptă de sus a paginii."
                            :
                            "Создание аккаунта. Предоставление данных. Обязательное принятие на обработку персональных данных. Выбор продуктов и добавление их в корзину. После выбора желаемого Товара Покупатель должен выбрать опцию «Добавить в корзину», после чего Товар автоматически добавляется в «Корзину», значок которой отображается на панели навигации в правом верхнем углу страницы."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Clientul poate oricand verifica Coșul de Cumpărături făcând click pe iconița ”Coș”, prin care se deschide o fereastră separată în care sunt arătate toate Produsele selectate de Client."
                            :
                            "Клиент всегда может проверить корзину, щелкнув значок «Корзина», который открывает отдельное окно со всеми продуктами, выбранными Клиентом."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prin selectarea opțiunii ”Vezi coșul” se va deschide o pagină în care Clientul va trebui sa introducă toate datele și să completeze toate câmpurile necesare și obligatorii, pentru încheierea tranzacției și livrarea Produselor, prin selectarea atat a metodei/locului de livrare, cat și a modalității de plată (cash la livrare sau achitare online cu cardul) Ținem să vă atenționăm, că toate produsele prezentate pe acest site se realizeaza pe baza de comanda specială."
                            :
                            "При выборе опции «Просмотр корзины» откроется страница, на которой Клиент должен будет ввести все данные и заполнить все необходимые и обязательные поля для завершения транзакции и доставки Продуктов, выбрав как метод / место способа доставки и оплаты (наложенный платеж или онлайн оплата картой) Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Modalitatile de plata acceptate sunt urmatoarele:"
                                :
                                "Возможные способы оплаты:"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Plata prin card (Clientului i se indica tipurile de card acceptate)"
                            :
                            "- Оплата картой"
                        }
                        {
                            lang == "ro" ? 
                            "- Plata in numerar la livrarea produsului pentru produsele comandate din compartimentul"
                            :
                            "- Оплата наличными при доставке товара за товары, заказанные из купе."
                        }
                        {
                            lang == "ro" ? 
                            "- Transfer bancar"
                            :
                            "- Банковский перевод"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Finalizarea Comenzii se realizeaza facand click pe iconita ”Plaseaza comanda”."
                            :
                            "Заказ завершается нажатием на значок «Оформить заказ»."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Următorul pas presupune efectuarea plății Produselor din Comandă introducând toate informațiile necesare, conform modalității alese, imediat după ce comanda este finalizată și plasată, în caz contrar Comanda nu este considerată conformă și nu va fi procesată, iar Clientul va trebui sa reia procedura."
                            :
                            "Следующим шагом является оплата Продуктов в Заказе путем ввода всей необходимой информации в соответствии с выбранным методом сразу после завершения и размещения заказа, в противном случае Заказ не будет считаться соответствующим и не будет обработан, и Заказчик будет иметь для возобновления процедуры."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Modificarea/Abandonarea comenzii pana la plata. În orice stadiu al efectuarii comenzii, pana la efectuarea platii, Clientul poate modifica si/sau abandona o comanda. O comanda abandonată nu va fi procesată și nu va naște niciun fel de obligații pentru proprietarul magazinului online."
                            :
                            "Модификация / отказ от заказа до оплаты. На любом этапе размещения заказа, пока не будет произведена оплата, Клиент может изменить и / или отказаться от заказа. Заброшенный заказ не будет обработан и не повлечет за собой никаких обязательств для владельца интернет-магазина."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Procedura de confirmare a comenzii"
                            :
                            "Процедура подтверждения заказа"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "După finalizarea Comenzii și plasarea acesteia, Clientul va primi la adresa de e-mail furnizata în momentul înregistrării, un mesaj de confirmare a procesării Comenzii. Confirmarea va include o recapitulare a Produselor, prețului și modalității de plată alese, precum și a locului, modalități de livrare. Pană la confirmarea Comenzii, proprietarul magazinului on-line nu are fata de Client obligația de livrare."
                            :
                            "После завершения Заказа и его размещения Клиент получит на адрес электронной почты, указанный при регистрации, сообщение, подтверждающее обработку Заказа. Подтверждение будет включать в себя обзор Продуктов, выбранную цену и способ оплаты, а также место и способы доставки. До подтверждения Заказа владелец Интернет-магазина не несет обязательств по доставке Заказчику."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "O data ce comanda va fi plasată, veți primi confirmare pe e-mail și veți fi contactat telefonic de managerul de vânzări. Ori de câte ori o comandă nu poate fi acceptată, indiferent de motive, Clientul va fi informat, aceasta fiind singura responsabilitate a proprietarului magazinului online."
                            :
                            "После завершения Заказа и его размещения Клиент получит на адрес электронной почты, указанный при регистрации, сообщение, подтверждающее обработку Заказа. Подтверждение будет включать в себя обзор Продуктов, выбранную цену и способ оплаты, а также место и способы доставки. До подтверждения Заказа владелец Интернет-магазина не несет обязательств по доставке Заказчику."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Starea comenzii"
                            :
                            "Статус заказа"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Pentru oglinzi clientul va fi informat pe mail privind starea comenzii:"
                            :
                            "Для зеркал клиент будет проинформирован по электронной почте о статусе заказа:"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Confirmare comandă"
                            :
                            "Подтверждение заказа"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Pret"
                            :
                            "Цена"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prețul este stabilit pentru fiecare Produs în parte. Prețul arătat include TVA (în cota prevăzută de legile în vigoare). Prețul final în lei(MDL) va fi afișat la finalizarea comenzii, în coșul de cumpărături. Prețul arătat în comanda finalizată și plasată, așa cum este confirmat ulterior prin e-mail-ul de confirmare a Comenzii, este prețul ferm pe care Clientul este obligat să îl plătească pentru Produsele comandate."
                            :
                            "Цена устанавливается на каждый товар. Цена указана с учетом НДС (в квоте, установленной действующим законодательством). Окончательная цена в леях (MDL) будет указана в конце заказа в корзине покупок. Цена, указанная в завершенном и размещенном заказе, как впоследствии подтверждается электронным письмом с подтверждением заказа, является твердой ценой, которую Клиент обязан заплатить за заказанные Продукты."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Plata"
                            :
                            "Оплата"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Plata se poate face exclusiv in modalitatile indicate in procedura de efectuare a comenzii, respectiv :"
                            :
                            "Оплата может производиться исключительно способами, указанными в порядке оформления заказа, соответственно:"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- In numerar, la livrarea coletului. Plata se face reprezentantului Curierului in momentul primirii coletului continand Produsele comandate."
                            :
                            "- Наличными при доставке посылки. Оплата производится представителю Курьера при получении посылки с заказанной Продукцией."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- Plata cu cardul"
                            :
                            "- Оплата картой"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- Transfer Bancar"
                            :
                            "- Банковский перевод"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Debitarea cardului/contului dvs. se realizeaza numai după ce ați finalizat și plasat comanda. Pentru siguranța dvs. toate tranzacțiile sunt criptate. Achitările online se efectuează prin intermediul platformei Paynet, care își asumă responsabilitatea pentru siguranța procesului de achitare. In toate cazuri in care plata se face online, comisioanele bancare de orice tip (ex. de transfer, de schimb valutar etc) sunt in sarcina dvs. si nu sunt incluse în Preț/taxele de livrare."
                            :
                            "Во всех случаях, когда оплата производится онлайн, любые банковские комиссии (например, перевод, обмен валюты и т. Д.) Оплачиваются вами и не включены в стоимость / доставку."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Nu se accepta carduri cadou sau carduri de cumparaturi ca forme de plata !"
                            :
                            "Подарочные карты и карты покупок к оплате не принимаются!"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Va rugam sa aveti grija la e-mail-urile de tip phishing !"
                            :
                            "Остерегайтесь фишинговых писем!"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Livrarea"
                            :
                            "Доставка"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Livrarea Produselor comandate pe acest Site se va efectua pe teritoriul R. Moldova."
                            :
                            "Доставка Товаров, заказанных на этом Сайте, будет осуществляться по территории Республики Молдова."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Livrarea se va efectua prin intermediul serviciului de Curierat NovaPoshta"
                            :
                            "Доставка будет осуществляться через курьерскую службу НоваПочта."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prin finalizarea și plasarea Comenzii sunteți de acord cu plata acestor taxe împreuna cu Prețul Produselor."
                            :
                            "Заполняя и размещая Заказ, вы соглашаетесь на оплату этих сборов вместе с Ценой Продуктов."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Momentul incheierii vanzarii. Transferul proprietatii si al riscului."
                            :
                            "Пора закрывать продажу. Передача права собственности и риска."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Contractul de vanzare-cumparare este considerat încheiat doar în momentul în care Clientul primește prin e-mail confirmarea Comenzii din partea Vanzatorului. Informațiile existente pe Site nu constituie un pre-contract sau alt angajament al ”Elisei & Co” S.R.L. față de Client."
                            :
                            "Договор купли-продажи считается заключенным только после того, как Покупатель получит по электронной почте подтверждение Заказа от Продавца. Информация на Сайте не является предварительным контрактом или другими обязательствами компании 'Elisei & Co' S.R.L. к клиенту."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Transferul proprietății și al riscurilor asupra Produselor intervine la momentul livrării coletului sub condiția efectuării plății integrale a Prețului și taxelor de livrare."
                            :
                            "Передача права собственности и рисков в отношении Продуктов происходит во время доставки пакета при условии полной оплаты Цены и сборов за доставку."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Garanții"
                            :
                            "ГАРАНТИИ"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Pentru Produsele livrate Vânzătorul oferă garanție în condițiile legii, Produsele fiind însoțite de certificate corespunzătoare în acest sens."
                            :
                            "В отношении поставленных Продуктов Продавец предлагает гарантию в соответствии с законодательством, при этом Продукты сопровождаются соответствующими сертификатами в этом отношении."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Plângeri referitoare la conformitatea Produselor"
                            :
                            "Жалобы на соответствие Товаров"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Produsele care fac obiectul comercializării prin intermediul magazinului online sunt produse noi, care nu prezinta defecte."
                            :
                            "Товары, которые продаются через Интернет-магазин, являются новыми товарами, не имеющими дефектов."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Clientul este rugat sa acorde atentie culorilor și detaliilor decorative (grosimea liniei, fațetului, culoarea lemnului, luminii) și să ia în considerare faptul că, datorită setărilor propriului calculator/dispozitiv electronic, anumite culori, detalii mici, reale ale Produselor livrate pot prezenta diferențe față de ce a aflat calculatorul/dispozitivul electronic al Clientului la momentul efectuarii Comenzii. Aceste diferențe nu se vor considera neconformități."
                            :
                            "Заказчика просят обратить внимание на цвета и декоративные детали (толщина линии, шпон, цвет дерева, свет) и принять во внимание, что из-за настроек вашего компьютера / электронного устройства определенные цвета, мелкие, реальные детали поставленные продукты могут отличаться от того, что обнаружил компьютер / электронное устройство Клиента во время размещения Заказа. Эти различия не будут считаться несоответствиями.."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Clientul este obligat sa verifice integritatea produsului la livrare, înainte de recepționarea coletului de la curier"
                            :
                            "Покупатель обязан проверить целостность товара при доставке, прежде чем получить посылку от курьера."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Prin accesarea acestor Termeni și Condiții Utilizatorul/Clientul înțelege și accepta ca este interzisă în mod expres orice utilizare a Site-ului și conținutul acestuia în alte scopuri decât cele permise conform Termenilor și Condițiilor/Contractului."
                            :
                            "Получая доступ к этим Условиям, Пользователь / Заказчик понимает и соглашается с тем, что любое использование Сайта и его содержимого для целей, отличных от разрешенных в соответствии с Условиями / Контрактом, прямо запрещено."
                        }
                    </div>
                    <div className="font-bold">
                        {   
                            lang == "ro" ? 
                            "Confidențialitate. Prelucrarea datelor cu caracter personal"
                            :
                            "Конфиденциальность. Обработка личных данных"
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "”Elisei & Co” se va asigura că datele Utilizatorilor/Clienților furnizate prin navigarea pe Site, prin plasarea Comenzii și executarea Contractului sunt păstrate confidențiale atât de angajații proprii cât și de partenerii comerciali și împuterniciți."
                            :
                            "«Elisei & Co» гарантирует, что данные Пользователей / Клиентов, предоставленные при просмотре Сайта, размещении Заказа и выполнении Контракта, сохраняются в конфиденциальности как ее собственными сотрудниками, так и ее коммерческими и уполномоченными партнерами."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "”Elisei & Co” prelucrează datele cu caracter personal oferite de Utilizatori/Clienți în conformitate cu prevederile legislației din R. Moldova, în vigoare."
                            :
                            "«Elisei & Co» обрабатывает персональные данные, предоставленные Пользователями / Клиентами, в соответствии с положениями действующего законодательства Республики Молдова."
                        }
                    </div>
                    {/* <div>
                    Pentru detalii privind toate aceste aspecte va rugam sa consultati sectiunea ”Politica de confidentialitate” de pe acest Site.
                    </div> */}
                </div>
            </div>
        </div>
    )
}