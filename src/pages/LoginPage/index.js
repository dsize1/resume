import React from 'react'
import { connect } from 'react-redux'
import {
  useLocation
} from 'react-router-dom'
import { handleLogin } from '../../actions'

const  LoginPage = ({handleLogin}) => {
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } }
  let login = () => {
    handleLogin({method: 'replace', path: from})
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

const mapDispatchToProps =  {
  handleLogin
}

export default connect(null, mapDispatchToProps)(LoginPage)