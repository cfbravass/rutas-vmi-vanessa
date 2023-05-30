import AuthContextProvider from './contexts/authContext'
import NotifyContextProvider from './contexts/notifyContext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

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
            <Route path='/' component={UbicacionActual} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </NotifyContextProvider>
  )
}

export default App
