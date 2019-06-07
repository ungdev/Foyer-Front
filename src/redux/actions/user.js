import axios from '../../lib/axios'
import errorHandler from '../../lib/errorHandler'
import moment from 'moment'
import { fetchAllAssos } from './asso'

export const SET_USER = 'user/SET_USER'
export const SET_USER_ASSOS = 'user/SET_USER_ASSOS'

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('user', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_USER, user: res.data })
      dispatch(fetchAssos())
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
export const fetchAssos = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('assos', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_USER_ASSOS, assos: res.data })
      dispatch(fetchAllAssos())
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
