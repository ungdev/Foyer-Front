import React from 'react'
import { connect } from 'react-redux'
import { Popover } from 'antd'
import { push } from 'react-router-redux'

class PermPopover extends React.Component {
  goToPerm = () => this.props.goToPerm(this.props.creneau)
  getOrgas = () => {
    const { orgas } = this.props.perm
    if (!orgas || orgas.length === 0) return null
    return orgas.map(orga => orga.name).join(' ')
  }

  render() {
    const content = (
      <div>
        <p>Content</p>
      </div>
    )
    console.log(this.props.creneau)
    const name = this.props.perm.name || this.getOrgas() || ''
    return (
      <Popover content={content} title={name} trigger='hover'>
        <a onClick={this.goToPerm}>{name}</a>
      </Popover>
    )
  }
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  goToPerm: creneau => dispatch(push('/perms/' + creneau))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermPopover)
