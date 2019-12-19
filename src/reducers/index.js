import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from '../actions'

function auth(state = {isLogin: false}, action) {
  switch (action.type) {
    case LOGIN:
      return {isLogin: true}
    case LOGOUT:
      return {isLogin: false}
    default: 
      return state
  }
}

function reducer2(state = {}, action) {
  return state
}

const rootReducer = combineReducers({
  auth,
  reducer2,
})

export default rootReducer

// function selectedReddit(state = 'reactjs', action) {
//   switch (action.type) {
//     case SELECT_REDDIT:
//       return action.reddit
//     default:
//       return state
//   }
// }

// function posts(
//   state = {
//     isFetching: false,
//     items: [],
//   },
//   action,
// ) {
//   switch (action.type) {
//     case REQUEST_POSTS:
//       return { ...state, isFetching: true }

//     case RECEIVE_POSTS:
//       return {
//         ...state,
//         isFetching: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt,
//       }
//     default:
//       return state
//   }
// }

// function postsByReddit(state = {}, action) {
//   switch (action.type) {
//     case REQUEST_POSTS:
//     case RECEIVE_POSTS:
//       return {
//         ...state,
//         [action.reddit]: posts(state[action.reddit], action),
//       }
//     default:
//       return state
//   }
// }

// const rootReducer = combineReducers({
//   postsByReddit,
//   selectedReddit,
// })