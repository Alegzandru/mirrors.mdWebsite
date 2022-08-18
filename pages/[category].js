import Layout from "../components/layout"
import Category from "../components/catalog/category"
import {API_URL} from "../utils/urls"
import { HeadWithMeta } from "../components/HeadWithMeta"

export default function Catalog ({category, products}) {

  return (
        <Layout lang="ro" category={category[0].slug}>
            <HeadWithMeta
              title={`${category[0].name} | Millory`}
              description={`Pe site-ul Millory puteti gasi o colectie larga de ${category[0].name} care se vor integra ideal in orice hol, baie sau dormitor. Livram in Chisinau si restul Moldovei.`}
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <Category 
                category={category}
                name={category[0].name}
                products={products}
                lang="ro"
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
    product.name &&
    product.nameru &&
    product.slug &&
    product.smallcoeficient && 
    product.mediumcoeficient && 
    product.bigcoeficient &&
    // product.smallcoeficient_ro && 
    // product.mediumcoeficient_ro && 
    // product.bigcoeficient_ro &&
    product.smallestsize &&
    product.medium_size &&
    product.big_size &&
    product.biggestsize &&
    product.defaultsize &&
    // product.linkedsizes && product.linkedsizes.length !== 0 &&
    product.materials && product.materials.length !== 0 &&
    product.add_ons && product.add_ons.length !== 0
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