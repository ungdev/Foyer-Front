import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'antd'

class SpotifyError extends React.Component {
  goToSpotify = () => {
    window.location.href = `${process.env.REACT_APP_API}/spotify/url`
  }
  render() {
    return (
      <div className='dashboard-spotify'>
        <h1>Spotify</h1>
        <p>Une erreur est survenue</p>
        <Button type='primary' onClick={this.props.goToSpotify}>
          Retour à la page de connexion
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  goToSpotify: () => dispatch(push('/spotify'))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyError)
