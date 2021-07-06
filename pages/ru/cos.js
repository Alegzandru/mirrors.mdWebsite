import Layout from "../../components/layout";
import CosProducts from "../../components/cos/cosProducts.js"
import CosTotal from "../../components/cos/cosTotal.js"

export default function Cos () {
    return(
        <Layout>
            <CosProducts
                lang="ru"
            ></CosProducts>
            <CosTotal
                lang="ru"
            ></CosTotal>
        </Layout>
    )
}