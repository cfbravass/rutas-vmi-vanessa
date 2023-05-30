import { useAuth } from '../contexts/authContext'
import { useLocation, Redirect, Route } from 'react-router-dom'

function PrivateRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  const location = useLocation()

  if (path === '/ingresar') {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/ingresar',
        state: { from: path },
      }}
    />
  )
}

export default PrivateRoute
