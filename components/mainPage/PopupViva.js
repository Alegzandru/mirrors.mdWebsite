import lottie from 'lottie-web'
import { useEffect, useRef } from 'react';
import vivaError from "../../public/lottie/vivaError.json"
import vivaSuccess from "../../public/lottie/vivaSuccess.json"
import { useOutsideAlerter } from '../../utils/general';
import { getErrorText } from '../../utils/vivaErrors';

const PopupViva = ({status, eventId, close}) => {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, close);

  const successRef = useRef(null)
  const errorRef = useRef(null)

  useEffect(() => {
    (
      async () => {
      lottie.loadAnimation({
      container: successRef.current,
      animationData: vivaSuccess,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
    lottie.loadAnimation({
      container: errorRef.current,
      animationData: vivaError,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
    }
  )()
  }, [])

  return(
    <div className="px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu w-full h-screen z-50 flex flex-row justify-center items-center fixed transparent filter">
    <div ref={wrapperRef}>
      {
        status && status === 'success' ?
        <div className={`w-full md:w-500px h-360px bg-ui-white flex flex-col items-center justify-center rounded-xl relative`}>
          <button onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-6 right-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-165px h-165px transform">
            <div className="h-full w-full" ref={successRef}/>
          </div>
          <div className="w-full text-lg-17 md:text-lg-17 lg:text-lg-card-price text-type-manatee text-center font-medium px-2 lg:px-4">
            Plata a fost efectuată cu succes!
          </div>
        </div>
        :
        <div className={`w-full md:w-500px h-360px bg-ui-white flex flex-col items-center justify-center rounded-xl relative`}>
          <button onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-6 right-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-165px h-165px transform">
            <div className="h-full w-full" ref={errorRef}/>
          </div>
          <div className="w-full text-lg-17 md:text-lg-17 lg:text-lg-card-price text-type-manatee text-center underline mb-4 font-bold">
            Eroare în timpul plății:
          </div>
          <div className="w-full text-lg-17 md:text-lg-17 lg:text-lg-card-price text-type-manatee text-center font-medium px-2 lg:px-4">
            {getErrorText(parseInt(eventId))}
          </div>
        </div>
      }
    </div>
    </div>
)}

export default PopupViva