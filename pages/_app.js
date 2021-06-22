import '../styles/globals.css'
import {useState, useEffect} from "react"
import {DeviceTypeContext, CartContext, PopupContext, SeenRecentlyContext} from "../components/context"
import UAParser from "ua-parser-js";
import NextNProgress from "../components/NextNProgress"
import {deviceType as deviceTypeWSpaces, isTablet, isMobile, isDesktop} from 'react-device-detect';

function MyApp({ Component, pageProps, deviceTypeReq, isMobile, isTablet }) {

  const [deviceType, setDeviceType] = useState("")
  const valueDeviceType = {deviceType, setDeviceType}

  const [cart, setCart] = useState([])
  const valueCart = {cart, setCart}

  const [popupOpen, setPopupOpen] = useState("")
  const valuePopup = {popupOpen, setPopupOpen}

  const [seenRecently, setSeenRecently] = useState([])
  const valueSeenRecently = {seenRecently, setSeenRecently}

  useEffect(() => {
    localStorage.setItem('seenRecently', JSON.stringify(seenRecently))
  }, [seenRecently])
 
  return (
    <SeenRecentlyContext.Provider value={valueSeenRecently}>
      <PopupContext.Provider value={valuePopup}>
        <CartContext.Provider value={valueCart}>
          <DeviceTypeContext.Provider value={valueDeviceType}>
            <NextNProgress/>
            <Component {...pageProps} />
          </DeviceTypeContext.Provider>
        </CartContext.Provider>
      </PopupContext.Provider>
    </SeenRecentlyContext.Provider>
  )
}

// MyApp.getInitialProps = ({ ctx }) => {
//     let userAgent;
//     // if (req) {
//     //   userAgent = req.headers["user-agent"];
//     // } else {
//     //   userAgent = navigator.userAgent
//     // }
//     ctx.req ? userAgent = ctx.req.headers["user-agent"] : userAgent = navigator.userAgent
//     const parser = new UAParser();
//     parser.setUA(userAgent);
//     const result = parser.getResult();
//     const deviceTypeReq = (result.device && result.device.type) || "desktop";

//   return { deviceTypeReq };
// };

export default MyApp
