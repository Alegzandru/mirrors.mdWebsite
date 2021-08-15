import 'react-multi-carousel/lib/styles.css';

import { useContext } from 'react';

import { DeviceTypeContext } from '../components/context';
import { HeadWithMeta } from '../components/HeadWithMeta';
import Layout from '../components/layout';
import Benefits from '../components/mainPage/benefits';
import Hero from '../components/mainPage/hero';
import NewProducts from '../components/mainPage/newProducts';
import Options from '../components/mainPage/options';
import PopularProducts from '../components/mainPage/popularProducts';
import { API_URL } from '../utils/urls';

export default function MainPage({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="ro">
            <HeadWithMeta
              title="Mirrors MD - oglinzi la comanda in Chisinau"
              description="Pe site-ul Mirrors MD puteti gasi oglinzi LED, dulapuri si alt mobilier care se va integra ideal in orice hol, baie sau dormitor. Livram in Chisinau si restul Moldovei."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
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
    },
    revalidate: 10
  }
}