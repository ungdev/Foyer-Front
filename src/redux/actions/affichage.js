import axios from '../../lib/axios'
import errorHandler from '../../lib/errorHandler'
import moment from 'moment'

export const SET_AFFICHAGES = 'affichage/SET_AFFICHAGES'
export const ADD_AFFICHAGE = 'affichage/ADD_AFFICHAGE'
export const EDIT_AFFICHAGE = 'affichage/EDIT_AFFICHAGE'

export const fetchAffichages = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('affichages', {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: SET_AFFICHAGES, affichages: res.data })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const createAffichage = (params, assoId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(`assos/${assoId}/affichages`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch({ type: ADD_AFFICHAGE, affichage: res.data })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const addPermToAffichage = (affichageId, permId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.post(
        `perms/${permId}/affichages`,
        { affichageId },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )

      const { perms } = getState().perm
      const perm = perms.find(p => p.id === permId)
      const affichages = getState().affichage.affichages.slice()
      const index = affichages.findIndex(a => a.id === affichageId)
      if (!affichages[index].perms) affichages[index].perms = []
      affichages[index].perms.push(perm)
      dispatch({ type: EDIT_AFFICHAGE, affichages })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const deletePermFromAffichage = (affichageId, permId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.delete(`perms/${permId}/affichages/${affichageId}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      const affichages = getState().affichage.affichages.slice()
      const index = affichages.findIndex(a => a.id === affichageId)
      if (!affichages[index].perms) affichages[index].perms = []
      affichages[index].perms = affichages[index].perms.filter(
        p => p.id !== permId
      )
      dispatch({ type: EDIT_AFFICHAGE, affichages })
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const editAffichage = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`affichages/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch(editAffichageAction(getState(), res.data))
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const deleteAffichage = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.delete(`affichages/${id}`, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch(deleteAffichageAction(getState(), id))
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

const editAffichageAction = (state, affichage) => {
  const affichages = state.affichage.affichages.slice()
  const index = affichages.findIndex(a => a.id === affichage.id)
  affichages[index] = affichage
  return { type: EDIT_AFFICHAGE, affichages }
}
const deleteAffichageAction = (state, id) => {
  const affichages = state.affichage.affichages.filter(a => a.id !== id)
  return { type: EDIT_AFFICHAGE, affichages }
}
