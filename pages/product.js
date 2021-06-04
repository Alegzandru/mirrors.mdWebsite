import Layout from "../components/layout"
import UAParser from "ua-parser-js";
import ProductPage from "../components/catalog/productPage"

export function Product ({deviceType}) {
    return (
        <Layout>
            <ProductPage deviceType={deviceType}></ProductPage>
        </Layout>
    )
}

Product.getInitialProps = ({ req }) => {
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

export default Product;