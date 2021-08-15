import { useContext, useEffect } from 'react';

import { DeviceTypeContext } from '../components/context';
import InstaBlock from '../components/galerie/instaBlock';
import { HeadWithMeta } from '../components/HeadWithMeta';
import Layout from '../components/layout';
import RecentProducts from '../components/multiPage/recentProducts';
import { API_URL } from '../utils/urls';

export default function Galerie({products}){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    return (
        <Layout lang="ro">
            <HeadWithMeta
              title="Galerie | Mirrors MD"
              description="In galeria site-ului Mirrors MD puteti gasi poze cu oglinzi, dulapuri si alt mobilier din catalogul nostru de produse. Livram in Chisinau si restul Moldovei."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <InstaBlock
              lang="ro"
            ></InstaBlock>
            <RecentProducts 
              lang="ro"
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