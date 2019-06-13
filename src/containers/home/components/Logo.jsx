import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/logo-foyer.png'
import { Carousel } from 'antd'
import '../styles/logo.css'
import { fetchLogos } from '../../../redux/actions/asso'

class Logo extends React.Component {
  constructor(props) {
    super(props)
    props.fetchLogos()
  }
  render() {
    const { logos } = this.props
    return (
      <div className='logo-container'>
        <Carousel dots={false} autoplay>
          {logos &&
            logos.map((logo, index) => (
              <div key={index}>
                <div className='carousel-container'>
                  <img src={'https://etu.utt.fr' + logo} alt='' />
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  logos: state.asso.logos
})
const mapDispatchToProps = dispatch => ({
  fetchLogos: () => dispatch(fetchLogos())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo)
