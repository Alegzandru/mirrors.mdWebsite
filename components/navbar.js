import 'react-circular-progressbar/dist/styles.css';

import { Turn as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { animated, useSpring } from 'react-spring';

import { getPrice } from '../utils/general';
import { API_URL } from '../utils/urls';
import { CartContext, DeviceTypeContext } from './context';
import ChangingProgressProvider from './progress/ChangingProgressProvider';

var qs = require('qs');
const categories = [
  {
      name : "Oglinzi",
      nameru: "Зеркала",
      nameen: "Mirrors",
      slug: "oglinzi"
  },
  {
      name : "Dulapuri",
      nameru: "Шкафы",
      nameen: "Wardrobe",
      slug: "dulapuri"
  },
  {
      name : "Mese pentru Make Up",
      nameru: "Гримёрные",
      nameen: "Make-up tables",
      slug: "mesemakeup"
  },
  {
      name : "Text Acrilic",
      nameru: "Акриловый Текст",
      nameen: "Acrylic text",
      slug: "textacrilic"
  }
]


export function Navbar (props) {

    const [scrollUp, setScrollUp] = useState(1)
    const [top, setTop] = useState(1)

    const [principala, setPrincipala] = useState(0)
    const [galerie, setGalerie] = useState(0)
    const [faq, setFaq] = useState(0)
    const [contacte, setContacte] = useState(0)
    const [open, setOpen] = useState(0)

    const [search, setSearch] = useState("")
    const [searchProducts, setSearchProducts] = useState([])
    const [loading, setLoading] = useState(0)
    const percentage = 66 
    const [transparent, setTransparent] = useState(0)

    const [catalogOpen, setCatalogOpen] = useState(0)
    const [mobileSearchOpen, setMobileSearchOpen] = useState(0)
    const [mobileCatalogOpen , setMobileCatalogOpen] = useState(0)
    const [mobileLangOpen, setMobileLangOpen] = useState(0)

    const {cart, setCart} = useContext(CartContext)
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    const router = useRouter()
    const [path, setPath] = useState(router.pathname)

    var lastScrollTop = 0;

    const styles = useSpring({ 
        height: deviceType != "desktop" ? 64 : scrollUp ? 144 : 56
    })

    const styles2 = useSpring({ 
        height: scrollUp ? 88 : 0
    })

    const styles3 = useSpring({ 
        height: top ? 32 : 0
    })
    
    async function getSearchProducts() {
        setLoading(1)
        const productsResponse = await fetch(`${API_URL}/products?_where[name_contains]=${search}&[_limit]=5`)
        const products = await productsResponse.json().then(setLoading(0))
        setSearchProducts(products)
    }

    useEffect(()=>{
        if(props.category != undefined){
            setPath(router.pathname.replace("[category]", props.category))
        }
        if(props.slug != undefined){
            setPath(router.pathname.replace("[slug]", props.slug))
        }

        if (typeof window !== "undefined") {

            function handleScroll(){
                var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
                if (st > lastScrollTop){
                    setScrollUp(0)
                } else {
                    setScrollUp(1)
                }
                
                lastScrollTop = st <= 0 ? 0 : st;
            }

            const scrollPosition = () => {
                setTransparent(window.scrollY == 0 && ( router.pathname=="/" || router.pathname=="/ru" || router.pathname=="/en" ))
                setTop(window.scrollY == 0)
            }

            window.addEventListener("scroll", handleScroll, false);
            window.addEventListener("scroll", scrollPosition);

            handleScroll()
            scrollPosition()

            switch(router.pathname){
                case "/" :
                    setPrincipala(1)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/galerie" :
                    setPrincipala(0)
                    setGalerie(1)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/intrebari-frecvente" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(1)
                    setContacte(0)
                break;
                case "/contacte" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(1)
                break;
                case "/ru" :
                    setPrincipala(1)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/ru/galerie" :
                    setPrincipala(0)
                    setGalerie(1)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/ru/intrebari-frecvente" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(1)
                    setContacte(0)
                break;
                case "/ru/contacte" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(1)
                break;
                case "/en" :
                    setPrincipala(1)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/en/galerie" :
                    setPrincipala(0)
                    setGalerie(1)
                    setFaq(0)
                    setContacte(0)
                break;
                case "/en/intrebari-frecvente" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(1)
                    setContacte(0)
                break;
                case "/en/contacte" :
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(1)
                break;
                default : 
                    setPrincipala(0)
                    setGalerie(0)
                    setFaq(0)
                    setContacte(0)
                break;
            }

            return () => {
                window.removeEventListener("scroll", handleScroll)
                window.removeEventListener("scroll", scrollPosition)
            }
        }
    }, [])

    useEffect(() => {
        getSearchProducts()
    },[search])

    return (
        <animated.div 
            className="z-40 w-full lg:-mb-36 font-Ubuntu"
            style={styles}
        >
            <animated.div 
                className={`${mobileSearchOpen ? "fixed block" : "hidden"} w-screen bg-ui-white z-40 px-18px md:px-16 pt-52px md:pt-72px pb-4 md:pb-10`}
            >
                <div className="w-full flex flex-row justify-between items-center mb-3 md:mb-4">
                    <input
                        type="text"
                        className="outline-none text-sm-h4 md:text-lg-h2 font-medium text-type-dark border-0 w-full focus:outline-none cursor-pointer"
                        placeholder={
                          props.lang == "ro" ? 
                          "Căutare în catalog" 
                          : 
                          props.lang == "ru" ?
                          "Поиск по каталогу"
                          :
                          "Search in catalog"
                        }
                        onChange={event => setSearch(event.target.value)}
                    />
                    <svg onClick={() => setMobileSearchOpen(0)} xmlns="http://www.w3.org/2000/svg" className="h-40px w-40px text-type-grey ml-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="w-full h-0.5 bg-accent-accent mb-6"/>

                {search != "" && 
                    <div className={`w-full bg-ui-white mt-3 rounded-b-lg border-l-2 border-r-2 border-b-2 border-t-0 ${search != "" ? "border-ui-darkGrey" : ""}`}>
                        {
                        loading ? 
                            <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-center items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}> 
                                <div className="h-12 w-12">
                                <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                                    {percentage => (
                                            <CircularProgressbar
                                                value={percentage}
                                                styles={buildStyles({
                                                    pathColor : "#16B45A",
                                                    pathTransitionDuration: 0.1
                                                })}
                                                strokeWidth={5}
                                            />
                                    )}
                                    </ChangingProgressProvider>
                                </div>
                            </div>
                        :
                        searchProducts.length == 0 ? 
                            <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-start items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                {
                                    props.lang == "ro" ?
                                    "Nu a fost găsit niciun produs"
                                    :
                                    props.lang == "ru" ?
                                    "Товаров не найдено"
                                    :
                                    "No items found"
                                }
                            </div>
                        :
                        searchProducts.map((product, index) => 
                            <div key={index}>
                                <Link href={
                                  props.lang == "ro" ? 
                                  `/produse/${product.slug}` : 
                                  props.lang == "ru" ?
                                  `/ru/produse/${product.slug}`
                                  :
                                  `/en/produse/${product.slug}`
                                }>
                                    <a>   
                                        <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-start items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                            <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                                                <Image
                                                    src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="text-type-grey flex flex-col justify-between h-full ml-4">
                                                <div className="text-lg-17">
                                                    {
                                                        props.lang == "ro" ?
                                                        product.name
                                                        :
                                                        props.lang == "ru" ?
                                                        product.nameru
                                                        :
                                                        product.nameen
                                                    }
                                                </div>
                                                <div className="text-lg-14">
                                                    {
                                                        props.lang == "ro" ?
                                                        "de la "
                                                        :
                                                        props.lang == "ru" ?
                                                        "от "
                                                        :
                                                        "from "
                                                    }
                                                    {Math.trunc( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) ) } 
                                                    {
                                                        props.lang == "ro" ?
                                                        " lei"
                                                        :
                                                        props.lang == "ru" ?
                                                        " лей"
                                                        :
                                                        " lei"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                }
            </animated.div>

            <animated.div
                className={`h-8 ${transparent ? "bg-transparent" : "bg-ui-white" } hidden lg:flex w-full flex-row justify-between items-center lg:px-container-lg xl:px-container-xl transition duration-300 overflow-hidden text-lg-14`}
                style={styles3}
            >
                <div className="flex flex-row justify-start items-center">
                    <div className="ml-2 mr-6">
                        <a
                            href="https://www.instagram.com/mirrorsmd/"
                            target="blank"
                        >
                            <Image
                                src="/branding/instagram.svg"
                                height={16}
                                width={16}
                                alt="Instagram logo"
                            />
                        </a>
                    </div>
                    <div className="ml-2 mr-6">
                        <a
                            href="https://www.facebook.com/mirrorsmd"
                            target="blank"
                        >
                            <Image
                                src="/branding/facebook.svg"
                                height={16}
                                width={16}
                                alt="Facebook logo"
                            />
                        </a>
                    </div>
                    <div className="">
                        <a
                            href="https://www.tiktok.com/@mirrorsmd?lang=ru-RU&is_copy_url=1&is_from_webapp=v1"
                            target="blank"
                        >
                            <Image
                                src="/branding/tiktokLogo.svg"
                                height={16}
                                width={16}
                                alt="TikTok logo"
                            />
                        </a>
                    </div>
                </div>

                <div className="flex flex-row justify-end items-center">
                    <div className="text-type-grey mr-4">
                        {
                            props.lang == "ro" ?
                            "Ln−Vn: 9:00 − 18:00"
                            :
                            props.lang == "ru" ?
                            "Пн-Пт: 9:00 - 18:00"
                            :
                            "Mn-Fr: 9:00 - 18:00"
                        }
                    </div>

                    <div className="text-type-grey mr-4">
                        {
                            props.lang == "ro" ?
                            "Sâm: 9:00 − 14:00"
                            :
                            props.lang == "ru" ?
                            "Суб: 9:00 - 14:00"
                            :
                            "Sat: 9:00 - 14:00"
                        }
                    </div>

                    <div className="text-type-grey mr-4">
                        {
                            props.lang == "ro" ?
                            "Dum: zi liberă"
                            :
                            props.lang == "ru" ?
                            "Вс: выходной"
                            :
                            "Sun: day off"
                        }
                    </div>

                    <a href="tel:37369482034">
                        <div className="h-8 w-132px rounded hover:bg-accent-transparent text-accent-accent flex flex-row justify-between items-center px-1 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +373 69 482 034
                        </div>
                    </a>
                </div>
            </animated.div>
            {/* {scrollUp ? */}
                    <animated.div 
                        className={`h-88px ${transparent ? "bg-transparent" : "bg-ui-white" } hidden lg:block w-full transition duration-300 lg:overflow-hidden`}
                        style={styles2}
                    >
                        <div className="lg:mx-container-lg xl:mx-container-xl h-full">
                            <div className="h-full w-full flex flex-row justify-between items-start font-14 pt-6">
                                <div className={`w-365px ${transparent ? "block" : "hidden"}`}>
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
                                            <Image
                                                src="/branding/logo2.svg"
                                                height={34}
                                                width={136}
                                                alt="Logo Mirrors MD"
                                            />
                                        </a>
                                    </Link>
                                </div>

                                <div className={`w-365px ${transparent ? "hidden" : "block"}`}>
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
                                            <Image
                                                src="/branding/logo2Black.svg"
                                                height={34}
                                                width={136}
                                                alt="Logo Mirrors MD"
                                            />
                                        </a>
                                    </Link>
                                </div>

                                <div className={`flex flex-col items-end ${transparent ? "text-ui-blueishGrey" : "text-type-grey"} ${scrollUp ? "flex" : "hidden"} focus-within:text-type-dark absolute mx-auto left-search-left`}>
                                    <input 
                                        className={`h-10 w-504px ${transparent ? "bg-ui-dark" : "bg-ui-grey"} ${search != "" ? "rounded-t-lg border-ui-darkGrey" : "rounded-lg focus:border-ui-blueishGrey"} px-4 flex-row items-center focus:bg-ui-white border-2 border-transparent transition duration-300 outline-none cursor-pointer`}
                                        placeholder={
                                          props.lang == "ro" ? 
                                          "Căutare în catalog" 
                                          : 
                                          props.lang == "ru" ?
                                          "Поиск по каталогу"
                                          :
                                          "Search in catalog"
                                        }
                                        onChange={event => setSearch(event.target.value)}
                                    />

                                    <svg onClick={() => setMobileSearchOpen(0)} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 -mt-7 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>

                                    {search != "" &&
                                        <div className={`w-full bg-ui-white mt-3 rounded-b-lg border-l-2 border-r-2 border-b-2 border-t-0 ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                            {
                                            loading ? 
                                                <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-center items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}> 
                                                    <div className="h-12 w-12">
                                                    <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                                                        {percentage => (
                                                                <CircularProgressbar
                                                                    value={percentage}
                                                                    styles={buildStyles({
                                                                        pathColor : "#16B45A",
                                                                        pathTransitionDuration: 0.1
                                                                    })}
                                                                    strokeWidth={5}
                                                                />
                                                        )}
                                                        </ChangingProgressProvider>
                                                    </div>
                                                </div>
                                            :
                                            searchProducts.length == 0 ? 
                                                <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-start items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                                    {
                                                        props.lang == "ro" ?
                                                        "Nu a fost găsit niciun produs"
                                                        :
                                                        props.lang == "ru" ?
                                                        "Товаров не найдено"
                                                        :
                                                        "No items found"
                                                    }
                                                </div>
                                            :
                                            searchProducts.map((product, index) =>
                                                <div key={index}>
                                                    <Link href={
                                                      props.lang == "ro" ? 
                                                      `/produse/${product.slug}` 
                                                      : 
                                                      props.lang == "ru" ?
                                                      `/ru/produse/${product.slug}`
                                                      :
                                                      `/en/produse/${product.slug}`
                                                    }>
                                                        <a>  
                                                            <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-start items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                                                <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                                                                    <Image
                                                                        src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.small.url}
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        alt={product.name}
                                                                    />
                                                                </div>
                                                                <div className="text-type-grey flex flex-col justify-between h-full ml-4">
                                                                    <div className="text-lg-17">
                                                                        {
                                                                            props.lang == "ro" ?
                                                                            product.name
                                                                            :
                                                                            props.lang == "ru" ?
                                                                            product.nameru
                                                                            :
                                                                            product.nameen
                                                                        }
                                                                    </div>
                                                                    <div className="text-lg-14">
                                                                        {
                                                                            props.lang == "ro" ?
                                                                            "de la "
                                                                            :
                                                                            props.lang == "ru" ?
                                                                            "от "
                                                                            :
                                                                            "from "
                                                                        }
                                                                        {Math.trunc( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) ) } 
                                                                        {
                                                                            props.lang == "ro" ?
                                                                            " lei"
                                                                            :
                                                                            props.lang == "ru" ?
                                                                            " лей"
                                                                            :
                                                                            " lei"
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Link> 
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>

                                <div className="w-365px flex flex-row justify-end items-center">

                                    <div className={`${scrollUp ? "block" : "hidden"} ${top ? "top-16" : "top-10"} rounded overflow-hidden w-98px group cursor-pointer hover:shadow-md absolute z-50`}>
                                        <div className={`h-8 ${transparent ? "bg-ui-dark text-ui-white" : "bg-ui-grey text-type-dark"} flex flex-row justify-between items-center px-2 text-lg-14 z-20 relative group-hover:bg-ui-grey group-hover:text-type-dark transition-all duration-300`}>
                                            <div>
                                                {
                                                    props.lang == "ro" ?
                                                    "Română"
                                                    :
                                                    props.lang == "ru" ?
                                                    "Русский"
                                                    :
                                                    "English"
                                                }
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        </div>
                                        <Link href={
                                          props.lang == "ro" ? 
                                          `/ru${path}` 
                                          :
                                          path == "/ru" ?
                                          "/en"
                                          :
                                          props.lang == "ru" ?
                                          `/en${path.slice(3)}`
                                          :
                                          path == "/en" ?
                                          "/"
                                          :
                                          path.slice(3)
                                        }>
                                            <a>
                                                <div className="h-8 bg-ui-white text-type-grey px-2 text-lg-14 py-1 flex flex-row justify-start items-center transition-all duration-300 -mt-8 group-hover:mt-0 z-10 relative">
                                                    {
                                                        props.lang == "ro" ?
                                                        "Русский"
                                                        :
                                                        props.lang == "ru" ?
                                                        "English"
                                                        :
                                                        "Română"
                                                    }
                                                </div>
                                            </a>
                                        </Link>
                                        <Link href={
                                          props.lang == "ro" ? 
                                          `/en${path}` 
                                          :
                                          path == "/ru" ?
                                          "/"
                                          :
                                          props.lang == "ru" ? 
                                          path == "/en" ?
                                          "/ru"
                                          :
                                          path.slice(3)
                                          :
                                          `/ru${path.slice(3)}`
                                        }>
                                            <a>
                                                <div className="h-8 bg-ui-white text-type-grey px-2 text-lg-14 py-1 flex flex-row justify-start items-center transition-all duration-300 -mt-8 group-hover:mt-0 z-10 relative">
                                                    {
                                                        props.lang == "ro" ?
                                                        "English"
                                                        :
                                                        props.lang == "ru" ?
                                                        "Română"
                                                        :
                                                        "Русский"
                                                    }
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                {/* :
                ""
            } */}

            
            <div className={`h-56px hidden ${transparent ? "bg-transparent" : "bg-ui-grey hidden"} lg:block lg:overflow-hidden w-full transition duration-300 header-shadow`}>
                <div className="lg:mx-container-lg xl:mx-container-xl h-full">
                    <div className={`${transparent ? "text-ui-white" : "text-type-manatee"} font-14px font-medium h-56px w-full flex flex-row justify-between items-center`}>
                        <div className={`w-165px`}>
                            <div 
                                className={`absolute -mt-28px rounded-lg ${catalogOpen ? "bg-ui-white text-type-manatee" : ""} w-165px transition duration-300 overflow-hidden cursor-pointer`}
                                onMouseOver={ () => setCatalogOpen(1)}
                                onMouseLeave={ () => setCatalogOpen(0)}
                            >
                                <div className={`w-full flex flex-row justify-start items-center h-14 ${catalogOpen ? "text-type-dark" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <div>
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
                                </div>
                                <div className={`bg-ui-white py-2 ${catalogOpen ? "block" : "hidden"} transition duration-300`}>
                                    {
                                        categories.map((category, index) => 
                                        <div key={index}>
                                            <Link href={
                                              props.lang == "ro" ? 
                                              `/${category.slug}` 
                                              : 
                                              props.lang == "ru" ?
                                              `/ru/${category.slug}`
                                              :
                                              `/en/${category.slug}`
                                            }>
                                                <a>
                                                    <div className="p-4 text-type-manatee hover:text-type-dark hover:underline transition duration-300">
                                                        {
                                                            props.lang == "ro" ?
                                                            category.name
                                                            :
                                                            props.lang == "ru" ?
                                                            category.nameru
                                                            :
                                                            category.nameen
                                                        }
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={`w-524px flex flex-row justify-center items-center ${transparent ? "text-ui-grey" : "text-type-manatee"}`}>
                            <Link href={
                              props.lang == "ro" ? 
                              "/" 
                              : 
                              props.lang == "ru" ?
                              "/ru"
                              :
                              "/en"
                            }>
                                <a className={`${principala ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    {
                                        props.lang == "ro" ?
                                        "Principală"
                                        :
                                        props.lang == "ru" ?
                                        "Главная"
                                        :
                                        "Homepage"
                                    }
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
                                <a className={`${galerie ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    {
                                        props.lang == "ro" ?
                                        "Galerie"
                                        :
                                        props.lang == "ru" ?
                                        "Галерея"
                                        :
                                        "Gallery"
                                    }
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
                                <a className={`${faq ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    {
                                        props.lang == "ro" ?
                                        "Întrebări frecvente"
                                        :
                                        props.lang == "ru" ?
                                        "Частые вопросы"
                                        :
                                        "FAQ"
                                    }
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
                                <a className={`${contacte ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    {   
                                        props.lang == "ro" ?
                                        "Contacte"
                                        :
                                        props.lang == "ru" ?
                                        "Контакты"
                                        :
                                        "Contacts"
                                    }
                                </a>
                            </Link>
                        </div>

                        <div className="w-165px">
                            <Link href={
                              props.lang == "ro" ? 
                              "/cos" 
                              : 
                              props.lang == "ru" ?
                              "/ru/cos"
                              :
                              "/en/cos"
                            }>
                                <a className="w-full flex flex-row justify-end items-start">
                                    {   cart.length !=0 ?
                                        <div className="bg-accent-error w-4 h-4 rounded-full text-ui-darkGrey text-lg-12 flex flex-row justify-center items-center -mr-8 z-20">
                                            {cart.length}
                                        </div>
                                        :
                                        ""
                                    }
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-accent-transparent hover:text-accent-accent transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`block lg:hidden h-16 -mb-16 overflow-hidden ${transparent ? "bg-transparent" : "bg-ui-white"} header-shadow transition-all duration-300`}>
                <div className="h-full mx-container-md flex flex-row justify-between items-center">
                    <div className={`w-112px h-40px ${open ? "hidden" : transparent? "block" : "hidden"}`}>
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
                                <Image
                                    src="/branding/smallLogo2.svg"
                                    height={40}
                                    width={40}
                                    alt="Logo Mirrors MD"
                                />
                            </a>
                        </Link>
                    </div>

                    <div className={`w-112px h-40px ${open ? "block" : transparent? "hidden" : "block"}`}>
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
                                <Image
                                    src="/branding/smallLogoBlack.svg"
                                    height={40}
                                    width={40}
                                    alt="Logo Mirrors MD"
                                />
                            </a>
                        </Link>
                    </div>

                    <div 
                        className={`hidden md:flex h-10 flex-grow ${transparent ? "bg-ui-dark" : "bg-ui-grey"} rounded-lg px-4 flex-row justify-between items-center ${transparent ? "text-ui-blueishGrey" : "text-type-grey"} cursor-pointer`}
                        onClick={() => setMobileSearchOpen(1)}
                    >
                        <span>
                            {
                                props.lang == "ro" ?
                                "Căutare în catalog"
                                :
                                props.lang == "ru" ?
                                "Поиск по каталогу"
                                :
                                "Search in catalog"
                            }
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex flex-row justify-end h-auto items-center">
                        <div className="w-12 h-12 flex flex-row justify-center items-center">
                            <svg onClick={() => setMobileSearchOpen(1)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ui-black md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <Link href={
                          props.lang == "ro" ? 
                          "/cos" 
                          : 
                          props.lang == "ru" ?
                          "/ru/cos"
                          :
                          "/en/cos"
                        }>
                            <a className="flex flex-row items-center justify-center h-12 w-12">
                                {   cart.length !=0 ?
                                    <div className="bg-accent-error w-4 h-4 rounded-full text-ui-darkGrey text-lg-12 flex flex-row justify-center items-center -mr-8 z-20 -mt-2">
                                        {cart.length}
                                    </div>
                                    :
                                    ""
                                }
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-accent-transparent hover:text-accent-accent transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </a>
                        </Link>

                        <button>
                          <Hamburger toggled={open} toggle={setOpen} size={24} duration={0.4} color={`${open ? "#000000" : "#677077"}`} rounded/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`h-screen bg-ui-white ${open ? "block" : "hidden"} pt-16 `}>
                <Slide left cascade duration={300}>
                    <ul className="text-sm-p font-medium text-type-manatee">
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
                                <li className="w-full p-4">
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
                        
                        <li 
                            className={`transition duration-300 w-full p-4 flex flex-row justify-between items-center ${mobileCatalogOpen ? "bg-accent-transparent" : ""}`}
                            onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                        >
                            <div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${mobileCatalogOpen ? "hidden" : "block"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${mobileCatalogOpen ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </li>

                        <li className={`w-full ${mobileCatalogOpen ? "block" : "hidden"}`}>
                            {
                                categories.map((category, index) => 
                                <div key={index}>
                                    <Link href={
                                      props.lang == "ro" ? 
                                      `/${category.slug}` 
                                      :
                                      props.lang == "ru" ?
                                      `/ru/${category.slug}`
                                      :
                                      `/en/${category.slug}`
                                    }>
                                        <a>
                                            <div className="py-4 px-40px">
                                                {
                                                    props.lang == "ro" ?
                                                    category.name
                                                    :
                                                    props.lang == "ru" ?
                                                    category.nameru
                                                    :
                                                    category.nameen
                                                }
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                )
                            }
                        </li>

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
                                <li className="w-full p-4">
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
                                <li className="w-full p-4">
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
                          "/contacte" 
                          : 
                          props.lang == "ru" ?
                          "/ru/contacte"
                          :
                          "/en/contacte"
                        }>
                            <a>
                                <li className="w-full p-4">
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

                        <li 
                            className={`transition duration-300 w-full p-4 flex flex-row justify-between items-center ${mobileLangOpen ? "bg-accent-transparent" : ""}`}
                            onClick={() => setMobileLangOpen(!mobileLangOpen)}
                        >
                            <div>
                              {
                                  props.lang == "ro" ?
                                  "Română"
                                  :
                                  props.lang == "ru" ?
                                  "Русский"
                                  :
                                  "English"
                              }
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${mobileLangOpen ? "hidden" : "block"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${mobileLangOpen ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </li>

                        <Link href={
                          props.lang == "ro" ? 
                          `/ru${path}` 
                          :
                          path == "/ru" ?
                          "/en"
                          :
                          props.lang == "ru" ?
                          `/en${path.slice(3)}`
                          :
                          path == "/en" ?
                          "/"
                          :
                          path.slice(3)
                        }>
                            <a>
                                <li className={`w-full py-4 px-40px ${mobileLangOpen ? "block" : "hidden"}`}>
                                  {
                                      props.lang == "ro" ?
                                      "Русский"
                                      :
                                      props.lang == "ru" ?
                                      "English"
                                      :
                                      "Română"
                                  }
                                </li>
                            </a>
                        </Link>

                        <Link href={
                          props.lang == "ro" ? 
                          `/en${path}` 
                          :
                          path == "/ru" ?
                          "/"
                          :
                          props.lang == "ru" ? 
                          path == "/en" ?
                          "/ru"
                          :
                          path.slice(3)
                          :
                          `/ru${path.slice(3)}`
                        }>                            
                            <a>
                                <li className={`w-full py-4 px-40px ${mobileLangOpen ? "block" : "hidden"}`}>
                                    {
                                        props.lang == "ro" ?
                                        "English"
                                        :
                                        props.lang == "ru" ?
                                        "Română"
                                        :
                                        "Русский"
                                    }
                                </li>
                            </a>
                        </Link>
                    </ul>
                </Slide>
            </div>
        </animated.div>
    )
}