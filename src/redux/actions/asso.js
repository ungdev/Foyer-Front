import axios from '../../lib/axios'
import errorHandler from '../../lib/errorHandler'
import moment from 'moment'

export const SET_ASSOS = 'asso/SET_ASSOS'

export const fetchAssos = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('assos-all', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_ASSOS, assos: res.data })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
