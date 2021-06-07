import Image from 'next/image'
import {useContext, useEffect, useState} from "react"
import { useRouter } from 'next/router'
import { WidthContext } from './context';
import Link from "next/link"
import { Turn as Hamburger } from 'hamburger-react'
import { Slide } from "react-awesome-reveal";
import {API_URL} from "../utils/urls"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Fade } from "react-awesome-reveal";
// import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./progress/ChangingProgressProvider"
import 'react-circular-progressbar/dist/styles.css';
var qs = require('qs');


export function Navbar (props) {

    const [scrollUp, setScrollUp] = useState(1)

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

    const router = useRouter()

    var lastScrollTop = 0;

    
    async function getSearchProducts() {
        setLoading(1)
        const query = qs.stringify({
            _where : [{name_contains : search}, {_limit : 5}]
        })
        const productsResponse = await fetch(`${API_URL}/products?_where[name_contains]=${search}&[_limit]=5`)
        // const productsResponse = await fetch(`${API_URL}/products?${query}`)
        const products = await productsResponse.json().then(setLoading(0))
        console.log(products)
        setSearchProducts(products)
    }

    useEffect(()=>{
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
                setTransparent(window.scrollY == 0 && router.pathname=="/")
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
        <div className="fixed z-50 w-full lg:-mb-36 font-Ubuntu">
            {scrollUp ?
                    <div className={`h-88px ${transparent ? "bg-transparent" : "bg-ui-white" } hidden lg:block lg:overflow-hidden w-full transition duration-300`}>
                        <div className="lg:mx-container-lg xl:mx-container-xl h-full">
                            <div className="h-full w-full flex flex-row justify-between items-start font-14 pt-6">
                                <div className="w-365px">
                                    <Link href="/">
                                        <a>
                                            <Image
                                                src="/branding/logo.svg"
                                                height={34}
                                                width={136}
                                            />
                                        </a>
                                    </Link>
                                </div>

                                <div className={`flex flex-col items-end ${transparent ? "text-ui-blueishGrey" : "text-type-grey"} focus-within:text-type-dark absolute left-search-left`}>
                                    <input 
                                        className={`h-10 w-504px ${transparent ? "bg-ui-dark" : "bg-ui-grey"} ${search != "" ? "rounded-t-lg border-ui-darkGrey" : "rounded-lg focus:border-ui-blueishGrey"} px-4 flex flex-row items-center focus:bg-ui-white border-2 border-transparent transition duration-300 outline-none`}
                                        placeholder="Căutare în catalog"
                                        onChange={event => setSearch(event.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 -mt-7 mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                            searchProducts.map((product) => 
                                                <div className={`h-72px border-b-0 border-t-2 border-l-0 border-r-0 flex flex-row justify-start items-center px-4 py-14px ${search != "" ? "border-ui-darkGrey" : ""}`}>
                                                    <Image
                                                        src={product.image.formats.small.url}
                                                        width={56}
                                                        height={56}
                                                    />
                                                    <div className="text-type-grey flex flex-col justify-between h-full ml-4">
                                                        <div className="text-lg-17">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-lg-14">
                                                            de la {product.price} lei
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }
                                </div>

                                <div className="w-365px flex flex-row justify-between items-center">
                                    <div className={`${transparent ? "text-ui-blueishGrey" : "text-type-grey"} flex flex-row justify-start items-center`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>
                                            Ln−Vn: 9:00 − 18:00
                                        </span>
                                    </div>

                                    <div className={`${transparent ? "text-ui-grey" : "text-type-manatee"} flex flex-row justify-start items-center font-14px group`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:text-accent-accent transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="group-hover:text-accent-accent transition duration-300 group-hover:underline">
                                            +373 69 482 034
                                        </span>
                                    </div>

                                    <Image
                                        src="/branding/instagram.svg"
                                        height={16}
                                        width={16}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                :
                ""
            }

            
            <div className={`h-56px hidden ${transparent ? "bg-transparent" : "bg-ui-grey hidden"} lg:block lg:overflow-hidden w-full transition duration-300`}>
                <div className="lg:mx-container-lg xl:mx-container-xl h-full">
                    <div className={`${transparent ? "text-ui-white" : "text-type-manatee"} font-14px font-medium h-56px w-full flex flex-row justify-between items-center`}>
                        <div className={`w-165px ${catalogOpen ? "bg-ui-white text-type-manatee" : ""}`}>
                            <div 
                                className={`w-full flex flex-row justify-start items-center h-14 ${catalogOpen ? "text-type-dark" : ""}`}
                                onMouseOver={ () => setCatalogOpen(1)}
                                onMouseLeave={ () => setCatalogOpen(0)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <div>
                                    Catalog
                                </div>
                            </div>
                            <div className="w-full">

                            </div>
                        </div>

                        <div className={`w-524px flex flex-row justify-center items-center ${transparent ? "text-ui-grey" : "text-type-manatee"}`}>
                            <Link href="/">
                                <a className={`${principala ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    Principală
                                </a>
                            </Link>

                            <Link href="/galerie">  
                                <a className={`${galerie ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    Galerie
                                </a>
                            </Link>

                            <Link href="/intrebari-frecvente">
                                <a className={`${faq ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    Întrebări frecvente
                                </a>
                            </Link>

                            <Link href="/contacte">
                                <a className={`${contacte ? "border border-b-2 border-t-0 border-r-0 border-l-0 border-accent-accent text-accent-accent" : ""} mx-8 w-auto h-56px flex flex-row justify-center items-center font-normal font-14px hover:text-accent-accent transition duration-300`}>
                                    Contacte
                                </a>
                            </Link>
                        </div>

                        <div className=" w-165px flex flex-row justify-end items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`block lg:hidden h-16 -mb-16 overflow-hidden ${transparent ? "bg-transparent" : "bg-ui-white"} header-shadow`}>
                <div className="h-full mx-container-md flex flex-row justify-between items-center">
                    <div className="w-112px h-40px">
                        <Image
                            src="/branding/smallLogo.svg"
                            height={40}
                            width={40}
                        />
                    </div>

                    <div className={`hidden md:flex h-10 flex-grow ${transparent ? "bg-ui-dark" : "bg-ui-grey"} rounded-lg px-4 flex-row justify-between items-center ${transparent ? "text-ui-blueishGrey" : "text-type-grey"}`}>
                        <span>
                            Căutare în catalog
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="w-112px flex flex-row justify-end h-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="my-3 h-6 w-6 mr-28px text-ui-black md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>

                        <Hamburger toggled={open} toggle={setOpen} size={24} duration={0.4} color={`${open ? "#000000" : "#677077"}`} rounded/>
                    </div>
                </div>
            </div>

            <div className={`h-screen bg-ui-white ${open ? "block" : "hidden"} pt-16 `}>
                <Slide left cascade duration={300}>
                    <ul className="text-sm-p font-medium text-type-manatee">
                        <Link href="/">
                            <a>
                                <li className="w-full p-4">
                                    Pagina Principală
                                </li>
                            </a>
                        </Link>
                        <Link href="/">
                            <a>
                                <li className="w-full p-4">
                                    Catalog
                                </li>
                            </a>
                        </Link>
                        <Link href="/galerie">
                            <a>
                                <li className="w-full p-4">
                                    Galerie
                                </li>
                            </a>
                        </Link>
                        <Link href="/intrebari-frecvente">
                            <a>
                                <li className="w-full p-4">
                                    Întrebări frecvente
                                </li>
                            </a>
                        </Link>
                        <Link href="/contacte">
                            <a>
                                <li className="w-full p-4">
                                    Contacte
                                </li>
                            </a>
                        </Link>
                    </ul>
                </Slide>
            </div>
        </div>
    )
}