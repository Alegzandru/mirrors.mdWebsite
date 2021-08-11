import '../styles/globals.css';

import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import TagManager from 'react-gtm-module';

import { AddonPopupContext, CartContext, DeviceTypeContext, PopupContext, SeenRecentlyContext } from '../components/context';
import NextNProgress from '../components/NextNProgress';

function MyApp({ Component, pageProps, deviceTypeReq, isMobile, isTablet }) {

  const [deviceType, setDeviceType] = useState("")
  const valueDeviceType = {deviceType, setDeviceType}

  const [cart, setCart] = useState([])
  const valueCart = {cart, setCart}

  const [popupOpen, setPopupOpen] = useState("")
  const valuePopup = {popupOpen, setPopupOpen}

  const [seenRecently, setSeenRecently] = useState([])
  const valueSeenRecently = {seenRecently, setSeenRecently}

  const [addonOpen, setAddonOpen] = useState('')
  const valueAddon = {addonOpen, setAddonOpen}

  useEffect(() => {
    localStorage.setItem('seenRecently', JSON.stringify(seenRecently))
  }, [seenRecently])

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KQLD9P8' });
  }, []);
 
  return (
    <SeenRecentlyContext.Provider value={valueSeenRecently}>
      <AddonPopupContext.Provider value={valueAddon}>
        <PopupContext.Provider value={valuePopup}>
          <CartContext.Provider value={valueCart}>
            <DeviceTypeContext.Provider value={valueDeviceType}>
              <NextNProgress/>
              <Component {...pageProps} />
            </DeviceTypeContext.Provider>
          </CartContext.Provider>
        </PopupContext.Provider>
      </AddonPopupContext.Provider>
    </SeenRecentlyContext.Provider>
  )
}

export default MyApp
