import Layout from "../components/layout";
import CosProducts from "../components/cos/cosProducts.js"
import CosTotal from "../components/cos/cosTotal.js"

export default function Cos () {
    return(
        <Layout lang="ro">
            <CosProducts
                lang="ro"
            ></CosProducts>
            <CosTotal
                lang="ro"
            ></CosTotal>
        </Layout>
    )
}