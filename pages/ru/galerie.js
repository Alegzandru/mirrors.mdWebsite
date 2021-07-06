import Layout from "../../components/layout"
import GalerieComponent from "../../components/galerie/galerieComponent"
import UAParser from "ua-parser-js";
import RecentProducts from "../../components/multiPage/recentProducts"
import { useContext, useEffect } from "react";
import { DeviceTypeContext } from "../../components/context";
import { API_URL } from "../../utils/urls";
import InstaBlock from "../../components/galerie/instaBlock";
import Head from "next/head";

export default function Galerie({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    console.log(deviceType)

    return (
        <Layout>
            <InstaBlock
              lang="ru"
            ></InstaBlock>
            {/* <GalerieComponent 
              deviceType={deviceType}
              products={products}
            ></GalerieComponent> */}
            <RecentProducts 
              lang="ru"
              deviceType={deviceType}
            ></RecentProducts>
        </Layout>
    )
}

export async function getStaticProps() {

  const productsRes = await fetch(`${API_URL}/products`)
  const products = await productsRes.json()

  return {
    props: {
      products,
    }
  }
}