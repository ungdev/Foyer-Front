import { SET_USERS, SET_ADMIN, REMOVE_ADMIN } from '../actions/admin'
import { SET_TOKEN } from '../actions/login'
import { SET_TWEETS } from '../actions/socketio'
import { SET_USER } from '../actions/user'

export const admin = (
  state = {
    users: null
  },
  action
) => {
  let users = null
  switch (action.type) {
    case SET_USERS:
      users = action.users.map(user => {
        return {
          ...user,
          admin: user.permissions.findIndex(u => u === 'admin') !== -1
        }
      })
      return {
        ...state,
        users
      }
    case SET_ADMIN:
      users = state.users.map(user => {
        if (user.id !== action.id) return user
        let { permissions } = user
        if (!permissions) permissions = []
        permissions.push('admin')
        return { ...user, permissions, admin: true }
      })
      return {
        ...state,
        users
      }
    case REMOVE_ADMIN:
      users = state.users.map(user => {
        if (user.id !== action.id) return user
        let { permissions } = user
        permissions = permissions.filter(p => p !== 'admin')
        return { ...user, permissions, admin: false }
      })
      return {
        ...state,
        users
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
    tweets: []
  },
  action
) => {
  switch (action.type) {
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      }
    default:
      return state
  }
}

export const user = (
  state = {
    user: null
  },
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.payload,
          admin: action.payload
            ? action.payload.permissions.findIndex(p => p === 'admin') !== -1
            : false
        }
      }

    default:
      return state
  }
}
