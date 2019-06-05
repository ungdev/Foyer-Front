import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Layout from './layout'
import DashboardHome from './pages/DashboardHome'
import UsersManagement from './pages/UserManagement'

const baseUrl = process.env.REACT_APP_BASEURL

class Dashboard extends React.Component {
  render() {
    if (!this.props.user) return <Spin />
    const { admin } = this.props.user
    const component = (
      <Switch>
        <Route path={baseUrl} exact component={DashboardHome} />

        {/* ADMIN ONLY ROUTES */}
        {admin && (
          <React.Fragment>
            <Route
              path={baseUrl + '/users'}
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
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
