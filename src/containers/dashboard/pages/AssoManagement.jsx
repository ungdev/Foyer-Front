import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'

class AssoManagement extends React.Component {
  render() {
    const { login, assos } = this.props
    const asso = assos.find(a => a.login === login)
    return (
      <React.Fragment>
        <Card title={'Association ' + asso.name} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  assos: state.user.assos,
  login: state.routing.location.pathname.split('/assos/')[1]
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoManagement)
