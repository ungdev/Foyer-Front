import axios from '../../lib/axios'
import moment from 'moment'
import errorHandler from '../../lib/errorHandler'


export const deleteTempImage = name => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(
        `images/temp/${name}`,
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
