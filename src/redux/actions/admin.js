import axios from '../../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorHandler from '../../lib/errorHandler'

export const SET_USERS = 'admin/SET_USERS'
export const SET_ADMIN = 'admin/SET_ADMIN'
export const REMOVE_ADMIN = 'admin/REMOVE_ADMIN'

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('users', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_USERS, users: res.data })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const setAdmin = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.post(
        `users/${id}/admin`,
        {},
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch({ type: SET_ADMIN, id })

      dispatch(
        notifActions.notifSend({
          message: 'Cette personne est maintenant administrateur',
          dismissAfter: 2000
        })
      )
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const removeAdmin = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`users/${id}/admin`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: REMOVE_ADMIN, id })

      dispatch(
        notifActions.notifSend({
          message: "Cette personne n'est plus administrateur",
          kind: 'warning',
          dismissAfter: 2000
        })
      )
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}
