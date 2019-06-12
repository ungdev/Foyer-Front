import io from 'socket.io-client'
import errorHandler from '../../lib/errorHandler'

export const SET_TWEETS = 'socketio/SET_TWEETS'
export const SET_DIAPO_IMAGES = 'socketio/SET_DIAPO_IMAGES'

export const startSocketIO = () => {
  return async dispatch => {
    try {
      let socket = io.connect(process.env.REACT_APP_API.split('/api/v1')[0], {
        path: '/api/socket.io'
      })
      socket.on('tweets', tweets => {
        dispatch({ type: SET_TWEETS, payload: tweets })
      })
      socket.on('diapoImages', images => {
        dispatch({ type: SET_DIAPO_IMAGES, images: images })
      })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
