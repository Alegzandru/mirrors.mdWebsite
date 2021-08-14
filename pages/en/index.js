import Hero from "../../components/mainPage/hero"
import Layout from "../../components/layout"
import PopularProducts from "../../components/mainPage/popularProducts"
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";
import Benefits from "../../components/mainPage/benefits"
import NewProducts from "../../components/mainPage/newProducts"
import Options from "../../components/mainPage/options"
import { useContext } from "react";
import { DeviceTypeContext } from "../../components/context";
import { API_URL } from "../../utils/urls";

export default function MainPage({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="en">
            <Hero
              lang="en"
            ></Hero>
            <PopularProducts 
              lang="en"
              deviceType={deviceType}
              products={products}
            ></PopularProducts>
            <Benefits
              lang="en"
            ></Benefits>
            <NewProducts 
              lang="en"
              deviceType={deviceType}
              products={products}
            ></NewProducts>
            <Options
              lang="en"
            ></Options>
        </Layout>
    )
}

export async function getStaticProps() {

  const products_res = await fetch(`${API_URL}/products`)
  const products_raw = await products_res.json()
  const products = products_raw.filter((product) => 
    product.name !== "" && product.name !== null &&
    product.nameru !== "" && product.nameru !== null &&
    product.slug !== "" && product.slug !== null &&
    product.smallcoeficient !== null && 
    product.mediumcoeficient !== null && 
    product.bigcoeficient !== null &&
    product.smallestsize !== null &&
    product.mediumsize !== null &&
    product.bigsize !== null &&
    product.biggestsize !== null &&
    product.defaultsize !== null &&
    product.linkedsizes.length !== 0 && product.linkedsizes.length !== null &&
    product.materials.length !== 0 && product.materials.length !== null &&
    product.add_ons.length !== 0 && product.add_ons.length !== null
  )

  return {
    props: {
      products,
    }
  }
}