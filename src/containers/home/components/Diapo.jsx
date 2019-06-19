import React from 'react'
import { connect } from 'react-redux'
import '../styles/diapo.css'
import { Carousel } from 'antd'

class Diapo extends React.Component {
  render() {
    const { images } = this.props
    return (
      <Carousel dots={false} autoplay autoplaySpeed={5000}>
        {images &&
          images.map((image, index) =>
            typeof image === 'string' ? (
              <div key={index}>
                <div className='carousel-container'>
                  <img src={process.env.REACT_APP_API + image} alt='' />
                </div>
              </div>
            ) : (
              <div key={index}>
                <div className='carousel-container-text'>
                  <h1>{image.title}</h1>
                  {image.text.split('\n').map(t => (
                    <p>{t}</p>
                  ))}
                </div>
              </div>
            )
          )}
      </Carousel>
    )
  }
}

const mapStateToProps = state => ({
  images: state.socketio.diapoImages
})
const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diapo)
