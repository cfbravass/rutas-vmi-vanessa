import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseApp'
import { toast } from 'react-toastify'

function useAlmacenes() {
  const [almacenes, setAlmacenes] = useState([])

  useEffect(() => {
    const obtenerAlmacenes = async () => {
      try {
        const almacenesCollection = collection(db, 'almacenes')
        const almacenesSnapshot = await getDocs(almacenesCollection)
        const almacenesData = almacenesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setAlmacenes(almacenesData)
      } catch (error) {
        toast.error('Error al obtener la lista de almacenes', {
          position: 'bottom-center',
        })
        console.error(error)
      }
    }

    obtenerAlmacenes()
  }, [])

  return almacenes
}

export default useAlmacenes
