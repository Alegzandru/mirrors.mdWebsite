import Layout from "../components/layout"
import Category from "../components/catalog/category"
import {API_URL} from "../utils/urls"

export default function Catalog ({productsApi}) {

    return (
        <Layout>
            <Category productsApi={productsApi}>
            </Category>
        </Layout>  
    )
}

export async function getStaticProps (){
    //Fetch the products
    const product_res = await fetch(`${API_URL}/products/`)
    const products = await product_res.json()

    //Return the products
    return {
        props : {
            productsApi : products
        }
    }
}