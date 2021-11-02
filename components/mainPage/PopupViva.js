import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import vivaError from "../../public/lottie/vivaError.json"
import vivaSuccess from "../../public/lottie/vivaSuccess.json"
import { base64Credentials, useOutsideAlerter } from '../../utils/general';
import { getErrorText } from '../../utils/vivaErrors';

const PopupViva = ({transactionId, close}) => {

  const [popupContent, setPopupContent] = useState({
    status: '',
    eventId: 0,
  })

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, close);

  useEffect(async() => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Credentials()}`
      }
    }

    const transactionDataRaw = await fetch(`https://demo.vivapayments.com/api/transactions/${transactionId}`, options)
    const transactionData = await transactionDataRaw.json()

    console.log(transactionId)
    console.log(transactionData)

    const {Success, EventId} = transactionData
    setPopupContent({status: Success ? 'success' : 'error', eventId: EventId})
  }, [])

  useEffect(() => {
    console.log(popupContent)
  }, [popupContent])

  return(
      <div className="px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu w-full h-screen z-50 flex flex-row justify-center items-center fixed transparent filter">
        <div ref={wrapperRef}>
          {
            popupContent.status &&
            popupContent.status === 'success' ?
            <div className={`w-full md:w-500px h-360px bg-ui-white flex flex-col items-center justify-center rounded-xl relative`}>
                <button onClick={close}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-6 right-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-165px h-165px transform">
                    <Lottie animationData={vivaSuccess}/>
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
                    <Lottie animationData={vivaError}/>
                </div>
                <div className="w-full text-lg-17 md:text-lg-17 lg:text-lg-card-price text-type-manatee text-center underline mb-4 font-bold">
                    Eroare în timpul plății:
                </div>
                <div className="w-full text-lg-17 md:text-lg-17 lg:text-lg-card-price text-type-manatee text-center font-medium px-2 lg:px-4">
                    {getErrorText(popupContent.eventId)}
                </div>
            </div>
          }
        </div>
      </div>
)}

export default PopupViva