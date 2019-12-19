import React from 'react'
import { connect } from 'react-redux'
import { handleLogout } from '../../actions'


const Logout = ({isLogin, handleLogout}) => {
  return isLogin ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          handleLogout({method: 'push', path: '/'})
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin
  }
}

const mapDispatchToProps =  {
  handleLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)