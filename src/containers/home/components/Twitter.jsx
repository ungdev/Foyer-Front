import React from 'react'
import { connect } from 'react-redux'
import '../styles/twitter.css'
import moment from 'moment'

class Twitter extends React.Component {
  render() {
    const tweets = this.props.tweets.filter(m => m.visible)
    return (
      <div className='twitter-container'>
        {tweets.map(tweet => (
          <div className='tweet' key={tweet.id}>
            <div className='tweet-header'>
              <span className='tweet-username'>{tweet.userName}</span>
              <span className='tweet-from'>
                @{tweet.user} - {moment(tweet.createdAt).format('HH:mm')}
              </span>
            </div>

            <span className='tweet-text'>
              {tweet.text.length > 100
                ? tweet.text.substr(0, 100) + '...'
                : tweet.text}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tweets: state.socketio.tweets
})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Twitter)
