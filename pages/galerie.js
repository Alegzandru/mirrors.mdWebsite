import Layout from "../components/layout"
import GalerieComponent from "../components/galerie/galerieComponent"
import UAParser from "ua-parser-js";
import RecentProducts from "../components/multiPage/recentProducts"

export function Galerie({deviceType}){
    return (
        <Layout>
            <GalerieComponent deviceType={deviceType}></GalerieComponent>
            <RecentProducts deviceType={deviceType}></RecentProducts>
        </Layout>
    )
}

Galerie.getInitialProps = ({ req }) => {
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

export default Galerie;