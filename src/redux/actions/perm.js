import axios from '../../lib/axios'
import { logout } from './login'
import moment from 'moment'

export const SET_PERMS = 'perm/SET_PERMS'
export const ADD_PERM = 'perm/ADD_PERM'
export const EDIT_PERM = 'perm/EDIT_PERM'

export const fetchPerms = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('perms', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_PERMS, perms: res.data })
    } catch (err) {
      console.log(err)
      dispatch(logout())
    }
  }
}

export const createPerm = params => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      console.log(params)
      const res = await axios.post('perms', params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_PERM, perm: res.data })
    } catch (err) {
      console.log(err.response)
      dispatch(logout())
    }
  }
}

export const editPerm = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`perms/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: EDIT_PERM, perm: res.data })
    } catch (err) {
      console.log(err)
      dispatch(logout())
    }
  }
}
export const addAssoToPerm = (id, login) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(
        `perms/${id}/assos`,
        { login },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch({ type: EDIT_PERM, perm: res.data })
    } catch (err) {
      console.log(err)
      dispatch(logout())
    }
  }
}
