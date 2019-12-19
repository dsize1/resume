import React from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ isLogin, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin
  }
}

export default connect(mapStateToProps)(PrivateRoute)