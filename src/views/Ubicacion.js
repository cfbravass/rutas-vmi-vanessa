import React, { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  serverTimestamp,
  GeoPoint,
} from 'firebase/firestore'
import { db } from '../firebaseApp'
import Mapa from '../components/Mapa'
import { useAuth } from '../contexts/authContext'

function UbicacionActual() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const { currentUser } = useAuth()

  const handleGuardarUbicacion = () => {
    const ubicacionData = {
      ubicacion: new GeoPoint(latitude, longitude),
      timestamp: serverTimestamp(),
    }

    addDoc(collection(db, 'rutas'), ubicacionData)
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

  useEffect(() => {
    handleObtenerUbicacionActual()
  }, [])

  return (
    <div>
      <h2>Ubicación Actual del Usuario {currentUser.uid}</h2>
      <p>Latitud: {latitude}</p>
      <p>Longitud: {longitude}</p>
      <Mapa latitude={latitude} longitude={longitude} />
      <button onClick={handleObtenerUbicacionActual}>
        Obtener Ubicación Actual
      </button>
      <button onClick={handleGuardarUbicacion}>Guardar Ubicación</button>
      <button
        onClick={() => {
          setLatitude(prompt('Latitud:'))
          setLongitude(prompt('Longitud:'))
        }}
      >
        Cambiar Ubicación
      </button>
    </div>
  )
}

export default UbicacionActual
