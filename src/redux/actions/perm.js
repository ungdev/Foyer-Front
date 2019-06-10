import axios from '../../lib/axios'
import errorHandler from '../../lib/errorHandler'
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
      errorHandler(err, dispatch)
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
      const res = await axios.post('perms', params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_PERM, perm: res.data })
    } catch (err) {
      errorHandler(err, dispatch)
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
      dispatch(editPermAction(getState(), res.data))
    } catch (err) {
      errorHandler(err, dispatch)
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
      await axios.post(
        `perms/${id}/assos`,
        { login },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      const { assos } = getState().asso
      const asso = assos.find(a => a.login === login)
      const perms = getState().perm.perms.slice()
      const index = perms.findIndex(p => p.id === id)
      if(!perms[index].orgas) perms[index].orgas = []
      perms[index].orgas.push(asso)
      dispatch({ type: EDIT_PERM, perms })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

const editPermAction = (state, perm) => {
  const perms = state.perm.perms.slice()
  const index = perms.findIndex(p => p.id === perm.id)
  perms[index] = perm
  return { type: EDIT_PERM, perms }
}
