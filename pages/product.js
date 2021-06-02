import Layout from "../components/layout"
import ProductComponent from "../components/catalog/productComponent"
import UAParser from "ua-parser-js";

export function Product ({deviceType}) {
    return (
        <Layout>
            <ProductComponent deviceType={deviceType}></ProductComponent>
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