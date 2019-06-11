import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/logo-foyer.png'
import '../styles/logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className='logo-container'>
        <img src={logo} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo)
