import Layout from "../../../components/layout"
import UAParser from "ua-parser-js";
import ProductPage from "../../../components/catalog/productPage"
import {API_URL} from "../../../utils/urls"
import { DeviceTypeContext, SeenRecentlyContext } from "../../../components/context";
import { useContext, useEffect } from "react";
import {HeadWithMeta} from '../../../components/HeadWithMeta'

export function DynamicProduct ({productData}) {

  const {seenRecently, setSeenRecently} = useContext(SeenRecentlyContext)

  const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
  const images = productData[0].image.length === 0 ?
    [
      {
        src: "/product/placeholder.png"
      }
    ]
    :
    productData[0].image.map((imageObj) => {
    return {
      src : imageObj.formats.medium.url
    }
  })

  return (
      <Layout lang="en" slug={productData[0].slug}>
          <HeadWithMeta
            title={`${productData[0].nameen} | Millora`}
            description={`${productData[0].nameen} - one of the products from the "${productData[0].category.nameen}" collection on the Millora website. We ship to Chisinau and the rest of Moldova.`}
            img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
            index={true}
          />
          <ProductPage 
            lang="en"
            deviceType={deviceType}
            name={productData[0].name}
            price={productData[0].price}
            images={images}
            description={productData[0].description}
            descriptionru={productData[0].descriptionru}
            descriptionen={productData[0].descriptionen}
            category={productData[0].category.name}
            options={productData.optionNames}
            optionsRu={productData.optionNamesRu}
            optionsEn={productData.optionNamesEn}
            optionVariants={productData.optionsRaw}
            productData={productData}
            optionsRaw={productData.optionsRaw}
            nameru={productData[0].nameru}
            nameen={productData[0].nameen}
          ></ProductPage>
      </Layout>
  )
}

export async function getStaticProps({ params }) {
    const slug = params.slug
    const productsRes = await fetch(`${API_URL}/products?slug_eq=${slug}`)
    const productStrapi = await productsRes.json()

    const optionsRaw = productStrapi[0].add_ons

    const optionNamesUnfiltered = optionsRaw.map((option) => {
      if(option.group){
        return option.group
      }
      else{
        return option.name
      }
    })

    const optionNamesUnfilteredRu = optionsRaw.map((option) => {
      if(option.group){
        return option.groupru
      }
      else{
        return option.nameru
      }
    })

    const optionNamesUnfilteredEn = optionsRaw.map((option) => {
      if(option.group){
        return option.groupen
      }
      else{
        return option.nameen
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
    const optionNamesRu = uniq(optionNamesUnfilteredRu)
    const optionNamesEn = uniq(optionNamesUnfilteredEn)

    const productData = {
      slug,
      ...productStrapi,
      optionsRaw,
      optionNames,
      optionNamesRu,
      optionNamesEn
    }

    return {
      props: {
        productData,
        key: productData[0].id
      },
      revalidate : 10
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

  return {
    paths,
    fallback: false
  }

}

export default DynamicProduct;