import io from 'socket.io-client'
import errorHandler from '../../lib/errorHandler'

export const SET_TWEETS = 'socketio/SET_TWEETS'
export const SET_DIAPO_IMAGES = 'socketio/SET_DIAPO_IMAGES'
export const SET_SPOTIFY = 'socketio/SET_SPOTIFY'
export const SET_ASSO_LOGOS = 'socketio/SET_ASSO_LOGOS'
export const SET_WEATHER = 'socketio/SET_WEATHER'

export const startSocketIO = () => {
  return async dispatch => {
    try {
      let socket = io.connect(process.env.REACT_APP_API.split('/api/v1')[0], {
        path: '/api/socket.io'
      })
      socket.on('tweets', tweets => {
        dispatch({ type: SET_TWEETS, tweets })
      })
      socket.on('diapoImages', images => {
        dispatch({ type: SET_DIAPO_IMAGES, images })
      })
      socket.on('logos', logos => {
        dispatch({ type: SET_ASSO_LOGOS, logos })
      })
      socket.on('spotify', song => {
        dispatch({ type: SET_SPOTIFY, song })
      })
      socket.on('weather', weather => {
        dispatch({ type: SET_WEATHER, weather })
      })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
