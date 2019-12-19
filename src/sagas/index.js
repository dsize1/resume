import { take, put, call, fork, select } from 'redux-saga/effects'
import { $post } from '../api'
import { LOGIN, LOGOUT } from '../actions'
// import {} from '../reducers/selectors'

export function* login() {
  
}

export function* logout() {

}

export default function* root() {
  yield fork(login)
  yield fork(logout)
}