import { useContext, useEffect } from 'react';

import { DeviceTypeContext } from '../../components/context';
import InstaBlock from '../../components/galerie/instaBlock';
import { HeadWithMeta } from '../../components/HeadWithMeta';
import Layout from '../../components/layout';
import RecentProducts from '../../components/multiPage/recentProducts';
import { API_URL } from '../../utils/urls';

export default function Galerie({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="ru">
            <HeadWithMeta
              title="Галерея | Millora"
              description="В галерее сайта Millora вы можете найти фотографии зеркал, шкафов и другой мебели из нашего каталога продукции. Доставка в Кишинев и другие районы Молдовы."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <InstaBlock
              lang="ru"
            ></InstaBlock>
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