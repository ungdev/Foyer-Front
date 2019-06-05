import io from 'socket.io-client'

export const SET_TWEETS = 'socketio/SET_TWEETS'

export const startSocketIO = () => {
  return async dispatch => {
    try {
      let socket = io.connect(process.env.REACT_APP_API.split('/api/')[0])
      socket.on('tweets', tweets => {
        dispatch({ type: SET_TWEETS, payload: tweets })
      })
    } catch (err) {
      console.log(err)
    }
  }
}
