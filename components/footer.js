import Image from "next/image"
import Link from "next/link"
const categories = [
    {
        name : "Oglinzi",
        nameru: "Зеркала",
        slug: "oglinzi"
    },
    {
        name : "Dulapuri",
        nameru: "Шкафы",
        slug: "dulapuri"
    },
    {
        name : "Mese pentru Make Up",
        nameru: "Гримёрные",
        slug: "mesemakeup"
    },
    {
        name : "Text Acrilic",
        nameru: "Акриловый Текст",
        slug: "textacrilic"
    }
]

export default function Footer (props) {

    async function getCategories() {
        const categoriesResponse = await fetch(`${API_URL}/categories`)
        const categories = await categoriesResponse.json()
        setCategories(categories)
    }

    return (
        <div className="bg-ui-black pt-44px mdFooter:pt-88px px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu">
            <div className="flex flex-row items-center mdFooter:items-start justify-between">
                <div className="hidden mdFooter:block">
                    <Image
                        src="/branding/footerLogo.svg"
                        width={232}
                        height={66}
                    />
                </div>
                <div className="mdFooter:hidden">
                    <img
                        src="/branding/smallLogo2.svg"
                        className="h-14 w-14 mdFooter:w-8 mdFooter:h-8"
                    />
                </div>
                <div className="text-type-grey hidden mdFooter:block">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {
                            props.lang == "ro" ?
                            "Catalog"
                            :
                            "Каталог"
                        }
                    </div>
                    <ul className="text-lg-14 mt-8">
                        {
                            categories.map((category, index) => 
                                <Link 
                                    href={props.lang == "ro" ? `/${category.slug}` : `/ru/${category.slug}`}
                                    key={index}
                                >
                                    <a>
                                        <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                            {
                                                props.lang == "ro" ?
                                                category.name
                                                :
                                                category.nameru
                                            }
                                        </li>
                                    </a>
                                </Link>
                            )
                        }
                    </ul>
                </div>
                <div className="text-type-grey hidden mdFooter:block">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {
                            props.lang == "ro" ?
                            "Meniu"
                            :
                            "Меню"
                        }
                    </div>

                    <ul className="text-lg-14 mt-8">
                        <Link href={props.lang == "ro" ? "/" : "/ru"}>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {
                                        props.lang == "ro" ?
                                        "Principală"
                                        :
                                        "Главная"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/contacte" : "/ru/contacte"}>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Contacte"
                                        :
                                        "Контакты"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/galerie" : "/ru/galerie"}>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {
                                        props.lang == "ro" ?
                                        "Galerie"
                                        :
                                        "Галерея"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/intrebari-frecvente" : "/ru/intrebari-frecvente"}>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Întrebări frecvente"
                                        :
                                        "Частые вопросы"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/termeni" : "/ru/termeni"}>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Termeni și condiții"
                                        :
                                        "Условия"
                                    }
                                </li>
                            </a>
                        </Link>
                    </ul>
                </div>
                <div className="text-type-grey hidden mdFooter:block">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {   
                            props.lang == "ro" ?
                            "Contacte"
                            :
                            "Контакты"
                        }
                    </div>
                    
                    <ul className="text-lg-14 mt-8">
                        <a href="tel:37369482034" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +373 69 482 034
                            </li>
                        </a>
                        <a href="https://goo.gl/maps/Cr1ju6WohV8NYeYf6" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {   
                                    props.lang == "ro" ?
                                    "str. Ismail 98"
                                    :
                                    "ул. Ismail 98"
                                }
                            </li>
                        </a>
                        <a href="mailto:spmirrors@gmail.com" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>

                                spmirrors@gmail.com
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="flex flex-row items-start justify-between w-80px">
                    <a 
                        href="https://www.facebook.com/mirrorsmd"
                        target="blank"
                    >
                        <Image
                            src="/branding/facebookWhite.svg"
                            width={24}
                            height={24}
                        />
                    </a>
                    <a
                        href="https://www.instagram.com/mirrorsmd/"
                        target="blank"
                    >
                        <Image
                            src="/branding/instagramWhite.svg"
                            width={24}
                            height={24}
                        />
                    </a>
                </div>
            </div>

            <div className="flex flex-col items-start justify-start">
                <div className="text-type-grey mdFooter:hidden mt-12">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {
                            props.lang == "ro" ?
                            "Catalog"
                            :
                            "Каталог"
                        }
                    </div>
                    <ul className="text-lg-14 mt-8">
                        {
                            categories.map((category, index) => 
                                <Link 
                                    href={`/${category.slug}`}
                                    key={index}
                                >
                                    <a>
                                        <li className="mb-4">
                                            {
                                                props.lang == "ro" ?
                                                category.name
                                                :
                                                category.nameru
                                            }
                                        </li>
                                    </a>
                                </Link>
                            )
                        }
                    </ul>
                </div>
                <div className="text-type-grey mdFooter:hidden mt-12">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {
                            props.lang == "ro" ?
                            "Meniu"
                            :
                            "Меню"
                        }
                    </div>

                    <ul className="text-lg-14 mt-8">
                        <Link href={props.lang == "ro" ? "/" : "/ru"}>
                            <a>
                                <li className="mb-4">
                                    {
                                        props.lang == "ro" ?
                                        "Principală"
                                        :
                                        "Главная"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/contacte" : "/ru/contacte"}>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Contacte"
                                        :
                                        "Контакты"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/galerie" : "/ru/galerie"}>
                            <a>
                                <li className="mb-4">
                                    {
                                        props.lang == "ro" ?
                                        "Galerie"
                                        :
                                        "Галерея"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/intrebari-frecvente" : "/ru/intrebari-frecvente"}>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Întrebări frecvente"
                                        :
                                        "Частые вопросы"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={props.lang == "ro" ? "/termeni" : "/ru/termeni"}>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Termeni și condiții"
                                        :
                                        "Условия"
                                    }
                                </li>
                            </a>
                        </Link>
                    </ul>
                </div>
                <div className="text-type-grey mdFooter:hidden mt-12">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {   
                            props.lang == "ro" ?
                            "Contacte"
                            :
                            "Контакты"
                        }
                    </div>
                    
                    <ul className="text-lg-14 mt-8">
                        <a href="tel:37369482034" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +373 69 482 034
                            </li>
                        </a>
                        <a href="https://goo.gl/maps/Cr1ju6WohV8NYeYf6" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {   
                                    props.lang == "ro" ?
                                    "str. Ismail 98"
                                    :
                                    "ул. Ismail 98"
                                }
                            </li>
                        </a>
                        <a href="mailto:spmirrors@gmail.com" target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>

                                spmirrors@gmail.com
                            </li>
                        </a>
                    </ul>
                </div>
            </div>

            {/* <div className="w-full h-320px mdFooter:h-560px mt-16 mb-8">
                <iframe src="https://yandex.com/map-widget/v1/?um=constructor%3A79dbbe95bd2531da704341e99cfe83c018aa307df04f33dd9c1332b1fa43ef0f&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
            </div> */}

            <div className="h-px w-full bg-type-grey mb-4 mt-4"></div>

            <div className="pb-4 mx-auto text-center text-lg-12 text-type-grey">
                {   
                    props.lang == "ro" ?
                    "© 2021 Elisei & Compani SRL. Toate drepturile sunt rezervate."
                    :
                    "© 2021 Elisei & Compani SRL. Все права защищены."
                }
            </div>

            <a 
                href="https://lira.md/"
                target="blank"
                style={{
                    textDecoration: "none",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent : "flex-start"
                }}
                className="w-full flex flex-col items-center justify-start"
            >
                <div className="flex flex-col items-center justify-start">
                    <div className="w-full flex flex-row items-center justify-center text-lg-17 text-ui-grey mt-4 mb-1">
                        <div>
                            Crafted by
                        </div>
                        <img 
                            src="/branding/lira.svg"
                            className="w-14px h-14px mr-1 ml-2"
                            alt=""
                        ></img>
                        <div className="font-medium">
                            Lira
                        </div>
                    </div>
                    <div className="liraLine"/>
                </div>
            </a>
        </div>
    )
}