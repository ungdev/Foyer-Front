import React from 'react'
import { connect } from 'react-redux'
import AdminHome from './AdminHome'

class DashboardHome extends React.Component {
  render() {
    const { admin } = this.props.user
    if (admin) return <AdminHome />
    return (
      <div className='home-container'>
        <h1>Vous n'êtes pas administrateur</h1>
        <p>
          Vous pouvez demander à avoir accès aux droits en appuyant sur ce
          boutton :
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(
  mapStateToProps,
  null
)(DashboardHome)
