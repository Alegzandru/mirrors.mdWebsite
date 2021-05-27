import Head from 'next/head';
import {Navbar} from "../components/navbar"
import Footer from "./footer"

export default function Layout (props) {
    
    const { children, title, style, className } = props;

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
                {children}
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}