import React from 'react'
import { connect } from 'react-redux'
import { saveToken } from '../../redux/actions/login'
import { Button } from 'antd'
import './login.css'

class Login extends React.Component {
  login = () => {
    window.location = `${process.env.REACT_APP_API}/etuutt/url`
  }
  render() {
    return (
      <div className='login-container'>
        <Button size='large' type='primary' onClick={this.login}>
          Se connecter avec le site etu
        </Button>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  saveToken: token => dispatch(saveToken(token))
})

export default connect(
  null,
  mapDispatchToProps
)(Login)
