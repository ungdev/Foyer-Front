import axios from '../../lib/axios'
import { logout } from './login'
import moment from 'moment'

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
      console.log(err)
      dispatch(logout())
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
    } catch (err) {
      console.log(err)
      dispatch(logout())
    }
  }
}
