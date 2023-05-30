import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function Mapa({ latitude, longitude }) {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapContainerRef.current).setView(
      [latitude, longitude],
      12
    )
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)
    L.marker([latitude, longitude]).addTo(map)
  }, [latitude, longitude])

  return <div ref={mapContainerRef} style={{ height: '400px' }} />
}

export default Mapa
