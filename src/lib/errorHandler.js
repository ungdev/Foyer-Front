import errorToString from './errorToString'
import { actions as notifActions } from 'redux-notifications'

export default (error, dispatch) => {
  dispatch(
    notifActions.notifSend({
      message: errorToString(error.response.data.error),
      kind: 'danger',
      dismissAfter: 2000
    })
  )
}
