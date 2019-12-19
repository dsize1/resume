export const LOGOUT = 'logout'
export const LOGIN = 'login'

export const handleLogout = (payload) => {
  return {
    type: LOGOUT,
    payload
  }
}

export const handleLogin = (payload) => {
  return {
    type: LOGIN,
    payload
  }
}