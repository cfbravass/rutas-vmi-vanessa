import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseApp'
import { toast } from 'react-toastify'

function useVendedores() {
  const [vendedores, setVendedores] = useState([])

  useEffect(() => {
    const obtenerVendedores = async () => {
      try {
        const vendedoresCollection = collection(db, 'vendedores')
        const vendedoresSnapshot = await getDocs(vendedoresCollection)
        const vendedoresData = vendedoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setVendedores(vendedoresData)
      } catch (error) {
        toast.error('Error al obtener la lista de vendedores', {
          position: 'bottom-center',
        })
        console.error(error)
      }
    }

    obtenerVendedores()
  }, [])

  return vendedores
}

export default useVendedores
