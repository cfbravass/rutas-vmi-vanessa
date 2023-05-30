import React, { useState } from 'react'
import { doc, setDoc, serverTimestamp, GeoPoint } from 'firebase/firestore'
import { db } from '../firebaseApp'
import Mapa from '../components/Mapa'

function UbicacionActual() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const handleGuardarUbicacion = () => {
    const rutaId = 'rutaId' // ID de la ruta a la que se va a asignar la ubicación
    const ubicacionData = {
      ubicacion: new GeoPoint(latitude, longitude),
      timestamp: serverTimestamp(),
    }

    setDoc(doc(db, 'rutas', rutaId), ubicacionData)
      .then(() => {
        console.log('Ubicación guardada exitosamente')
      })
      .catch((error) => {
        console.error('Error al guardar la ubicación', error)
      })
  }

  const handleObtenerUbicacionActual = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (error) => {
          console.error('Error al obtener la ubicación', error)
        }
      )
    } else {
      console.error('La geolocalización no es compatible con este navegador')
    }
  }

  return (
    <div>
      <h2>Ubicación Actual</h2>
      <p>Latitud: {latitude}</p>
      <p>Longitud: {longitude}</p>
      {latitude && longitude && (
        <Mapa latitude={latitude} longitude={longitude} />
      )}
      <button onClick={handleObtenerUbicacionActual}>
        Obtener Ubicación Actual
      </button>
      <button onClick={handleGuardarUbicacion}>Guardar Ubicación</button>
      <button onClick={(e) => setLatitude(latitude + 1)}>+</button>
    </div>
  )
}

export default UbicacionActual
