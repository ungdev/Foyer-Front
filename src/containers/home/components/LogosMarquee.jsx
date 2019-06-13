import React from 'react'
import { connect } from 'react-redux'
import { fetchLogos } from '../../../redux/actions/asso'
import Marquee from '../../../components/Marquee'
import '../styles/logo-marquee.css'

class Logo extends React.Component {
  constructor(props) {
    super(props)
    props.fetchLogos()
  }
  render() {
    const { logos } = this.props
    return (
      <div className='logo-marquee-container'>
        <Marquee>
          {logos.map((logo, index) => (
            <div key={index}>
              <img src={'https://etu.utt.fr' + logo} alt='' />
            </div>
          ))}
        </Marquee>
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
