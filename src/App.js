import AuthContextProvider from './contexts/authContext'
import NotifyContextProvider from './contexts/notifyContext'

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import Index from './views/Index'
import Login from './views/Login'
import UbicacionActual from './views/Ubicacion'

function App() {
  return (
    <NotifyContextProvider>
      <AuthContextProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Index} />
            <PrivateRoute exact path='/ingresar' component={Login} />
            <PrivateRoute exact path='/ubicacion' component={UbicacionActual} />
            <Redirect to='/a' />
          </Switch>
        </Router>
      </AuthContextProvider>
    </NotifyContextProvider>
  )
}

export default App
