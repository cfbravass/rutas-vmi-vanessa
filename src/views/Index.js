import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import ProgramarRuta from '../components/ProgramarRuta'

function Index() {
  const { logout } = useAuth()
  return (
    <>
      <h1>Index</h1>
      <button onClick={logout}>Salir</button>
      <br />
      <br />
      <ProgramarRuta />
      <Link to='/rutas' className='btn btn-primary'>
        Mis Rutas
      </Link>
    </>
  )
}

export default Index
