import Layout from "../../components/layout"
import Category from "../../components/catalog/category"
import {API_URL} from "../../utils/urls"
import { HeadWithMeta } from "../../components/HeadWithMeta"

export default function Catalog ({category, products}) {

    return (
        <Layout lang="en" category={category[0].slug}>
            <HeadWithMeta
              title={`${category[0].nameen} | Mirrors MD`}
              description={`On the Mirrors MD website you can find a wide collection of ${category[0].nameen} which will ideally fit in any hall, bathroom or bedroom. We ship to Chisinau and the rest of Moldova.`}
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <Category 
                category={category}
                name={category[0].name}
                products={products}
                lang="en"
                nameru={category[0].nameru}
                nameen={category[0].nameen}
            >
            </Category>
        </Layout>  
    )
}

export async function getStaticProps ({params}){
    const category_res = await fetch(`${API_URL}/categories?slug_eq=${params.category}`)
    const category = await category_res.json()

    const products_res = await fetch(`${API_URL}/products?category.name_eq=${category[0].name}`)
    const products_raw = await products_res.json()
    const products = products_raw.filter((product) => 
      product.name !== "" && product.name !== null &&
      product.nameru !== "" && product.nameru !== null &&
      product.slug !== "" && product.slug !== null &&
      product.smallcoeficient !== null && 
      product.mediumcoeficient !== null && 
      product.bigcoeficient !== null &&
      product.smallestsize !== null &&
      product.mediumsize !== null &&
      product.bigsize !== null &&
      product.biggestsize !== null &&
      product.defaultsize !== null &&
      product.linkedsizes.length !== 0 && product.linkedsizes.length !== null &&
      product.materials.length !== 0 && product.materials.length !== null &&
      product.add_ons.length !== 0 && product.add_ons.length !== null
    )

    return {
        props : {
            category : category,
            products : products,
            key: category[0].id
        },
        revalidate : 10
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