import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

class SpotifyManagement extends React.Component {
  goToSpotify = () => {
    window.location.href = `${process.env.REACT_APP_API}/spotify/url`
  }
  render() {
    return (
      <div className='dashboard-spotify'>
        <h1>Spotify</h1>
        <p>
          Dans le cas où le token spotify expire, reconnecter le compte spotify
          du foyer ici. Attention le compte utilisé ici sera celui qui
          s'affichera à l'écran !
        </p>
        <Button type='primary' onClick={this.goToSpotify}>
          Connecter le compte spotify
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  null
)(SpotifyManagement)
