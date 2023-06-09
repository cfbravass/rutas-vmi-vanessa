import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

import { toast } from 'react-toastify'

function Login() {
  document.title = 'Ingresar - Rutas VMI Vanessa'
  const history = useHistory()
  const location = useLocation()
  const { login, register } = useAuth()

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

  const handleRegister = async (e) => {
    e.preventDefault()

    const id = toast.loading('Creando cuenta...', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    try {
      const user = await register(email, password)

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
      toast.update(id, {
        render: `Error al intentar crear cuenta: ${error.code}`,
        type: toast.TYPE.ERROR,
        hideProgressBar: true,
        autoClose: 3000,
        isLoading: false,
        pauseOnHover: false,
      })
    }
  }

  return (
    <div className='text-center'>
      <h2>Acceso a Rutas VMI Vanessa</h2>
      <form>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            placeholder='correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='email'>
            <sup className='text-danger'>*</sup>Correo:
          </label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='password'
            placeholder='contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor='password'>
            <sup className='text-danger'>*</sup>Contraseña:
          </label>
        </div>

        <button
          type='button'
          onClick={handleLogin}
          className='btn btn-outline-info me-2 my-2'
        >
          Iniciar Sesión
        </button>
        <button
          type='button'
          onClick={handleRegister}
          className='btn btn-outline-info my-2'
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  )
}

export default Login
