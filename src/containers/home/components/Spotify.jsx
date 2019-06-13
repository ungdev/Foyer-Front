import React from 'react'
import { connect } from 'react-redux'
import '../styles/spotify.css'
import ProgressBar from './ProgressBar'

class Spotify extends React.Component {
  render() {
    const { song } = this.props
    if (!song) return null
    const image = song.item.album.images[0].url
    const songName = song.item.name
    const artists = song.item.artists.map(artist => artist.name).join(', ')
    return (
      <div className='spotify-container'>
        <div className='spotify-logo'>
          <img src={image} alt='' />
        </div>
        <div className='spotify-infos'>
          <div className='spotify-song'><b>{songName}</b> - {artists}</div>
          <ProgressBar
            time={Math.floor(song.progress_ms / 1000)}
            totalTime={Math.floor(song.item.duration_ms / 1000)}
            isPlaying={song.is_playing}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  song: state.socketio.spotify
})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spotify)
