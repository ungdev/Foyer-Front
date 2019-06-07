import React from 'react'
import { connect } from 'react-redux'
import { fetchPerms, addAssoToPerm } from '../../../redux/actions/perm'
import { push } from 'react-router-redux'
import { Button, Spin, Divider, Skeleton, List, Avatar } from 'antd'
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
    const { perms, location } = this.props
    if (!perms) return <Spin />
    const creneau = location.pathname.split('/perms/')[1]
    const [day, hours] = creneau.split(' ')
    const [start, end] = hours.split('/')
    const perm = perms.find(
      p => p.start === start && p.end === end && p.day === day
    )
    return (
      <div>
        <PermDrawer
          visible={this.state.createDrawerVisible}
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
          Permanence du {day} {hours} {perm && perm.name}
        </h1>
        {!perm && (
          <Button type='primary' onClick={this.createPerm}>
            Créer cette permanence
          </Button>
        )}
        {perm && perm.assos && perm.assos.length > 0 && (
          <List
            header={<div>Liste des assos de la permanence :</div>}
            bordered
            dataSource={perm.assos}
            renderItem={item => (
              <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    }
                    title={<a href='https://ant.design'>oui</a>}
                    description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
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
