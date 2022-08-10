import { Loader } from '@googlemaps/js-api-loader'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { locations, markerIcon } from '../../constants/locations'
import { isRoDomain } from '../../utils/general'

const GoogleMap = () => {
  const googleMapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  const roDomain = isRoDomain()

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      })

      await loader.load()

      const google = window.google

      mapRef.current = new google.maps.Map(googleMapRef.current, {
        center: locations.md,
        zoom: 12.3,
        streetViewControl: false,
      })

      const marker = new google.maps.Marker({
        position: locations.md,
        icon: markerIcon,
        map: mapRef.current,
      })

      marker.addListener('click', () => {
        mapRef.current?.setZoom(16)
        mapRef.current?.panTo(marker.getPosition() )
      })
    })()
  }, [])

  useEffect(() => {
      mapContainerRef.current?.scrollIntoView(true)

      mapRef.current?.setZoom(12)

      setTimeout(() => {
        mapRef.current?.panTo(locations.md)
        mapRef.current?.setZoom(16)
      }, 500)
  }, [])

  return (
    <div ref={mapContainerRef} className="w-full max-w-screen relative">
      <div id="map" ref={googleMapRef} className="h-320px md:h-588px lg:h-600px w-full"/>
      {!roDomain && <div className="absolute top-245px md:top-32 left-2">
        <a href="https://waze.com/ul/hu8ke2x9ej" target="_blank" className="flex items-center p-2 rounded-md bg-waze">
          <Image
            src="/branding/waze.png"
            height={30}
            width={30}
          />
          <span className="ml-2 text-ui-white font-medium">Open in Waze</span>
        </a>
      </div>}
    </div>
  )
}

export default GoogleMap