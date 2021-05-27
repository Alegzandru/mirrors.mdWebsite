import '../styles/globals.css'
import {useState, useEffect} from "react"
import {WidthContext} from "../components/context"

// function useWindowSize() {

//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       function handleResize() {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       }
    
//       window.addEventListener("resize", handleResize);
     
//       handleResize();
    
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []); // Empty array ensures that effect is only run on mount
//   return windowSize;
// }

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
