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
import Testimonials from '../../components/mainPage/Testimonials/Testimonials';

export default function MainPage({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="ru">
            <HeadWithMeta
              title="Millory - Зеркала на Заказ в Кишиневе"
              description="На сайте Millory вы найдете ЛЕД зеркала, шкафы и другую мебель, которая идеально впишется в любой холл, ванную комнату или спальню. Доставка в Кишинев и другие районы Молдовы."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <Hero
              lang="ru"
            ></Hero>
            <PopularProducts 
              lang="ru"
              deviceType={deviceType}
              products={products}
            ></PopularProducts>
            <Benefits
              lang="ru"
            ></Benefits>
            <Testimonials/>
            <NewProducts 
              lang="ru"
              deviceType={deviceType}
              products={products}
            ></NewProducts>
            <Options
              lang="ru"
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