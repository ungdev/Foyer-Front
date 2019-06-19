import React from 'react'
import { connect } from 'react-redux'
import { Carousel } from 'antd'
import '../styles/logo.css'
import { fetchLogos } from '../../../redux/actions/asso'

class Logo extends React.Component {
  constructor(props) {
    super(props)
    props.fetchLogos()
  }
  render() {
    let { logos } = this.props
    return (
      <div className='logo-container'>
        <Carousel dots={false} autoplay>
          {logos &&
            logos.map((logo, index) => (
              <div key={index}>
                <div className='logo-carousel-container'>
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
  logos: state.socketio.logos
})
const mapDispatchToProps = dispatch => ({
  fetchLogos: () => dispatch(fetchLogos())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logo)
