import errorToString from './errorToString'
import { actions as notifActions } from 'redux-notifications'
import { logout } from '../redux/actions/login'

export default (error, dispatch) => {
  if (!error || !error.response) {
    console.log('ERROR :', error)
    dispatch(
      notifActions.notifSend({
        message: errorToString(error),
        kind: 'danger',
        dismissAfter: 2000
      })
    )
    return
  }
  console.log('BASE ERROR :', error)
  console.log('error.response :', error.response)
  console.log('error.response.data :', error.response.data)
  console.log('error.response.data.error :', error.response.data.error)
  dispatch(
    notifActions.notifSend({
      message: errorToString(error.response.data.error),
      kind: 'danger',
      dismissAfter: 2000
    })
  )
  if (error.response.data.error === 'expired_token') {
    dispatch(logout())
  }
}
