import React from 'react'
import { Button, List, Tooltip, Icon } from 'antd'
import { connect } from 'react-redux'
import MessageDrawer from './MessageDrawer'
import {
  fetchAffichages,
  deleteAffichage,
  addPermToAffichage,
  deletePermFromAffichage
} from '../../../../redux/actions/affichage'
import { fetchPerms } from '../../../../redux/actions/perm'
import PermModal from './PermModal'

class AssoMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      affichage: null,
      visible: false,
      permVisible: false
    }
    props.fetchAffichages()
    props.fetchPerms()
  }
  addPerm = affichage => {
    const form = this.permFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addPermToAffichage(affichage.id, values.perm)
      form.resetFields()
      this.setState({ permVisible: false })
    })
  }
  savePermFormRef = formRef => {
    this.permFormRef = formRef
  }

  render() {
    const { visible, affichage } = this.state
    const { affichages, assoId } = this.props
    const messages = affichages
      .filter(affichage => !affichage.image)
      .filter(affichage => affichage.orgaId === assoId)
    console.log('messages:', messages)
    return (
      <div>
        <MessageDrawer
          visible={visible}
          affichage={affichage}
          assoId={this.props.assoId}
          onClose={() => this.setState({ visible: false })}
        />
        <PermModal
          wrappedComponentRef={this.savePermFormRef}
          visible={this.state.permVisible}
          onCancel={() => this.setState({ permVisible: false })}
          onCreate={() => this.addPerm(this.state.affichage)}
          affichage={this.state.affichage}
        />
        <List
          itemLayout='horizontal'
          dataSource={messages}
          renderItem={item => (
            <List.Item
              actions={[
                <Tooltip placement='top' title='Attribuer à une perm'>
                  <a
                    onClick={() =>
                      this.setState({ permVisible: true, affichage: item })
                    }
                  >
                    <Icon type='plus' />
                  </a>
                </Tooltip>,
                <Tooltip placement='top' title='Modifier'>
                  <a
                    onClick={() =>
                      this.setState({ visible: true, affichage: item })
                    }
                  >
                    <Icon type='edit' />
                  </a>
                </Tooltip>,
                <Tooltip placement='top' title='Supprimer'>
                  <a onClick={() => this.props.deleteAffichage(item.id)}>
                    <Icon type='delete' />
                  </a>
                </Tooltip>
              ]}
            >
              <List.Item.Meta title={item.title} description={item.text} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {item.perms && item.perms.length > 0 && (
                  <div>Liste des créneaux d'affichage :</div>
                )}

                {item.perms &&
                  item.perms.map(perm => (
                    <div key={perm.id}>
                      - {perm.day} {perm.start}/{perm.end}{' '}
                      <a
                        style={{ color: 'red' }}
                        onClick={() =>
                          this.props.deletePermFromAffichage(item.id, perm.id)
                        }
                      >
                        <Icon type='delete' />
                      </a>
                    </div>
                  ))}
              </div>
            </List.Item>
          )}
        />
        <Button
          type='primary'
          onClick={() => this.setState({ visible: true, affichage: null })}
        >
          Ajouter un text
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  affichages: state.affichage.affichages
})
const mapDispatchToProps = dispatch => ({
  fetchAffichages: () => {
    dispatch(fetchAffichages())
  },
  fetchPerms: () => {
    dispatch(fetchPerms())
  },
  deleteAffichage: id => {
    dispatch(deleteAffichage(id))
  },
  addPermToAffichage: (id, perm) => dispatch(addPermToAffichage(id, perm)),
  deletePermFromAffichage: (affichageId, permId) =>
    dispatch(deletePermFromAffichage(affichageId, permId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoMessage)
