import React from 'react'
import { connect } from 'react-redux'
import { editTweet } from '../../../redux/actions/tweet'
import HomeTwitterList from './components/HomeTwitterList'

class AdminHome extends React.Component {
  render() {
    return (
      <div className='admin-container'>
        <HomeTwitterList />
        <div style={{ width: '49%' }}>
          <div style={{ marginTop: '20px' }}>
          </div>
          <div style={{ marginTop: '20px' }}>
          </div>
        </div>
        <div style={{ marginTop: '20px', width: '49%' }}>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  tweets: state.socketio.tweets
})

const mapDispatchToProps = dispatch => ({
  editTweet: (id, params) => dispatch(editTweet(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHome)
