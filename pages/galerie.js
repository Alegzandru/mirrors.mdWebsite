import Layout from "../components/layout"
import GalerieComponent from "../components/galerie/galerieComponent"
import UAParser from "ua-parser-js";
import RecentProducts from "../components/multiPage/recentProducts"
import { useContext } from "react";
import { DeviceTypeContext } from "../components/context";
import { API_URL } from "../utils/urls";
import InstaBlock from "../components/galerie/instaBlock";
import Head from "next/head";

export default function Galerie({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
    console.log(deviceType)

    return (
        <Layout>
            {/* <InstaBlock></InstaBlock> */}
            <Head>
              <script type="text/javascript" src="/static/instafeed.min.js"></script>
              <script type="text/javascript" src="/static/instaToken.js"></script>
              {/* <script type="text/javascript" dangerouslySetInnerHTML={{ __html : process.env.NEXT_PUBLIC_rawInstaFeedMin}}></script>
              <script type="text/javascript" dangerouslySetInnerHTML={{ __html : process.env.NEXT_PUBLIC_rawInstaToken}}></script> */}
            </Head>

            <div id="instafeed"></div>
            <GalerieComponent 
              deviceType={deviceType}
              products={products}
            ></GalerieComponent>
            <RecentProducts deviceType={deviceType}></RecentProducts>
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