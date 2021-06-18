import Head from 'next/head';
import {Navbar} from "../components/navbar"
import Footer from "./footer"
import {DeviceTypeContext, CartContext} from "../components/context"
import { useContext, useEffect, useState } from 'react';

export default function Layout (props) {

    const [width, setWidth] = useState(0)
    
    const { children, title, style, className } = props;
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    const {cart, setCart} = useContext(CartContext)

    useEffect( () => {
        if (typeof window !== 'undefined') {
            JSON.parse(localStorage.getItem('cart')) == null ?
            setCart([])
            :
            setCart(JSON.parse(localStorage.getItem('cart')))
            setWidth(window.innerWidth)
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

            <header>
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
                {/* {children} */}
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}