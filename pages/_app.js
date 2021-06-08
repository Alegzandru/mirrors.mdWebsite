import '../styles/globals.css'
import {useState, useEffect} from "react"
import {DeviceTypeContext} from "../components/context"
import UAParser from "ua-parser-js";
import NextNProgress from "../components/NextNProgress"


function MyApp({ Component, pageProps, deviceTypeReq }) {

  const [deviceType, setDeviceType] = useState(deviceTypeReq)
  const valueDeviceType = {deviceType, setDeviceType}

  return (
    <DeviceTypeContext.Provider value={valueDeviceType}>
      <NextNProgress/>
      <Component {...pageProps} />
    </DeviceTypeContext.Provider>
  )
}

MyApp.getInitialProps = ({ req }) => {
    let userAgent;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        userAgent = navigator.userAgent;
      }
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceTypeReq = (result.device && result.device.type) || "desktop";
    return { deviceTypeReq };
};

export default MyApp
