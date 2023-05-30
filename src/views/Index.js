import React from 'react'
import { useAuth } from '../contexts/authContext'

function Index() {
  const { logout } = useAuth()
  return (
    <>
      <h1>Index</h1>
      <button onClick={logout}>Salir</button>
    </>
  )
}

export default Index
