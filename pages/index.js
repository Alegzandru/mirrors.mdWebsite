import Hero from "../components/mainPage/hero"
import Layout from "../components/layout"
import PopularProducts from "../components/mainPage/popularProducts"
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";
import Benefits from "../components/mainPage/benefits"
import NewProducts from "../components/mainPage/newProducts"
import Options from "../components/mainPage/options"

export function MainPage({deviceType}){
    return (
        <Layout>
            <Hero></Hero>
            <PopularProducts deviceType={deviceType}></PopularProducts>
            <Benefits></Benefits>
            <NewProducts deviceType={deviceType}></NewProducts>
            <Options></Options>
        </Layout>
    )
}

MainPage.getInitialProps = ({ req }) => {
    let userAgent;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";
    return { deviceType };
};

export default MainPage;