import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import { autoLogin } from '../../redux/actions/login'
import { startSocketIO } from '../../redux/actions/socketio'
import asyncComponent from '../../components/async'
import Home from '../home/Home'
import Return from '../login/Return'
import Login from '../login/Login'

const Dashboard = asyncComponent(() => import('../dashboard/Dashboard'))
class App extends React.Component {
  constructor(props) {
    super(props)
    props.autoLogin()
    props.startSocketIO()
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Notifications />
        <Switch>
          <Route
            path={process.env.REACT_APP_BASEURL + 'login'}
            component={Return}
          />
          <Route
            path={process.env.REACT_APP_BASEURL + 'home'}
            component={Home}
          />
          {this.props.token ? (
            <Route
              path={process.env.REACT_APP_BASEURL}
              component={Dashboard}
            />
          ) : (
            <Route
              path={process.env.REACT_APP_BASEURL}
              component={Login}
            />
          )}
          <Redirect from='*' to={process.env.REACT_APP_BASEURL} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  startSocketIO: () => dispatch(startSocketIO())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
