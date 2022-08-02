import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { locations, markerIcon } from '../../constants/locations'

const GoogleMap = () => {
  const googleMapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

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
    <div ref={mapContainerRef} className="w-full max-w-screen">
      <div id="map" ref={googleMapRef} className="h-320px md:h-588px lg:h-600px w-full"/>
    </div>
  )
}

export default GoogleMap