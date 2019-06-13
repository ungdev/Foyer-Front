import React from 'react'
import { connect } from 'react-redux'
import './styles/home.css'
import Logo from './components/Logo'
import Diapo from './components/Diapo'
import Spotify from './components/Spotify'
import LogosMarquee from './components/LogosMarquee'

class Home extends React.Component {
  render() {
    const { song } = this.props
    return (
      <div className='home'>
        <div className='home-left'>
          <div className='home-diapo'>
            <Diapo />
          </div>
          <div className='home-spotify'>
            {song && song.is_playing ? <Spotify /> : <LogosMarquee />}
          </div>
        </div>
        <div className='home-right'>
          <div className='home-meteo'>meteo</div>
          <div className='home-logo'>
            <Logo />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  song: state.socketio.spotify
})
export default connect(
  mapStateToProps,
  null
)(Home)
