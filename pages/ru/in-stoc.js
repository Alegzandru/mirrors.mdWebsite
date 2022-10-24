import Layout from "../../components/layout"
import Category from "../../components/catalog/category"
import {API_URL} from "../../utils/urls"
import { HeadWithMeta } from "../../components/HeadWithMeta"

export default function Catalog ({products}) {

  return (
    <Layout lang="ru" category={'in-stoc'}>
      <HeadWithMeta
        title="В наличии | Millory"
        description={`На сайте Millory вы можете найти широкую коллекцию которые идеально впишутся в любой холл, ванную комнату или спальню. Доставка в Кишинев и другие районы Молдовы.`}
        img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
        index={true}
      />
      <Category 
        category={[{filters: []}]}
        name={"În Stoc"}
        products={products}
        lang="ru"
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