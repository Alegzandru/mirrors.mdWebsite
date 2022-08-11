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
  const products_res = await fetch(`${API_URL}/products`)
  const products_raw = await products_res.json()
  const products = products_raw.filter((product) => 
    product.name &&
    product.nameru &&
    product.nameen &&
    product.slug &&
    product.finished_products && product.finished_products.length
  )

  return {
    props : {
      products : products,
      key: 'in-stoc'
    },
    revalidate : 10
  }
}