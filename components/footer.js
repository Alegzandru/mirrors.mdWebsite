import Image from "next/image"
import Link from "next/link"
import { isRoDomain } from "../utils/general"
import {categories} from "../constants/benefits"

export default function Footer (props) {

  const roDomain = isRoDomain()

    return (
        <div className="bg-ui-black pt-44px mdFooter:pt-88px px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu">
            <div className="flex flex-row items-center mdFooter:items-start justify-between">
                <div className="hidden mdFooter:block">
                    <Image
                        src="/branding/milloryFooterLogo.png"
                        width={232}
                        height={66}
                        alt="Logo Millory"
                    />
                </div>
                <div className="mdFooter:hidden">
                    <img
                        src="/branding/milloryLogoLightMobile.png"
                        className="h-14 w-14 mdFooter:w-8 mdFooter:h-8"
                        height={56}
                        width={56}
                        alt="Logo Millory"
                    />
                </div>
                <div className="text-type-grey hidden mdFooter:block">
                    <div className="text-ui-white font-bold text-sm-h4">
                        {
                            props.lang == "ro" ?
                            "Catalog"
                            :
                            props.lang == "ru" ?
                            "Каталог"
                            :
                            "Catalog"
                        }
                    </div>
                    <ul className="text-lg-14 mt-8">
                        {
                            categories.map((category, index) => 
                                <Link 
                                    href={
                                      props.lang == "ro" ? 
                                      `/${category.slug}` : 
                                      props.lang == "ru" ?
                                      `/ru/${category.slug}`
                                      :
                                      `/en/${category.slug}`
                                    }
                                    key={index}
                                >
                                    <a>
                                        <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                            {
                                                props.lang == "ro" ?
                                                category.nameRo
                                                :
                                                props.lang == "ru" ?
                                                category.nameRu
                                                :
                                                category.nameEn
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
                            props.lang == "ru" ?
                            "Меню"
                            :
                            "Menu"
                        }
                    </div>

                    <ul className="text-lg-14 mt-8">
                        <Link href={
                          props.lang == "ro" ? 
                          "/" 
                          : 
                          props.lang == "ru" ?
                          "/ru"
                          :
                          "/en"
                        }>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {
                                        props.lang == "ro" ?
                                        "Principală"
                                        :
                                        props.lang == "ru" ?
                                        "Главная"
                                        :
                                        "Homepage"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/contacte" 
                          : 
                          props.lang == "ru" ?
                          "/ru/contacte"
                          :
                          "/en/contacte"
                        }>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Contacte"
                                        :
                                        props.lang == "ru" ?
                                        "Контакты"
                                        :
                                        "Contacts"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/galerie" : 
                          props.lang == "ru" ?
                          "/ru/galerie"
                          :
                          "/en/galerie"
                        }>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {
                                        props.lang == "ro" ?
                                        "Galerie"
                                        :
                                        props.lang == "ru" ?
                                        "Галерея"
                                        :
                                        "Gallery"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/intrebari-frecvente" 
                          : 
                          props.lang == "ru" ?
                          "/ru/intrebari-frecvente"
                          :
                          "/en/intrebari-frecvente"
                        }>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Întrebări frecvente"
                                        :
                                        props.lang == "ru" ?
                                        "Частые вопросы"
                                        :
                                        "FAQ"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/termeni" 
                          : 
                          props.lang == "ru" ?
                          "/ru/termeni"
                          :
                          "/en/termeni"
                        }>
                            <a>
                                <li className="mb-4 hover:text-ui-darkGrey hover:underline transition duration-300">
                                    {   
                                        props.lang == "ro" ?
                                        "Termeni și condiții"
                                        :
                                        props.lang == "ru" ? 
                                        "Условия"
                                        :
                                        "Terms and conditions"
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
                            props.lang == "ru" ?
                            "Контакты"
                            :
                            "Contacts"
                        }
                    </div>
                    
                    <ul className="text-lg-14 mt-8">
                        <a href={roDomain ? "tel:+40754599101" : "tel:+37369482034"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {roDomain ? '+40 754 599 101' : '+373 69 482 034'}
                            </li>
                        </a>
                        <a href={roDomain ? "https://goo.gl/maps/7SgX9wr3mHc73KCH8" : "https://goo.gl/maps/Cr1ju6WohV8NYeYf6"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {   
                                    roDomain ?
                                      props.lang == "ro" ?
                                      "Iași"
                                      :
                                      props.lang == "ru" ?
                                      "Яссы"
                                      :
                                      "Iași"
                                    :
                                      props.lang == "ro" ?
                                      "str. Ismail 98"
                                      :
                                      props.lang == "ru" ?
                                      "ул. Ismail 98"
                                      :
                                      "Ismail 98 street"
                                }
                            </li>
                        </a>
                        <a href={roDomain ? "mailto:millory.ro@gmail.com" : "mailto:spmirrors@gmail.com"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center hover:text-ui-darkGrey hover:underline transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                {roDomain ? 'millory.ro@gmail.com' : 'spmirrors@gmail.com'}
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="flex flex-row items-start justify-between w-118px">
                    <a 
                        href="https://m.facebook.com/millory.ro/"
                        target="blank"
                    >
                        <Image
                            src="/branding/facebookWhite.svg"
                            width={24}
                            height={24}
                            alt="Facebook logo"
                        />
                    </a>
                    <a
                        href="https://instagram.com/millory.ro?igshid=YmMyMTA2M2Y="
                        target="blank"
                    >
                        <Image
                            src="/branding/instagramWhite.svg"
                            width={24}
                            height={24}
                            alt="Instagram logo"
                        />
                    </a>
                    <a
                        href="https://www.tiktok.com/@millory.ro?lang=ro-RO"
                        target="blank"
                    >
                        <Image
                            src="/branding/tiktokFooter.svg"
                            height={24}
                            width={24}
                            alt="TikTok logo"
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
                            props.lang == "ru" ?
                            "Каталог"
                            :
                            "Catalog"
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
                                                category.nameRo
                                                :
                                                props.lang == "ru" ?
                                                category.nameRu
                                                :
                                                category.nameEn
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
                            props.lang == "ru" ?
                            "Меню"
                            :
                            "Menu"
                        }
                    </div>

                    <ul className="text-lg-14 mt-8">
                        <Link href={
                          props.lang == "ro" ? 
                          "/" 
                          : 
                          props.lang == "ru" ?
                          "/ru"
                          :
                          "/en"
                        }>
                            <a>
                                <li className="mb-4">
                                    {
                                        props.lang == "ro" ?
                                        "Principală"
                                        :
                                        props.lang == "ru" ?
                                        "Главная"
                                        :
                                        "Homepage"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/contacte" 
                          : 
                          props.lang == "ru" ?
                          "/ru/contacte"
                          :
                          "/en/contacte"
                        }>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Contacte"
                                        :
                                        props.lang == "ru" ?
                                        "Контакты"
                                        :
                                        "Contacts"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/galerie" 
                          : 
                          props.lang == "ru" ?
                          "/ru/galerie"
                          :
                          "/en/galerie"
                        }>
                            <a>
                                <li className="mb-4">
                                    {
                                        props.lang == "ro" ?
                                        "Galerie"
                                        :
                                        props.lang == "ru" ?
                                        "Галерея"
                                        :
                                        "Gallery"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/intrebari-frecvente" 
                          : 
                          props.lang == "ru" ?
                          "/ru/intrebari-frecvente"
                          :
                          "/en/intrebari-frecvente"
                        }>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Întrebări frecvente"
                                        :
                                        props.lang == "ru" ?
                                        "Частые вопросы"
                                        :
                                        "FAQ"
                                    }
                                </li>
                            </a>
                        </Link>
                        <Link href={
                          props.lang == "ro" ? 
                          "/termeni" : 
                          props.lang == "ru" ?
                          "/ru/termeni"
                          :
                          "/en/termeni"
                        }>
                            <a>
                                <li className="mb-4">
                                    {   
                                        props.lang == "ro" ?
                                        "Termeni și condiții"
                                        :
                                        props.lang == "ru" ?
                                        "Условия"
                                        :
                                        "Terms and conditions"
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
                            props.lang == "ru" ?
                            "Контакты"
                            :
                            "Contacts"
                        }
                    </div>
                    
                    <ul className="text-lg-14 mt-8">
                        <a href={roDomain ? "tel:+40754599101" : "tel:+37369482034"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {roDomain ? '+40 754 599 101' : '+373 69 482 034'}
                            </li>
                        </a>
                        <a href={roDomain ? "https://goo.gl/maps/7SgX9wr3mHc73KCH8" : "https://goo.gl/maps/Cr1ju6WohV8NYeYf6"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {   
                                  roDomain ?
                                    props.lang == "ro" ?
                                    "Iași"
                                    :
                                    props.lang == "ru" ?
                                    "Яссы"
                                    :
                                    "Iași"
                                  :
                                    props.lang == "ro" ?
                                    "str. Ismail 98"
                                    :
                                    props.lang == "ru" ?
                                    "ул. Ismail 98"
                                    :
                                    "Ismail 98 street"
                                }
                            </li>
                        </a>
                        <a href={roDomain ? "mailto:millory.ro@gmail.com" : "mailto:spmirrors@gmail.com"} target="blank">
                            <li className="mb-4 flex flex-row justify-start items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                {roDomain ? 'millory.ro@gmail.com' : 'spmirrors@gmail.com'}
                            </li>
                        </a>
                    </ul>
                </div>
            </div>

            <div className="h-px w-full bg-type-grey mb-4 mt-4"></div>

            <div className="pb-4 mx-auto text-center text-lg-12 text-type-grey">
                {   
                    props.lang == "ro" ?
                    `© 2022 ${roDomain ? 'MIRRORS & GLASS SRL.' : 'Elisei & Compani SRL.'} Toate drepturile sunt rezervate.`
                    :
                    props.lang == "ru" ?
                    `© 2022 ${roDomain ? 'MIRRORS & GLASS SRL.' : 'Elisei & Compani SRL.'} Все права защищены.`
                    :
                    `© 2022 ${roDomain ? 'MIRRORS & GLASS SRL.' : 'Elisei & Compani SRL.'} All rights reserved.`
                }
            </div>

            <a 
                href="https://www.lira.md/?utm_source=refferal&utm_medium=footer&utm_campaign=onemillory.ro"
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
                            width={14}
                            height={14}
                            alt="Logo Lira Digital"
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