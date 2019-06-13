import { SET_USERS, SET_ADMIN, REMOVE_ADMIN } from '../actions/admin'
import { SET_TOKEN } from '../actions/login'
import {
  SET_TWEETS,
  SET_DIAPO_IMAGES,
  SET_SPOTIFY,
  SET_ASSO_LOGOS,
  SET_WEATHER
} from '../actions/socketio'
import { SET_USER, SET_USER_ASSOS, SET_ETUS } from '../actions/user'
import { SET_ASSOS, UPDATE_ASSO, SET_LOGOS } from '../actions/asso'
import { SET_PERMS, ADD_PERM, EDIT_PERM } from '../actions/perm'

export const admin = (
  state = {
    users: null
  },
  action
) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case SET_ADMIN:
      return {
        ...state,
        users: action.users
      }
    case REMOVE_ADMIN:
      return {
        ...state,
        users: action.users
      }

    default:
      return state
  }
}

export const login = (
  state = {
    token: null
  },
  action
) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export const socketio = (
  state = {
    tweets: [],
    diapoImages: [],
    weather: []
  },
  action
) => {
  switch (action.type) {
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.tweets
      }
    case SET_DIAPO_IMAGES:
      return {
        ...state,
        diapoImages: action.images
      }
    case SET_SPOTIFY:
      return {
        ...state,
        spotify: action.song
      }
    case SET_ASSO_LOGOS:
      return {
        ...state,
        logos: action.logos
      }
    case SET_WEATHER:
      return {
        ...state,
        weather: action.weather
      }
    default:
      return state
  }
}

export const user = (
  state = {
    user: null,
    assos: [],
    etus: []
  },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case SET_USER_ASSOS:
      return {
        ...state,
        assos: action.assos
      }
    case SET_ETUS:
      return {
        ...state,
        etus: action.etus
      }
    default:
      return state
  }
}
export const asso = (
  state = {
    assos: [],
    logos: []
  },
  action
) => {
  switch (action.type) {
    case SET_ASSOS:
      return {
        ...state,
        assos: action.assos
      }
    case UPDATE_ASSO:
      return {
        ...state,
        assos: action.assos
      }
    case SET_LOGOS:
      return {
        ...state,
        logos: action.logos
      }
    default:
      return state
  }
}

export const perm = (
  state = {
    perms: []
  },
  action
) => {
  switch (action.type) {
    case SET_PERMS:
      return {
        ...state,
        perms: action.perms
      }
    case ADD_PERM:
      return { ...state, perms: [...state.perms, action.perm] }
    case EDIT_PERM:
      return {
        ...state,
        perms: action.perms
      }
    default:
      return state
  }
}
