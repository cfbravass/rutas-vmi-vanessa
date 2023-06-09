import AuthContextProvider from './contexts/authContext'
import NotifyContextProvider from './contexts/notifyContext'

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import Index from './views/Index'
import Login from './views/Login'
import UbicacionActual from './views/Ubicacion'
import Rutas from './views/Rutas'

function App() {
  return (
    <NotifyContextProvider>
      <AuthContextProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path='/' component={Index} />
            <PrivateRoute exact path='/acceso' component={Login} />
            <PrivateRoute exact path='/rutas' component={Rutas} />
            <PrivateRoute exact path='/ubicacion' component={UbicacionActual} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </AuthContextProvider>
    </NotifyContextProvider>
  )
}

export default App
