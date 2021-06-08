import Layout from "../components/layout"
import Category from "../components/catalog/category"
import {API_URL} from "../utils/urls"

export default function Catalog ({category}) {

    return (
        <Layout>
            <Category 
                category={category}
                name={category[0].name}
            >
            </Category>
        </Layout>  
    )
}

export async function getStaticProps ({params}){
    const category_res = await fetch(`${API_URL}/categories?slug_eq=${params.category}`)
    const category = await category_res.json()

    return {
        props : {
            category : category
        }
    }
}


export async function getStaticPaths() {

    const categoryRes = await fetch(`${API_URL}/categories`)
    const categories = await categoryRes.json()
  
    const paths = categories.map((category, index) => {
        return({
            params : {
                category : category.slug
            }
        })
    })
    
    return {
      paths,
      fallback: false
    }
  
}