import Layout from "../../components/layout";
import CosProducts from "../../components/cos/cosProducts.js"
import CosTotal from "../../components/cos/cosTotal.js"

export default function Cos () {
    return(
        <Layout lang="en">
            <CosProducts
                lang="en"
            ></CosProducts>
            <CosTotal
                lang="en"
            ></CosTotal>
        </Layout>
    )
}