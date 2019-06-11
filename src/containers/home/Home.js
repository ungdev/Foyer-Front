import React from 'react'
import './styles/home.css'
import Logo from './components/Logo'
import { Carousel } from 'antd'

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-left'>
          <div className='home-diapo'>
            <Carousel dots={false}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Carousel>
          </div>
          <div className='home-spotify'>Spotify</div>
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

export default Home
