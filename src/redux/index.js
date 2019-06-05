import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import { admin, login, socketio, user } from './reducers/default'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  admin,
  login,
  socketio,
  user
})
