import React from 'react'
import { Layout, Menu, Icon, Spin } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/login'
import logo from '../../assets/logo.png'
const { Sider } = Layout

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    let current = 'home'
    let openKeys = []
    this.state = { current, openKeys, collapsed: false }
  }

  static getDerivedStateFromProps(props, state) {
    let tab = props.location.split('/')
    if (tab[1] && state.current !== tab[1]) {
      let openKeys = []
      if (tab.length > 2) {
        openKeys.push(tab[2])
      }
      return { current: tab[1], openKeys }
    }
    return null
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    const { user, assos } = this.props
    if (!user || !assos) return <Spin />
    const { admin } = user
    return (
      <Sider breakpoint='lg' collapsedWidth='0' width={250} theme='dark'>
        <Link to={'/'}>
          <img src={logo} style={{ width: '100%' }} alt='' />
        </Link>

        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[this.state.current]}
          defaultOpenKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          <Menu.Item key='home'>
            <Link to={'/'}>
              <Icon type='appstore' />
              <span>Accueil</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='perms'>
            <Link to={'/perms'}>
              <Icon type='appstore' />
              <span>Tableau de perms</span>
            </Link>
          </Menu.Item>

          {/* USER'S ASSOS BUTTONS */}

          {assos.length > 0 && (
            <Menu.SubMenu
              key='assos'
              title={
                <span>
                  <Icon type='team' />
                  <span>Mes associations</span>
                </span>
              }
            >
              {assos.map(asso => (
                <Menu.Item key={'assos/' + asso.login}>
                  <Link to={'/assos/' + asso.login}>
                    <Icon type='global' />
                    <span>{asso.name}</span>
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )}
          {/* ADMIN ONLY BUTTONS */}
          {admin && (
            <Menu.Item key='users'>
              <Link to={'/users'}>
                <Icon type='team' />
                <span>Gestion des utilisateurs</span>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key='logout' onClick={this.props.logout}>
            <Icon type='logout' />
            <span>Se déconnecter</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  assos: state.user.assos,
  location: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar)
