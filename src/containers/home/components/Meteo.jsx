import React from 'react'
import { connect } from 'react-redux'
import '../styles/meteo.css'
import MeteoItem from './MeteoItem'

class Meteo extends React.Component {
  render() {
    console.log('WEATHER', this.props.weather)
    if (!this.props.weather || this.props.weather.length === 0) return null

    const [first, second, third] = this.props.weather
    return (
      <div className='meteo-container'>
        <div className='meteo-top big'>
          <MeteoItem
            icon={first.weather[0].icon}
            temp={Math.floor(first.temp)}
            time={first.time}
          />
        </div>
        <div className='meteo-bottom'>
          <div className='meteo-left'>
            <MeteoItem
              icon={second.weather[0].icon}
              temp={Math.floor(second.temp)}
              time={second.time}
            />
          </div>
          <div className='meteo-right'>
            <MeteoItem
              icon={third.weather[0].icon}
              temp={Math.floor(third.temp)}
              time={third.time}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  weather: state.socketio.weather
})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meteo)
