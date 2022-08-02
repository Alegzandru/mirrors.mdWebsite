import 'react-multi-carousel/lib/styles.css';

import { useContext, useEffect, useState } from 'react';

import { DeviceTypeContext, PopupContext } from '../components/context';
import { HeadWithMeta } from '../components/HeadWithMeta';
import Layout from '../components/layout';
import Benefits from '../components/mainPage/benefits';
import Hero from '../components/mainPage/hero';
import NewProducts from '../components/mainPage/newProducts';
import Options from '../components/mainPage/options';
import PopularProducts from '../components/mainPage/popularProducts';
import { API_URL } from '../utils/urls';
import Head from 'next/head';
import PopupViva from '../components/mainPage/PopupViva';
import { useRouter } from 'next/router'

export default function MainPage({products}){

  const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
  const [vivaPopupOpen, setVivaPopupOpen] = useState(false)

  const router = useRouter()
  const {status, eventid} = router.query

  useEffect(() => {
    if(status){
    setVivaPopupOpen(true)
    }
  }, [status])

  const closeModal = () => {
    setVivaPopupOpen(false)
  }

  return (
    <div>
      {vivaPopupOpen && <PopupViva 
        status={status}
        eventId={eventid}
        close={closeModal}
      />}
      <div className={vivaPopupOpen ? "filter brightness-50 transition-all duration-500" : ""}>
        <Layout lang="ro">
          <HeadWithMeta
            title="Millora - Oglinzi La Comanda in Chisinau"
            description="Pe site-ul Millora puteti gasi oglinzi LED, dulapuri si alt mobilier care se va integra ideal in orice hol, baie sau dormitor. Livram in Chisinau si restul Moldovei."
            img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
            index={true}
          />
          <Head>
            <meta name="google-site-verification" content="A88b9KwY33u20syvBmYcdb2vOm1mt6lz7KC1n1MQJis" />
          </Head>
          <Hero lang="ro"/>
          <PopularProducts 
            lang="ro"
            deviceType={deviceType}
            products={products}
          ></PopularProducts>
          <Benefits lang="ro"/>
          <NewProducts 
            lang="ro"
            deviceType={deviceType}
            products={products}
          ></NewProducts>
          <Options lang="ro"/>
        </Layout>
      </div>
    </div>
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
    },
    revalidate: 10
  }
}