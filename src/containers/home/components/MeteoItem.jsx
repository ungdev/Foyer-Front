import React from 'react'
import '../styles/meteo.css'
import moment from 'moment'

export default props => {
  return (
    <div className='meteo-item'>
      <img src={`https://openweathermap.org/img/w/${props.icon}.png`} alt='' />
      <div className='meteo-temp'>{props.temp}°C</div>
      <div className='meteo-time'>{`À ${moment(props.time).format(
        'HH'
      )}h`}</div>
    </div>
  )
}
