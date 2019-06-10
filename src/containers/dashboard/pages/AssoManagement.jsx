import React from 'react'
import { Card, Avatar, Spin } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './styles/asso.css'
import DiapoImage from './components/DiapoImage'

class AssoManagement extends React.Component {
  addImage = image => this.setState({ image })
  render() {
    const { login, assos, allasso } = this.props
    const isInAsso = assos.find(a => a.login === login)
    if (!isInAsso) return <Redirect to='/' />
    const asso = allasso.find(a => a.login === login)
    console.log('asso:', asso)
    if (!asso) return <Spin />
    return (
      <React.Fragment>
        <Card
          title={
            <div className='asso-card-title'>
              <Avatar
                size={150}
                shape='square'
                src={`${process.env.REACT_APP_API}/assos/${asso.id}/image`}
              />
              <span>{asso.name}</span>
              <div style={{ width: '150px' }} />
            </div>
          }
        >
          <p>{asso.descriptionShort}</p>
        </Card>
        <DiapoImage asso={asso} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  assos: state.user.assos,
  allasso: state.asso.assos,
  login: state.routing.location.pathname.split('/assos/')[1]
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoManagement)
