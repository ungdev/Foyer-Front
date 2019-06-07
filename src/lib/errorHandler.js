import errorToString from './errorToString'
import { actions as notifActions } from 'redux-notifications'

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
  console.log('ERROR :', error.response.data.error)
  dispatch(
    notifActions.notifSend({
      message: errorToString(error.response.data.error),
      kind: 'danger',
      dismissAfter: 2000
    })
  )
}
