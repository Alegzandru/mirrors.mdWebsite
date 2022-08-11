import Layout from "../../components/layout"
import Category from "../../components/catalog/category"
import {API_URL} from "../../utils/urls"
import { HeadWithMeta } from "../../components/HeadWithMeta"

export default function Catalog ({products}) {

  console.log(products)

  return (
    <Layout lang="en" category={'in-stoc'}>
      <HeadWithMeta
        title="In Stock | Millory"
        description={"On the Millory website you can find a wide collection of furniture which will ideally fit in any hall, bathroom or bedroom. We ship to Chisinau and the rest of Moldova."}
        img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
        index={true}
      />
      <Category 
        category={[{filters: []}]}
        name={"În Stoc"}
        products={products}
        lang="en"
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