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

  return (
      <Layout>
          <ProductPage 
            deviceType={deviceType}
            name={productData[0].name}
            price={productData[0].price}
            images={images}
            description={productData[0].description}
            category={productData[0].category.name}
            options={productData.optionNames}
            optionVariants={productData.optionsRaw}
            productData={productData}
            optionsRaw={productData.optionsRaw}
          ></ProductPage>
      </Layout>
  )
}

export async function getStaticProps({ params }) {
    const slug = params.slug
    const productsRes = await fetch(`${API_URL}/products?slug_eq=${slug}`)
    const productStrapi = await productsRes.json()

    const category = productStrapi[0].category.name
    const categoryRes = await fetch(`${API_URL}/categories?name_eq=${category}`)
    const optionsUnflitered = await categoryRes.json()
    const optionsRaw = optionsUnflitered[0].add_ons

    const optionNamesUnfiltered = optionsRaw.map((option) => {
      if(option.group){
        return option.group
      }
      else{
        return option.name
      }
    })

    function uniq(a) {
      var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
  
      return a.filter(function(item) {
          var type = typeof item;
          if(type in prims)
              return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
          else
              return objs.indexOf(item) >= 0 ? false : objs.push(item);
      });
    }
  
    const optionNames = uniq(optionNamesUnfiltered)

    const productData = {
      slug,
      ...productStrapi,
      optionNames,
      optionsRaw,
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