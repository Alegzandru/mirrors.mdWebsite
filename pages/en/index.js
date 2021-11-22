import 'react-multi-carousel/lib/styles.css';

import { useContext } from 'react';

import { DeviceTypeContext } from '../../components/context';
import { HeadWithMeta } from '../../components/HeadWithMeta';
import Layout from '../../components/layout';
import Benefits from '../../components/mainPage/benefits';
import Hero from '../../components/mainPage/hero';
import NewProducts from '../../components/mainPage/newProducts';
import Options from '../../components/mainPage/options';
import PopularProducts from '../../components/mainPage/popularProducts';
import { API_URL } from '../../utils/urls';

export default function MainPage({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="en">
            <HeadWithMeta
              title="Mirrors MD - Custom Mirrors in Chisinau"
              description="On the Mirrors MD website you can find LED mirrors, cabinets and other furniture that will fit ideally in any hall, bathroom or bedroom. We deliver to Chisinau and the rest of Moldova."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
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
    product.name && product.name !== "" &&
    product.nameru && product.nameru !== "" &&
    product.slug && product.slug !== "" &&
    product.smallcoeficient && 
    product.mediumcoeficient && 
    product.bigcoeficient &&
    // product.smallcoeficient_ro && 
    // product.mediumcoeficient_ro && 
    // product.bigcoeficient_ro &&
    product.smallestsize &&
    product.medium_size &&
    product.big_size &&
    product.biggestsize &&
    product.defaultsize &&
    // product.linkedsizes && product.linkedsizes.length !== 0 &&
    product.materials && product.materials.length !== 0 &&
    product.add_ons && product.add_ons.length !== 0
  )

  return {
    props: {
      products,
    }
  }
}