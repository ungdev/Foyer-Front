import axios from '../../lib/axios'
import errorHandler from '../../lib/errorHandler'
import moment from 'moment'

export const SET_ASSOS = 'asso/SET_ASSOS'
export const UPDATE_ASSO = 'asso/UPDATE_ASSO'

export const fetchAllAssos = () => {
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

export const addImageToAsso = (id, image) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(
        `/assos/${id}`,
        { diapoImage: image },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch(updateAsso(getState(), res.data))
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

export const deleteImageToAsso = id => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(
        `/assos/${id}`,
        { diapoImage: '' },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Date': moment().format()
          }
        }
      )
      dispatch(updateAsso(getState(), res.data))
    } catch (err) {
      errorHandler(err, dispatch)
    }
  }
}

const updateAsso = (state, asso) => {
  const assos = state.asso.assos.slice()
  const index = assos.findIndex(a => a.id === asso.id)
  assos[index] = asso
  return { type: UPDATE_ASSO, assos }
}
