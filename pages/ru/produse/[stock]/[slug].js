import { useRouter } from 'next/router';
import { useContext } from 'react';

import ProductPage from '../../../../components/catalog/productPage';
import { DeviceTypeContext } from '../../../../components/context';
import { HeadWithMeta } from '../../../../components/HeadWithMeta';
import Layout from '../../../../components/layout';
import { uniq } from '../../../../utils/general';
import { API_URL } from '../../../../utils/urls';

export function DynamicProduct ({productData}) {
  const router = useRouter()
  if(router.isFallback){
    return <p className="my-10">Loading...</p>
  }

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
      src : imageObj.url? imageObj.url : "/product/placeholder.png"
    }
  })

  return (
      <Layout lang="ru" slug={productData[0].slug} stock={productData[0].inStock ? 'stoc' : 'comanda'}>
          <HeadWithMeta
            title={`${productData[0].nameru} | Millory`}
            description={`${productData[0].nameru} - unul dintre produsele din colectia "${productData[0].category.name}" de pe site-ul Millory. Livram in Chisinau si restul Moldovei.`}
            img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
            index={true}
          />
          <ProductPage 
            lang="ru"
            deviceType={deviceType}
            name={productData[0].name}
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

export async function getStaticProps({params}) {
  const { slug } = params
  const inStock = params.stock === 'stoc'

  const productsRes = await fetch(`${API_URL}/${inStock ? 'finished-products' : 'products'}?slug_eq=${slug}`)
  const productStrapi = await productsRes.json()

  const optionsRaw = productStrapi[0].add_ons

  const optionNamesUnfiltered = optionsRaw.map((option) => {
    if(option.group){
      return option.group
    }
    else {
      return option.name
    }
  })

  const optionNamesUnfilteredRu = optionsRaw.map((option) => {
    if(option.group){
      return option.groupru
    }
    else {
      return option.nameru
    }
  })

  const optionNamesUnfilteredEn = optionsRaw.map((option) => {
    if(option.group){
      return option.groupen
    }
    else {
      return option.nameen
    }
  })

  const optionNames = uniq(optionNamesUnfiltered)
  const optionNamesRu = uniq(optionNamesUnfilteredRu)
  const optionNamesEn = uniq(optionNamesUnfilteredEn)

  const product = inStock 
    ? {
        ...productStrapi[0].product, 
        height: productStrapi[0].height,
        width: productStrapi[0].width,
        price: productStrapi[0].price,
        price_ro: productStrapi[0].price_ro,
        slug: productStrapi[0].slug,
        inStock: true
      }
    : {
      ...productStrapi[0],
      inStock: false
    }

  const productData = {
    0: product,
    optionsRaw,
    optionNames,
    optionNamesRu,
    optionNamesEn,
    inStock
  }

  return {
    props: {
      productData,
      key: productStrapi[0].id
    },
    revalidate : 10
  }
}  

export async function getStaticPaths() {

  const productsRes = await fetch(`${API_URL}/products`)
  const products = await productsRes.json()

  const finishedProductsRes = await fetch(`${API_URL}/finished-products`)
  const finishedProducts = await finishedProductsRes.json()

  const productPaths = products.map((product) => ({
    params: {
      stock: 'comanda',
      slug: product.slug,
    }
  }))
  
  const finishedProductPaths = finishedProducts.filter((product) => product.slug).map((product) => ({
    params: {
      stock: 'stoc',
      slug: product.slug,
    }
  }))

  const paths = [...productPaths, ...finishedProductPaths]

  return {
    paths,
    fallback: true
  }

}

export default DynamicProduct;