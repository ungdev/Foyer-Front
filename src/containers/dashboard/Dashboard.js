import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Layout from './layout'
import DashboardHome from './pages/DashboardHome'
import Permanences from './pages/Permanences'
import PermanencesDetails from './pages/PermanencesDetails'
import UsersManagement from './pages/UserManagement'
import AssoManagement from './pages/AssoManagement'
import OrgasManagement from './pages/OrgasManagement'
import SpotifyManagement from './pages/SpotifyManagement'
import SpotifyError from './pages/SpotifyError'

const baseUrl = process.env.REACT_APP_BASEURL

class Dashboard extends React.Component {
  render() {
    const { assos, user } = this.props
    if (!user || !assos) return <Spin />
    const { admin } = user
    const component = (
      <Switch>
        <Route path={baseUrl} exact component={DashboardHome} />
        <Route path={baseUrl + 'perms'} exact component={Permanences} />
        <Route path={baseUrl + 'perms/:creneau'} component={PermanencesDetails} />

        {/* ASSOS ROUTES */}
        {assos.length > 0 && (
          <Route path={baseUrl + 'assos/:login'} exact component={AssoManagement} />
        )}
        {/* ADMIN ONLY ROUTES */}
        {admin && (
          <React.Fragment>
            <Route path={baseUrl + 'users'} exact component={UsersManagement} />
            <Route path={baseUrl + 'orgas'} exact component={OrgasManagement} />
            <Route path={baseUrl + 'spotify'} exact component={SpotifyManagement} />
            <Route path={baseUrl + 'spotify/error'} exact component={SpotifyError} />
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
