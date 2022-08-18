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
        <Layout lang="en">
            <HeadWithMeta
              title="Gallery | Millory"
              description="In the gallery of the Millory website you can find pictures of mirrors, wardrobes and other furniture from our product catalog. We ship to Chisinau and the rest of Moldova."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <InstaBlock
              lang="en"
            ></InstaBlock>
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