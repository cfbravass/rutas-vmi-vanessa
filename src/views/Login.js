import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

import { toast } from 'react-toastify'

function Login() {
  document.title = 'Ingresar - Rutas VMI'
  const history = useHistory()
  const location = useLocation()
  const { login } = useAuth()

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleRedirectOrBack = () => {
    history.replace(location.state?.from ?? '/')
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const id = toast.loading('Iniciando sesión...', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    try {
      const user = await login(email, password)

      if (user) {
        toast.update(id, {
          render: 'Ingresaste correctamente',
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          hideProgressBar: true,
          isLoading: false,
          pauseOnHover: false,
        })
        handleRedirectOrBack()
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.update(id, {
          render: 'No existe un usuario con ese correo',
          type: toast.TYPE.ERROR,
          hideProgressBar: true,
          autoClose: 3000,
          isLoading: false,
          pauseOnHover: false,
        })
      } else if (error.code === 'auth/wrong-password') {
        toast.update(id, {
          render: 'Contraseña incorrecta',
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          hideProgressBar: true,
          isLoading: false,
          pauseOnHover: false,
        })
      } else {
        toast.update(id, {
          render: 'Error al intentar iniciar sesión',
          type: toast.TYPE.ERROR,
          hideProgressBar: true,
          autoClose: 3000,
          isLoading: false,
          pauseOnHover: false,
        })
      }
    }
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='name@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'>Correo:</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='Contraseña...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='password'>Contraseña:</label>
        </div>

        <button type='button' onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
