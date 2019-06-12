import React from 'react'
import './styles/home.css'
import Logo from './components/Logo'
import Diapo from './components/Diapo'

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-left'>
          <div className='home-diapo'>
            <Diapo/>
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
