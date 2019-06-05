import { push } from 'react-router-redux'
import { fetchUser, SET_USER } from './user'

export const SET_TOKEN = 'login/SET_TOKEN'

export const autoLogin = () => {
  return async dispatch => {
    if (localStorage.hasOwnProperty('foyer-token')) {
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('foyer-token')
      })

      return dispatch(fetchUser())
    } else {
      return dispatch(logout())
    }
  }
}

export const saveToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: token
    })

    localStorage.setItem('foyer-token', token)
    dispatch(fetchUser())
    dispatch(push('/'))
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: SET_TOKEN, payload: null })
    dispatch({ type: SET_USER, payload: null })

    localStorage.removeItem('foyer-token')
  }
}
