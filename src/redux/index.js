import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import { admin, asso, login, socketio, user, perm } from './reducers/default'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  admin,
  asso,
  login,
  socketio,
  user,
  perm
})
