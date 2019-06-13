import React from 'react'
import { connect } from 'react-redux'
import {
  fetchPerms,
  addAssoToPerm,
  addEtuToPerm,
  deleteAssoFromPerm,
  deleteEtuFromPerm
} from '../../../redux/actions/perm'
import { push } from 'react-router-redux'
import { Button, Spin, Divider, List, Avatar, Skeleton } from 'antd'
import PermDrawer from './components/PermDrawer'
import AssosModal from './components/AssosModal'
import EtusModal from './components/EtusModal'

class PermanencesDetails extends React.Component {
  constructor(props) {
    super(props)
    props.fetchPerms()
    this.state = {
      createDrawerVisible: false,
      assoModalVisible: false,
      etuModalVisible: false
    }
  }
  static getDerivedStateFromProps(nextProps, nextState) {
    const { perms, location } = nextProps
    if (!perms || !location.pathname) return null
    const creneau = location.pathname.split('/perms/')[1]
    if (!creneau) return null
    const [day, hours] = creneau.split(' ')
    const [start, end] = hours.split('/')
    const perm = perms.find(
      p => p.start === start && p.end === end && p.day === day
    )
    if (!nextState.perm) {
      return { ...nextState, perm }
    }
    if (perm.assos && !nextState.perm.assos) return { ...nextState, perm }
    if (perm.assos && perm.assos.length !== nextState.perm.assos.length)
      return { ...nextState, perm }

    return null
  }
  addAsso = perm => {
    const form = this.assoFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addAssoToPerm(perm.id, values.asso)
      form.resetFields()
      this.setState({ assoModalVisible: false })
    })
  }
  addEtu = perm => {
    const form = this.etuFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addEtuToPerm(perm.id, values.etu)
      form.resetFields()
      this.setState({ etuModalVisible: false })
    })
  }
  openAssoModal = () => {
    this.setState({ assoModalVisible: true })
  }
  openEtuModal = () => {
    this.setState({ etuModalVisible: true })
  }
  createPerm = () => {
    this.setState({ createDrawerVisible: true })
  }

  saveAssoFormRef = formRef => {
    this.assoFormRef = formRef
  }
  saveEtuFormRef = formRef => {
    this.etuFormRef = formRef
  }

  render() {
    const { perms, location, assos, admin } = this.props
    if (!perms || !location.pathname) return <Spin />
    const creneau = location.pathname.split('/perms/')[1]
    if (!creneau) return <Spin />
    const [day, hours] = creneau.split(' ')
    const [start, end] = hours.split('/')
    const perm = perms.find(
      p => p.start === start && p.end === end && p.day === day
    )
    return (
      <div>
        <PermDrawer
          visible={this.state.createDrawerVisible}
          perm={this.state.perm}
          day={day}
          start={start}
          end={end}
          onClose={() => this.setState({ createDrawerVisible: false })}
        />
        <AssosModal
          wrappedComponentRef={this.saveAssoFormRef}
          visible={this.state.assoModalVisible}
          onCancel={() => this.setState({ assoModalVisible: false })}
          onCreate={() => this.addAsso(perm)}
        />
        <EtusModal
          wrappedComponentRef={this.saveEtuFormRef}
          visible={this.state.etuModalVisible}
          onCancel={() => this.setState({ etuModalVisible: false })}
          onCreate={() => this.addEtu(perm)}
        />
        <Button type='primary' onClick={this.props.goToPerms}>
          Retour au tableau de perm
        </Button>
        <Divider />
        <h1>
          Permanence du {day} {hours} {perm && perm.name}{' '}
          {perm && (
            <Button
              type='primary'
              onClick={() => this.setState({ createDrawerVisible: true, perm })}
            >
              Modifier
            </Button>
          )}
        </h1>
        {!perm && admin && (
          <Button type='primary' onClick={this.createPerm}>
            Créer cette permanence
          </Button>
        )}
        {perm && perm.orgas && perm.orgas.length > 0 && (
          <List
            header={<div>Liste des assos de la permanence :</div>}
            bordered
            dataSource={perm.orgas}
            renderItem={item => {
              const asso = assos.find(a => a.login === item.login)
              return (
                <List.Item
                  actions={[
                    <a
                      onClick={() =>
                        this.props.deleteAssoFromPerm(perm.id, asso.login)
                      }
                    >
                      supprimer
                    </a>
                  ]}
                >
                  <Skeleton avatar loading={asso ? false : true} active>
                    {asso && (
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`${process.env.REACT_APP_API}/assos/${
                              item.id
                            }/image`}
                          />
                        }
                        title={
                          <a
                            href={`${process.env.REACT_APP_API}/assos/${
                              item.id
                            }/link`}
                          >
                            {item.name}
                          </a>
                        }
                        description={asso.descriptionShort}
                      />
                    )}
                  </Skeleton>
                </List.Item>
              )
            }}
          />
        )}
        {perm &&
          (perm.Members && perm.Members.length > 0 ? null : (
            <Button type='primary' onClick={this.openAssoModal}>
              Ajouter une association
            </Button>
          ))}
        {perm && perm.Members && perm.Members.length > 0 && (
          <List
            header={<div>Liste des étudiants membres de la permanence :</div>}
            bordered
            dataSource={perm.Members}
            renderItem={item => {
              return (
                <List.Item
                  actions={[
                    <a
                      onClick={() =>
                        this.props.deleteEtuFromPerm(perm.id, item.login)
                      }
                    >
                      supprimer
                    </a>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`${process.env.REACT_APP_API}/etus/${
                          item.id
                        }/image`}
                      />
                    }
                    title={item.full_name}
                  />
                </List.Item>
              )
            }}
          />
        )}
        {perm &&
          (perm.orgas && perm.orgas.length > 0 ? null : (
            <Button type='primary' onClick={this.openEtuModal}>
              Ajouter un étudiant
            </Button>
          ))}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  admin: state.user.user.admin,
  assos: state.asso.assos,
  perms: state.perm.perms,
  location: state.routing.location
})

const mapDispatchToProps = dispatch => ({
  fetchPerms: () => dispatch(fetchPerms()),
  goToPerms: () => dispatch(push('/perms')),
  addAssoToPerm: (id, asso) => dispatch(addAssoToPerm(id, asso)),
  addEtuToPerm: (id, login) => dispatch(addEtuToPerm(id, login)),
  deleteAssoFromPerm: (id, login) => dispatch(deleteAssoFromPerm(id, login)),
  deleteEtuFromPerm: (id, login) => dispatch(deleteEtuFromPerm(id, login))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermanencesDetails)
