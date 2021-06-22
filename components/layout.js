import Head from 'next/head';
import {Navbar} from "../components/navbar"
import Footer from "./footer"
import {DeviceTypeContext, CartContext, SeenRecentlyContext} from "../components/context"
import { useContext, useEffect, useState } from 'react';
import {PopupContext} from "./context"

export default function Layout (props) {

    const [width, setWidth] = useState(0)
    
    const { children, title, style, className } = props;
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    const {cart, setCart} = useContext(CartContext)
    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)

    useEffect( () => {
        if (typeof window !== 'undefined') {
            JSON.parse(localStorage.getItem('cart')) == null ?
            setCart([])
            :
            setCart(JSON.parse(localStorage.getItem('cart')))

            setWidth(window.innerWidth)

            JSON.parse(localStorage.getItem('seenRecently')) == null ?
            setSeenRecently([])
            :
            setSeenRecently(JSON.parse(localStorage.getItem('seenRecently')))
        }
    }, [])

    useEffect(() => {
        setDeviceType(width <= 768 ? "mobile" : width <= 1366 ? "tablet" : "desktop")
    }, [width])

    return(
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="description" content={props.description}/>
            </Head>

            <header className={`transition duration-300 z-50 fixed top-0 left-0 ${popupOpen ? "filter brightness-50" : ""} w-full`}>
                <Navbar></Navbar>
            </header>

            <main>
                {width == 0 ? 
                    <div className="pt-40">
                        Loading
                    </div>
                    :
                    children
                }
            </main>

            <footer className={`transition duration-300 ${popupOpen ? "filter brightness-50" : ""}`}>
                <Footer></Footer>
            </footer>
        </div>
    )
}