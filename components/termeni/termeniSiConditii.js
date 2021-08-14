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
                        "Termeni și condiții"
                        :
                        lang == "ru" ?
                        "Условия"
                        :
                        "Terms and Conditions"
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
                            lang == "ru" ?
                            "Условия"
                            :
                            "Terms and Conditions"
                        }
                    </h2>
                    <div>
                        {
                            lang == "ro" ? 
                            "Magazinul online este operat în conformitate cu prevederile acestor Termeni si Conditii, care se completează cu prevederile legii aplicabile."
                            :
                            lang == "ru" ?
                            "Интернет-магазин работает в соответствии с положениями настоящих Условий, которые дополняются положениями применимого законодательства."
                            :
                            "The online store is operated in accordance with the provisions of these Terms and Conditions, which are supplemented by the provisions of applicable law."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Aplicarea Termenilor și Condițiilor."
                            :
                            lang == "ru" ?
                            "Применение Условий."
                            :
                            "Application of the Terms and Conditions."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Modificarea și actualizarea acestora"
                            :
                            lang == "ru" ?
                            "Их изменение и обновление"
                            :
                            "Modifying and updating them"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Navigarea pe acest Site și folosirea Magazinului online implică acceptarea în totalitate a Termenilor și Condițiilor. Utilizatorul site-ului și/sau Clientul declară că a înțeles pe deplin și este de acord cu Termenii și Condițiile prezentate mai jos."
                            :
                            lang == "ru" ?
                            "Просмотр этого Сайта и использование Интернет-магазина подразумевает полное принятие Условий. Пользователь сайта и / или Заказчик заявляют, что он полностью понял и согласен с Условиями, представленными ниже."
                            :
                            "Browsing this Site and using the Online Store implies full acceptance of the Terms and Conditions. The user of the site and / or the Customer declares that he has fully understood and agrees with the Terms and Conditions presented below."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "'Elisei & Co' S.R.L. își rezerva dreptul de a modifica în mod unilateral orice informație din conținutul Site-ului, precum și de a actualiza oricând considera necesar acești Termeni și Condiții, fără o notificare prealabilă."
                            :
                            lang == "ru" ? 
                            "'Elisei & Co' S.R.L. оставляет за собой право в одностороннем порядке изменять любую информацию в содержании Сайта, а также обновлять настоящие Условия в любое время без предварительного уведомления."
                            :
                            "“Elisei & Co” S.R.L. reserves the right to unilaterally change any information in the content of the Site, as well as to update these Terms and Conditions at any time, without prior notice."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Definiții ale unor termeni folosiți în Termeni și Condiții"
                            :
                            lang == "ru" ? 
                            "Определения терминов, используемых в Условиях"
                            :
                            "Definitions of terms used in the Terms and Conditions"
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Client "
                                :
                                lang == "ru" ?
                                "Клиент "
                                :
                                "Customer"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "– Persoana fizica cu varsta peste 18 ani sau, dupa caz, persoana juridica, ce detine un Cont, efectuează o Comandă și în consecință acționează în calitate de cumpărător, fiind parte alături de Vanzator, a Contractului de vanzare-cumparare în forma electronică a produselor ce fac obiectul vânzării prin intermediul Magazinul online."
                            :
                            lang == "ru" ?
                            "- физическое лицо старше 18 лет или, в зависимости от обстоятельств, юридическое лицо, у которого есть Учетная запись, размещает Заказ и, следовательно, действует как покупатель, являясь частью Продавца, договора купли-продажи в в электронном виде товары для продажи через Интернет-магазин."
                            :
                            "- The natural person over 18 years of age or, as the case may be, the legal person, who holds an Account, places an Order and consequently acts as a buyer, being part with the Seller, of the sale-purchase contract in electronic form. products for sale through the Online Store."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Comanda "
                                :
                                lang == "ru" ?
                                "Заказ "
                                :
                                "Order"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Document electronic prin intermediul caruia, Clientul iși exprimă față de Vânzător intentia ferma si irevocabila de a cumpara produsele selectate."
                            :
                            lang == "ru" ?
                            "- Электронный документ, посредством которого Покупатель выражает Продавцу твердое и безотзывное намерение приобрести выбранные товары."
                            :
                            "- Electronic document through which the Customer expresses to the Seller his firm and irrevocable intention to buy the selected products."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Ținem să vă atenționăm, că toate produsele reprezentate pe acest site se realizeaza pe baza de comandă specială. Timpul de realizare a produselor variază în dependență de model și tip. Produsele comandate se livrează timp de 3-6 saptamani din data confirmării comenzii."
                            :
                            lang == "ru" ?
                            "Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу. Время изготовления изделий зависит от модели и типа. Заказанные товары доставляются в течение 3-6 недель с момента подтверждения заказа."
                            :
                            "We would like to warn you that all the products represented on this site are made on a special order basis. The time to make the products varies depending on the model and type. The ordered products are delivered for 3-6 weeks from the date of order confirmation."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Contract "
                                :
                                lang == "ru" ?
                                "Контракт "
                                :
                                "Contract"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Contractul de Vanzare – Cumparare în formă electronică încheiat la distanța dintre Vânzător și Client, având ca obiect Produsele arătate în Comandă și confirmate ulterior prin e-mail de către Vânzător, pentru Prețul aplicabil Produselor indicat pe Site și confirmat ulterior prin e-mail de către Vânzător, plătit de către Client conform specificațiilor din Termeni și Condiții."
                            :
                            lang == "ru" ?
                            "- Контракт купли-продажи - Покупка в электронной форме, заключенная на расстоянии между Продавцом и Покупателем, имея в качестве объекта Продукты, указанные в Заказе и впоследствии подтвержденные Продавцом по электронной почте, по Цене, применимой к Продуктам, указанным на на Сайте и впоследствии подтвержденное Продавцом по электронной почте, оплаченное Заказчиком в соответствии со спецификациями Условий."
                            :
                            "- Contract of Sale - Purchase in electronic form concluded at a distance between the Seller and the Customer, having as object the Products shown in the Order and subsequently confirmed by e-mail by the Seller, for the Price applicable to the Products indicated on the Site and subsequently confirmed by e-mail by the Seller, paid by the Customer according to the specifications of the Terms and Conditions."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Curier "
                                :
                                lang == "ru" ?
                                "Курьер "
                                :
                                "Courier"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Compania specializată în curierat de bunuri, aleasă de Vânzător."
                            :
                            lang == "ru" ?
                            "- Компания, специализирующаяся на курьерской доставке товаров, выбранных Продавцом."
                            :
                            "The company specialized in courier of goods, chosen by the Seller."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Produse "
                                :
                                lang == "ru" ?
                                "Продукция "
                                :
                                "Products"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Oglinzi, mese de make-up, texte acrilice, așa cum sunt acestea prezentate pe Site."
                            :
                            lang == "ru" ?
                            "- Зеркала, гримерные, акриловые тексты в том виде, в каком они представлены на Сайте."
                            :
                            "- Mirrors, make-up tables, acrylic texts, as they are presented on the Site."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Ținem să vă atenționăm, că toate produsele prezentate pe acest site se realizează pe bază de comandă specială și se conformează cerințelor și specificațiilor legislației în vigoare."
                            :
                            lang == "ru" ?
                            "Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу и соответствует требованиям и спецификациям действующего законодательства."
                            :
                            "We would like to warn you that all the products presented on this site are made on a special order basis and comply with the requirements and specifications of the legislation in force"
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Utilizator "
                                :
                                lang == "ru" ?
                                "Пользователь "
                                :
                                "User"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Orice persoană care vizitează Site-ul, chiar dacă nu plasează o comandă"
                            :
                            lang == "ru" ?
                            "- любой, кто посещает Сайт, даже если он не размещает заказ."
                            :
                            "- Anyone who visits the Site, even if they do not place an order"
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Comandă "
                                :
                                lang == "ru" ?
                                "Заказ"
                                :
                                "Order"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Produsele adăugate în coș de către cumpărător, după ce acestea au fost expediate către vânzător"
                            :
                            lang == "ru" ?
                            "- товары, добавленные покупателем в корзину после отправки продавцу."
                            :
                            " - Products added to the cart by the buyer, after they have been shipped to the seller"
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Vânzător "
                                :
                                lang == "ru" ?
                                "Продавец "
                                :
                                "Seller"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- ”Elisei & Co” S.R.L"
                            :
                            lang == "ru" ?
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
                            lang == "ru" ?
                            "Порядок оформления заказа"
                            :
                            "Ordering procedure"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Crearea Contului. Furnizarea datelor. Acceptul obligatoriu pentru prelucrarea datelor cu caracter personal. Selectarea Produselor si adaugarea lor în coșul de cumpărături. După selectarea Produsului dorit, Clientul trebuie să selecteze opțiunea ”adaugă în coș”, după care Produsul este adaugat automat în ”Coșul de Cumpărături”, a cărui iconița este vizibilă pe bara de navigare din partea dreaptă de sus a paginii."
                            :
                            lang == "ru" ?
                            "Создание аккаунта. Предоставление данных. Обязательное принятие на обработку персональных данных. Выбор продуктов и добавление их в корзину. После выбора желаемого Товара Покупатель должен выбрать опцию «Добавить в корзину», после чего Товар автоматически добавляется в «Корзину», значок которой отображается на панели навигации в правом верхнем углу страницы."
                            :
                            "Account Creation. Data provision. Mandatory acceptance for the processing of personal data.Selecting Products and adding them to the shopping cart. After selecting the desired Product, the Customer must select the option add to cart, after which the Product is automatically added to the Shopping Cart, whose icon is visible on the navigation bar at the top right of the page."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Clientul poate oricand verifica Coșul de Cumpărături făcând click pe iconița ”Coș”, prin care se deschide o fereastră separată în care sunt arătate toate Produsele selectate de Client."
                            :
                            lang == "ru" ?
                            "Клиент всегда может проверить корзину, щелкнув значок «Корзина», который открывает отдельное окно со всеми продуктами, выбранными Клиентом."
                            :
                            "The Customer can always check the Shopping Cart by clicking on the Cart icon, which opens a separate window showing all the Products selected by the Customer."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prin selectarea opțiunii ”Vezi coșul” se va deschide o pagină în care Clientul va trebui sa introducă toate datele și să completeze toate câmpurile necesare și obligatorii, pentru încheierea tranzacției și livrarea Produselor, prin selectarea atat a metodei/locului de livrare, cat și a modalității de plată (cash la livrare sau achitare online cu cardul) Ținem să vă atenționăm, că toate produsele prezentate pe acest site se realizeaza pe baza de comanda specială."
                            :
                            lang == "ru" ?
                            "При выборе опции «Просмотр корзины» откроется страница, на которой Клиент должен будет ввести все данные и заполнить все необходимые и обязательные поля для завершения транзакции и доставки Продуктов, выбрав как метод / место способа доставки и оплаты (наложенный платеж или онлайн оплата картой) Предупреждаем, что вся продукция, представленная на сайте, изготавливается по специальному заказу."
                            :
                            "By selecting the option ”View cart” will open a page where the Customer will have to enter all the data and fill in all the necessary and mandatory fields to complete the transaction and delivery of Products, by selecting both the method / place of delivery and payment method (cash on delivery or online payment by card). We would like to warn you that all the products presented on this site are made on the basis of a special order."
                        }
                    </div>
                    <div>
                        <span className="font-bold">
                            {
                                lang == "ro" ? 
                                "Modalitatile de plata acceptate sunt urmatoarele:"
                                :
                                lang == "ru" ?
                                "Возможные способы оплаты:"
                                :
                                "The accepted payment methods are the following:"
                            }
                        </span>
                        {
                            lang == "ro" ? 
                            "- Plata prin card (Clientului i se indica tipurile de card acceptate)"
                            :
                            lang == "ru" ?
                            "- Оплата картой"
                            :
                            "- Payment by card"
                        }
                        {
                            lang == "ro" ? 
                            "- Plata in numerar la livrarea produsului pentru produsele comandate din compartimentul"
                            :
                            lang == "ru" ?
                            "- Оплата наличными при доставке товара за товары, заказанные из купе."
                            :
                            "- Payment in cash upon delivery of the product for the products ordered from the compartment"
                        }
                        {
                            lang == "ro" ? 
                            "- Transfer bancar"
                            :
                            lang == "ru" ?
                            "- Банковский перевод"
                            :
                            "- Bank transfer"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Finalizarea Comenzii se realizeaza facand click pe iconita ”Plaseaza comanda”."
                            :
                            lang == "ru" ?
                            "Заказ завершается нажатием на значок «Оформить заказ»."
                            :
                            "The order is completed by clicking on the 'Place order' icon."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Următorul pas presupune efectuarea plății Produselor din Comandă introducând toate informațiile necesare, conform modalității alese, imediat după ce comanda este finalizată și plasată, în caz contrar Comanda nu este considerată conformă și nu va fi procesată, iar Clientul va trebui sa reia procedura."
                            :
                            lang == "ru" ?
                            "Следующим шагом является оплата Продуктов в Заказе путем ввода всей необходимой информации в соответствии с выбранным методом сразу после завершения и размещения заказа, в противном случае Заказ не будет считаться соответствующим и не будет обработан, и Заказчик будет иметь для возобновления процедуры."
                            :
                            "The next step involves paying for the Products in the Order by entering all the necessary information, according to the chosen method, immediately after the order is completed and placed, otherwise the Order is not considered compliant and will not be processed and the Customer will have to resume the procedure."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Modificarea/Abandonarea comenzii pana la plata. În orice stadiu al efectuarii comenzii, pana la efectuarea platii, Clientul poate modifica si/sau abandona o comanda. O comanda abandonată nu va fi procesată și nu va naște niciun fel de obligații pentru proprietarul magazinului online."
                            :
                            lang == "ru" ?
                            "Модификация / отказ от заказа до оплаты. На любом этапе размещения заказа, пока не будет произведена оплата, Клиент может изменить и / или отказаться от заказа. Заброшенный заказ не будет обработан и не повлечет за собой никаких обязательств для владельца интернет-магазина."
                            :
                            "Modification / Abandonment of the order until payment. At any stage of placing the order, until payment is made, the Customer may modify and / or abandon an order. An abandoned order will not be processed and will not give rise to any obligations for the owner of the online store."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Procedura de confirmare a comenzii"
                            :
                            lang == "ru" ?
                            "Процедура подтверждения заказа"
                            :
                            "Order confirmation procedure"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "După finalizarea Comenzii și plasarea acesteia, Clientul va primi la adresa de e-mail furnizata în momentul înregistrării, un mesaj de confirmare a procesării Comenzii. Confirmarea va include o recapitulare a Produselor, prețului și modalității de plată alese, precum și a locului, modalități de livrare. Pană la confirmarea Comenzii, proprietarul magazinului on-line nu are fata de Client obligația de livrare."
                            :
                            lang == "ru" ?
                            "После завершения Заказа и его размещения Клиент получит на адрес электронной почты, указанный при регистрации, сообщение, подтверждающее обработку Заказа. Подтверждение будет включать в себя обзор Продуктов, выбранную цену и способ оплаты, а также место и способы доставки. До подтверждения Заказа владелец Интернет-магазина не несет обязательств по доставке Заказчику."
                            :
                            "After completing the Order and placing it, the Customer will receive at the e-mail address provided at the time of registration, a message confirming the processing of the Order. Confirmation will include a summary of the Products, the price and method of payment chosen, as well as the place, methods of delivery. Until the confirmation of the Order, the owner of the online store has no obligation to the Customer to deliver."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "O data ce comanda va fi plasată, veți primi confirmare pe e-mail și veți fi contactat telefonic de managerul de vânzări. Ori de câte ori o comandă nu poate fi acceptată, indiferent de motive, Clientul va fi informat, aceasta fiind singura responsabilitate a proprietarului magazinului online."
                            :
                            lang == "ru" ?
                            "После завершения Заказа и его размещения Клиент получит на адрес электронной почты, указанный при регистрации, сообщение, подтверждающее обработку Заказа. Подтверждение будет включать в себя обзор Продуктов, выбранную цену и способ оплаты, а также место и способы доставки. До подтверждения Заказа владелец Интернет-магазина не несет обязательств по доставке Заказчику."
                            :
                            "Once the order is placed, you will receive an email confirmation and will be contacted by phone by the sales manager. Whenever an order cannot be accepted, for whatever reason, the Customer will be informed, this being the sole responsibility of the owner of the online store."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Starea comenzii"
                            :
                            lang == "ru" ?
                            "Статус заказа"
                            :
                            "Order status"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Pentru oglinzi clientul va fi informat pe mail privind starea comenzii:"
                            :
                            lang == "ru" ?
                            "Для зеркал клиент будет проинформирован по электронной почте о статусе заказа:"
                            :
                            "For mirrors the customer will be informed by email about the status of the order:"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Confirmare comandă"
                            :
                            lang == "ru" ?
                            "Подтверждение заказа"
                            :
                            "Order confirmation"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Pret"
                            :
                            lang == "ru" ?
                            "Цена"
                            :
                            "Price"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prețul este stabilit pentru fiecare Produs în parte. Prețul arătat include TVA (în cota prevăzută de legile în vigoare). Prețul final în lei(MDL) va fi afișat la finalizarea comenzii, în coșul de cumpărături. Prețul arătat în comanda finalizată și plasată, așa cum este confirmat ulterior prin e-mail-ul de confirmare a Comenzii, este prețul ferm pe care Clientul este obligat să îl plătească pentru Produsele comandate."
                            :
                            lang == "ru" ?
                            "Цена устанавливается на каждый товар. Цена указана с учетом НДС (в квоте, установленной действующим законодательством). Окончательная цена в леях (MDL) будет указана в конце заказа в корзине покупок. Цена, указанная в завершенном и размещенном заказе, как впоследствии подтверждается электронным письмом с подтверждением заказа, является твердой ценой, которую Клиент обязан заплатить за заказанные Продукты."
                            :
                            "The price is set for each product. The price shown includes VAT (in the quota provided by the laws in force).The final price in lei (MDL) will be displayed at the end of the order, in the shopping cart.The price shown in the completed and placed order, as subsequently confirmed by the order confirmation email, is the firm price that the Customer is obliged to pay for the Products ordered."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Plata"
                            :
                            lang == "ru" ?
                            "Оплата"
                            :
                            "The payment"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Plata se poate face exclusiv in modalitatile indicate in procedura de efectuare a comenzii, respectiv :"
                            :
                            lang == "ru" ?
                            "Оплата может производиться исключительно способами, указанными в порядке оформления заказа, соответственно:"
                            :
                            "Payment can be made exclusively in the ways indicated in the ordering procedure, respectively:"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- In numerar, la livrarea coletului. Plata se face reprezentantului Curierului in momentul primirii coletului continand Produsele comandate."
                            :
                            lang == "ru" ?
                            "- Наличными при доставке посылки. Оплата производится представителю Курьера при получении посылки с заказанной Продукцией."
                            :
                            "- In cash, upon delivery of the package. Payment is made to the Courier's representative upon receipt of the package containing the ordered Products."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- Plata cu cardul"
                            :
                            lang == "ru" ? 
                            "- Оплата картой"
                            :
                            "- Payment by card"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "- Transfer Bancar"
                            :
                            lang == "ru" ?
                            "- Банковский перевод"
                            :
                            "- Bank transfer"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Debitarea cardului/contului dvs. se realizeaza numai după ce ați finalizat și plasat comanda. Pentru siguranța dvs. toate tranzacțiile sunt criptate. Achitările online se efectuează prin intermediul platformei Paynet, care își asumă responsabilitatea pentru siguranța procesului de achitare. In toate cazuri in care plata se face online, comisioanele bancare de orice tip (ex. de transfer, de schimb valutar etc) sunt in sarcina dvs. si nu sunt incluse în Preț/taxele de livrare."
                            :
                            lang == "ru" ?
                            "Во всех случаях, когда оплата производится онлайн, любые банковские комиссии (например, перевод, обмен валюты и т. Д.) Оплачиваются вами и не включены в стоимость / доставку."
                            :
                            "Your card / account is debited only after you have completed and placed your order. For your security, all transactions are encrypted. Online payments are made through the Paynet platform, which assumes responsibility for the security of the payment process. In all cases where payment is made online, bank fees of any kind (eg transfer, foreign exchange, etc.) are borne by you and are not included in the price / delivery charges."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Nu se accepta carduri cadou sau carduri de cumparaturi ca forme de plata !"
                            :
                            lang == "ru" ? 
                            "Подарочные карты и карты покупок к оплате не принимаются!"
                            :
                            "Gift cards or shopping cards are not accepted as forms of payment!"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Va rugam sa aveti grija la e-mail-urile de tip phishing !"
                            :
                            lang == "ru" ?
                            "Остерегайтесь фишинговых писем!"
                            :
                            "Please watch out for phishing emails!"
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Livrarea"
                            :
                            lang == "ru" ?
                            "Доставка"
                            :
                            "Delivery"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Livrarea Produselor comandate pe acest Site se va efectua pe teritoriul R. Moldova."
                            :
                            lang == "ru" ? 
                            "Доставка Товаров, заказанных на этом Сайте, будет осуществляться по территории Республики Молдова."
                            :
                            "The delivery of the Products ordered on this Site will be made on the territory of the Republic of Moldova."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Livrarea se va efectua prin intermediul serviciului de Curierat NovaPoshta"
                            :
                            lang == "ru" ?
                            "Доставка будет осуществляться через курьерскую службу НоваПочта."
                            :
                            "Delivery will be made through the NovaPoshta Courier service."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Prin finalizarea și plasarea Comenzii sunteți de acord cu plata acestor taxe împreuna cu Prețul Produselor."
                            :
                            lang == "ru" ?
                            "Заполняя и размещая Заказ, вы соглашаетесь на оплату этих сборов вместе с Ценой Продуктов."
                            :
                            "By completing and placing the Order you agree to the payment of these fees together with the Price of the Products"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Momentul incheierii vanzarii. Transferul proprietatii si al riscului."
                            :
                            lang == "ru" ?
                            "Пора закрывать продажу. Передача права собственности и риска."
                            :
                            "Sale. Transfer of ownership and risk"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Contractul de vanzare-cumparare este considerat încheiat doar în momentul în care Clientul primește prin e-mail confirmarea Comenzii din partea Vanzatorului. Informațiile existente pe Site nu constituie un pre-contract sau alt angajament al ”Elisei & Co” S.R.L. față de Client."
                            :
                            lang == "ru" ?
                            "Договор купли-продажи считается заключенным только после того, как Покупатель получит по электронной почте подтверждение Заказа от Продавца. Информация на Сайте не является предварительным контрактом или другими обязательствами компании 'Elisei & Co' S.R.L. к клиенту."
                            :
                            "The sale-purchase contract is considered concluded only when the Customer receives by e-mail the confirmation of the Order from the Seller. The information on the Site does not constitute a pre-contract or other commitment of 'Elisei & Co' S.R.L. to the Customer."
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Transferul proprietății și al riscurilor asupra Produselor intervine la momentul livrării coletului sub condiția efectuării plății integrale a Prețului și taxelor de livrare."
                            :
                            lang == "ru" ?
                            "Передача права собственности и рисков в отношении Продуктов происходит во время доставки пакета при условии полной оплаты Цены и сборов за доставку."
                            :
                            "The transfer of ownership and risks to the Products occurs at the time of delivery of the package subject to full payment of the Price and delivery fees."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Garanții"
                            :
                            lang == "ru" ?
                            "ГАРАНТИИ"
                            :
                            "GUARANTEES"

                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Pentru Produsele livrate Vânzătorul oferă garanție în condițiile legii, Produsele fiind însoțite de certificate corespunzătoare în acest sens."
                            :
                            lang == "ru" ?
                            "В отношении поставленных Продуктов Продавец предлагает гарантию в соответствии с законодательством, при этом Продукты сопровождаются соответствующими сертификатами в этом отношении."
                            :
                            "For the delivered Products, the Seller offers a guarantee in accordance with the law, the Products being accompanied by appropriate certificates in this respect."
                        }
                    </div>
                    <div className="font-bold">
                        {
                            lang == "ro" ? 
                            "Plângeri referitoare la conformitatea Produselor"
                            :
                            lang == "ru" ?
                            "Жалобы на соответствие Товаров"
                            :
                            "Complaints regarding the conformity of the Products"
                        }
                    </div>
                    <div>
                        {
                            lang == "ro" ? 
                            "Produsele care fac obiectul comercializării prin intermediul magazinului online sunt produse noi, care nu prezinta defecte."
                            :
                            lang == "ru" ?
                            "Товары, которые продаются через Интернет-магазин, являются новыми товарами, не имеющими дефектов."
                            :
                            "The products that are marketed through the online store are new products that do not have defects."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Clientul este rugat sa acorde atentie culorilor și detaliilor decorative (grosimea liniei, fațetului, culoarea lemnului, luminii) și să ia în considerare faptul că, datorită setărilor propriului calculator/dispozitiv electronic, anumite culori, detalii mici, reale ale Produselor livrate pot prezenta diferențe față de ce a aflat calculatorul/dispozitivul electronic al Clientului la momentul efectuarii Comenzii. Aceste diferențe nu se vor considera neconformități."
                            :
                            lang == "ru" ?
                            "Заказчика просят обратить внимание на цвета и декоративные детали (толщина линии, шпон, цвет дерева, свет) и принять во внимание, что из-за настроек вашего компьютера / электронного устройства определенные цвета, мелкие, реальные детали поставленные продукты могут отличаться от того, что обнаружил компьютер / электронное устройство Клиента во время размещения Заказа. Эти различия не будут считаться несоответствиями."
                            :
                            "The customer is asked to pay attention to the colors and decorative details (line thickness, veneer, wood color, light) and take into account that, due to the settings of your computer / electronic device, certain colors, small, real details of the delivered products may differ. compared to what the Client's computer / electronic device found out at the time of placing the Order. These differences will not be considered non-conformities."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Clientul este obligat sa verifice integritatea produsului la livrare, înainte de recepționarea coletului de la curier"
                            :
                            lang == "ru" ?
                            "Покупатель обязан проверить целостность товара при доставке, прежде чем получить посылку от курьера."
                            :
                            "The customer is obliged to check the integrity of the product upon delivery, before receiving the package from the courier."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "Prin accesarea acestor Termeni și Condiții Utilizatorul/Clientul înțelege și accepta ca este interzisă în mod expres orice utilizare a Site-ului și conținutul acestuia în alte scopuri decât cele permise conform Termenilor și Condițiilor/Contractului."
                            :
                            lang == "ru" ?
                            "Получая доступ к этим Условиям, Пользователь / Заказчик понимает и соглашается с тем, что любое использование Сайта и его содержимого для целей, отличных от разрешенных в соответствии с Условиями / Контрактом, прямо запрещено."
                            :
                            "By accessing these Terms and Conditions the User / Customer understands and accepts that any use of the Site and its content for purposes other than those permitted under the Terms and Conditions / Contract is expressly prohibited."
                        }
                    </div>
                    <div className="font-bold">
                        {   
                            lang == "ro" ? 
                            "Confidențialitate. Prelucrarea datelor cu caracter personal"
                            :
                            lang == "ru" ?
                            "Конфиденциальность. Обработка личных данных"
                            :
                            "Confidentiality. Processing of personal data"
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "”Elisei & Co” se va asigura că datele Utilizatorilor/Clienților furnizate prin navigarea pe Site, prin plasarea Comenzii și executarea Contractului sunt păstrate confidențiale atât de angajații proprii cât și de partenerii comerciali și împuterniciți."
                            :
                            lang == "ru" ?
                            "«Elisei & Co» гарантирует, что данные Пользователей / Клиентов, предоставленные при просмотре Сайта, размещении Заказа и выполнении Контракта, сохраняются в конфиденциальности как ее собственными сотрудниками, так и ее коммерческими и уполномоченными партнерами."
                            :
                            "”Elisei & Co” will ensure that the data of Users / Customers provided by browsing the Site, by placing the Order and executing the Contract are kept confidential both by its own employees and by its commercial and authorized partners."
                        }
                    </div>
                    <div>
                        {   
                            lang == "ro" ? 
                            "”Elisei & Co” prelucrează datele cu caracter personal oferite de Utilizatori/Clienți în conformitate cu prevederile legislației din R. Moldova, în vigoare."
                            :
                            lang == "ru" ?
                            "«Elisei & Co» обрабатывает персональные данные, предоставленные Пользователями / Клиентами, в соответствии с положениями действующего законодательства Республики Молдова."
                            :
                            "”Elisei & Co” processes the personal data provided by Users / Customers in accordance with the provisions of the legislation of the Republic of Moldova, in force."
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