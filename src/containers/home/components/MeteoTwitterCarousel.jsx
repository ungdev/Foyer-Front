import React from 'react'
import { Carousel } from 'antd'
import Meteo from './Meteo'
import Twitter from './Twitter'

class MeteoTwitterCarousel extends React.PureComponent {
  render() {
    return (
      <div className='meteo-twitter-container'>
        <Carousel dots={false} autoplay fade autoplaySpeed={10000}>
          <div>
            <Twitter />
          </div>
          <div>
            <Meteo />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default MeteoTwitterCarousel
