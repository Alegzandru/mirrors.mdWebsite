import Hero from "../components/mainPage/hero"
import Layout from "../components/layout"
import PopularProducts from "../components/mainPage/popularProducts"
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";
import Benefits from "../components/mainPage/benefits"
import NewProducts from "../components/mainPage/newProducts"
import Options from "../components/mainPage/options"
import { useContext } from "react";
import { DeviceTypeContext } from "../components/context";
import { API_URL } from "../utils/urls";

export default function MainPage({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="ro">
            <Hero
              lang="ro"
            ></Hero>
            <PopularProducts 
              lang="ro"
              deviceType={deviceType}
              products={products}
            ></PopularProducts>
            <Benefits
              lang="ro"
            ></Benefits>
            <NewProducts 
              lang="ro"
              deviceType={deviceType}
              products={products}
            ></NewProducts>
            <Options
              lang="ro"
            ></Options>
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