import '../styles/globals.css'
import {useState, useEffect} from "react"
import {WidthContext} from "../components/context"

function MyApp({ Component, pageProps }) {

  // const size = useWindowSize();
  // const [width, setWidth] = useState(size.width)
  // const valueWidth = {width, setWidth}
  // console.log(width)

  return (
    // <WidthContext.Provider value={valueWidth}>
      <Component {...pageProps} />
    // </WidthContext.Provider>
  )
}

export default MyApp
