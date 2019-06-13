import React from 'react'
import { connect } from 'react-redux'
import '../styles/meteo.css'

class Meteo extends React.Component {
  render() {
    return <div className='meteo-container'>meteo</div>
  }
}

const mapStateToProps = state => ({
  logos: state.socketio.logos
})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meteo)
