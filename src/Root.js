import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom"
import Logout from './pages/Logout'
import PublicPage from './pages/PublicPage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './pages/PrivateRoute'
import ProtectedPage from './pages/ProtectedPage'

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <Logout />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  </Provider>
)

export default Root