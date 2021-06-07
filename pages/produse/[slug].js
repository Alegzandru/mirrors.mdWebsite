import Layout from "../../components/layout"
import UAParser from "ua-parser-js";
import ProductPage from "../../components/catalog/productPage"
import {getAllProductPaths, getProductData} from "../../lib/products"
import {API_URL} from "../../utils/urls"

export function DynamicProduct ({deviceType, productData}) {
  const images = productData[0].image.map((imageObj) => {
    return {
      src : imageObj.formats.medium.url
    }
  })

  console.log(images)

  return (
      <Layout>
          <ProductPage 
            deviceType={deviceType}
            name={productData[0].name}
            price={productData[0].price}
            images={images}
            description={productData[0].description}
          ></ProductPage>
      </Layout>
  )
}

export async function getStaticProps({ params }) {
    const slug = params.slug
    const productsRes = await fetch(`${API_URL}/products?slug_eq=${slug}`)
    const productStrapi = await productsRes.json()

    const productData = {
      slug,
      ...productStrapi
    }

    // const productData = getProductData(params.slug)
    return {
      props: {
        productData,
      }
    }
}  

export async function getStaticPaths() {

  const productsRes = await fetch(`${API_URL}/products`)
  const products = await productsRes.json()

  const paths = products.map((product, index) => {
      return({
          params : {
              slug : product.slug
          }
      })
  })

  // const paths = getAllProductPaths()

  return {
    paths,
    fallback: false
  }

}

export default DynamicProduct;