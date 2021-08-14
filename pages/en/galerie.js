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

    return (
        <Layout lang="en">
            <InstaBlock
              lang="en"
            ></InstaBlock>
            {/* <GalerieComponent 
              deviceType={deviceType}
              products={products}
            ></GalerieComponent> */}
            <RecentProducts 
              lang="en"
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