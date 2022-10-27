import Layout from "../components/layout"
import Category from "../components/catalog/category"
import {API_URL} from "../utils/urls"
import { HeadWithMeta } from "../components/HeadWithMeta"

export default function Catalog ({products}) {

  return (
    <Layout lang="ro" category={'in-stoc'}>
      <HeadWithMeta
        title="În Stoc | Millory"
        description={`Pe site-ul Millory puteti gasi o colectie larga de mobila care se va integra ideal in orice hol, baie sau dormitor. Livram in Chisinau si restul Moldovei.`}
        img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
        index={true}
      />
      <Category 
        category={[{filters: []}]}
        name={"În Stoc"}
        products={products}
        lang="ro"
        nameru={"В наличии"}
        nameen={"In Stock"}
      />
    </Layout>  
  )
}

export async function getStaticProps (){
  const finishedProducts_res = await fetch(`${API_URL}/finished-products`)
  const finishedProducts_raw = await finishedProducts_res.json()
  const finishedProducts = finishedProducts_raw.filter((product) => 
    product.slug &&
    product.product &&
    product.height &&
    product.width
  )

  const products = finishedProducts.map((finishedProduct) => ({
    ...finishedProduct.product, 
    ...finishedProduct,
    inStock: true
  }))

  return {
    props : {
      products : products,
      key: 'in-stoc'
    },
    revalidate : 10
  }
}