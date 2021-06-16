import Head from 'next/head';
import {Navbar} from "../components/navbar"
import Footer from "./footer"
import {DeviceTypeContext} from "../components/context"
import { useContext, useEffect, useState } from 'react';

export default function Layout (props) {

    const [width, setWidth] = useState(0)
    
    const { children, title, style, className } = props;
    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    useEffect( () => {
        if (typeof window !== 'undefined') {
          setWidth(window.innerWidth)
        }
      }, [])

    useEffect(() => {
        setDeviceType(width <= 768 ? "mobile" : width <= 1366 ? "tablet" : "desktop")
        console.log("Use effect", width)
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