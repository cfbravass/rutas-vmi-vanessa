import { useAuth } from '../contexts/authContext'
import { useLocation, Redirect, Route } from 'react-router-dom'

const PrivateRoute = (props) => {
  const { isAuthenticated } = useAuth()
  const { path } = props
  const location = useLocation()

  if (path === '/acceso') {
    return isAuthenticated() ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }

  return isAuthenticated() ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/acceso',
        state: { from: location.pathname },
      }}
    />
  )
}

export default PrivateRoute
