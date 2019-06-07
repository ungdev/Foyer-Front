import React from 'react'
import { connect } from 'react-redux'
import { fetchPerms, addAssoToPerm } from '../../../redux/actions/perm'
import { push } from 'react-router-redux'
import { Button, Spin, Divider, List, Avatar, Skeleton } from 'antd'
import PermDrawer from './components/PermDrawer'
import AssosModal from './components/AssosModal'

class PermanencesDetails extends React.Component {
  constructor(props) {
    super(props)
    props.fetchPerms()
    this.state = {
      createDrawerVisible: false,
      assoModalVisible: false
    }
  }
  addAsso = perm => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addAssoToPerm(perm.id, values.asso)
      form.resetFields()
      this.setState({ assoModalVisible: false })
    })
  }
  openAssoModal = () => {
    this.setState({ assoModalVisible: true })
  }
  createPerm = () => {
    this.setState({ createDrawerVisible: true })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    const { perms, location, assos } = this.props
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
          creneau={creneau}
          day={day}
          onClose={() => this.setState({ createDrawerVisible: false })}
        />
        <AssosModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.assoModalVisible}
          onCancel={() => this.setState({ assoModalVisible: false })}
          onCreate={() => this.addAsso(perm)}
        />
        <Button type='primary' onClick={this.props.goToPerms}>
          Retour au tableau de perm
        </Button>
        <Divider />
        <h1>
          Permanence du {day} {hours} {perm && perm.name}{' '}
          <Button type='primary' onClick={() => this.setState({ createDrawerVisible: true, perm })}>
            Modifier
          </Button>
        </h1>
        {!perm && (
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
                <List.Item actions={[<a>supprimer</a>]}>
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
        {perm && (
          <Button type='primary' onClick={this.openAssoModal}>
            Ajouter une association
          </Button>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  assos: state.asso.assos,
  perms: state.perm.perms,
  location: state.routing.location
})

const mapDispatchToProps = dispatch => ({
  fetchPerms: () => dispatch(fetchPerms()),
  goToPerms: () => dispatch(push('/perms')),
  addAssoToPerm: (id, asso) => dispatch(addAssoToPerm(id, asso))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermanencesDetails)
