import '../styles/globals.css';

import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';

import { AddonPopupContext, CartContext, DeviceTypeContext, PopupContext, SeenRecentlyContext } from '../components/context';
import NextNProgress from '../components/NextNProgress';
import { getIP, getWithExpiry, setWithExpiry } from '../utils/general';

function MyApp({ Component, pageProps }) {

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

  const [country, setCountry] = useState('unclear')

  useEffect(() => {
    localStorage.setItem('seenRecently', JSON.stringify(seenRecently))
  }, [seenRecently])

  useEffect(async () => {
    TagManager.initialize({ gtmId: 'GTM-KQLD9P8' });
    if(!getWithExpiry('country')){
      const countryIP = await getIP()
      setWithExpiry('country', countryIP, 120)
      setCountry(getWithExpiry('country'))
    }
    else{
      setCountry(getWithExpiry('country'))
    }
  }, []);

  // if (typeof window === 'object') {
  //   document.addEventListener('contextmenu', function(e) {
  //     e.preventDefault();
  //   })
  //   document.onkeydown = function(e) {
  //     if(event.keyCode == 123) {
  //        return false;
  //     }
  //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  //        return false;
  //     }
  //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
  //        return false;
  //     }
  //     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  //        return false;
  //     }
  //     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  //        return false;
  //     }
  //   }  
  // }
 
  return (
    country === 'unclear' ? 
    <div className="w-full h-full bg-ui-white flex flex-row justify-center items-center">
    </div>
    :
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
