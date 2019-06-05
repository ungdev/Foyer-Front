import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Layout from './layout'
import DashboardHome from './pages/DashboardHome'
import UsersManagement from './pages/UserManagement'
import AssoManagement from './pages/AssoManagement'

const baseUrl = process.env.REACT_APP_BASEURL

class Dashboard extends React.Component {
  render() {
    const { assos, user } = this.props
    if (!user || !assos) return <Spin />
    const { admin } = user
    const component = (
      <Switch>
        <Route path={baseUrl} exact component={DashboardHome} />

        {/* ASSOS ROUTES */}
        {assos.length > 0 && (
          <Route path={baseUrl + 'assos/:login'} component={AssoManagement} />
        )}
        {/* ADMIN ONLY ROUTES */}
        {admin && (
          <React.Fragment>
            <Route
              path={baseUrl + 'users'}
              exact
              component={UsersManagement}
            />
          </React.Fragment>
        )}

        <Redirect from='*' to={baseUrl} />
      </Switch>
    )

    return <Layout component={component} />
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  assos: state.user.assos
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
