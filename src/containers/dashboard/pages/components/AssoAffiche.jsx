import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Card, Icon, Tooltip } from 'antd'
import moment from 'moment'
import Uploader from '../../../../components/Uploader'
import '../styles/affichage.css'
import {
  fetchAffichages,
  addPermToAffichage,
  deletePermFromAffichage,
  createAffichage,
  deleteAffichage
} from '../../../../redux/actions/affichage'
import PermModal from './PermModal'
import { fetchPerms } from '../../../../redux/actions/perm'

class AssoAffiche extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      visible: false
    }
    props.fetchAffichages()
    props.fetchPerms()
  }
  addImageToAsso = () => {
    if (!this.state.image) {
      return
    }
    this.props.createAffichage(this.props.assoId, { image: this.state.image })
    this.setState({ visible: false, image: null })
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
    const { affichages, assoId } = this.props
    const affiches = affichages
      .filter(affichage => affichage.image)
      .filter(affichage => affichage.orgaId === assoId)

    const { visible } = this.state
    return (
      <div className='asso-affiche'>
        <Modal
          visible={visible}
          title='Ajouter une affiche'
          okText='Ajouter'
          onCancel={() => this.setState({ visible: false })}
          onOk={this.addImageToAsso}
        >
          <Uploader
            addImage={image => this.setState({ image })}
            removeImage={() => this.setState({ image: null })}
            initialImage={null}
            buttonClickedTime={moment()}
          />
        </Modal>
        <PermModal
          wrappedComponentRef={this.savePermFormRef}
          visible={this.state.permVisible}
          onCancel={() => this.setState({ permVisible: false })}
          onCreate={() => this.addPerm(this.state.affichage)}
          affichage={this.state.affichage}
        />
        <Button type='primary' onClick={() => this.setState({ visible: true })}>
          Ajouter une affiche
        </Button>
        <div className='affiche-list'>
          {affiches.map(affiche => (
            <Card
              key={affiche.id}
              hoverable
              cover={
                <div className='affiche-cover-container'>
                  <img src={process.env.REACT_APP_API + affiche.image} alt='' />
                </div>
              }
              actions={[
                <Tooltip placement='top' title='Attribuer à une perm'>
                  <a
                    onClick={() =>
                      this.setState({ permVisible: true, affichage: affiche })
                    }
                  >
                    <Icon type='plus' />
                  </a>
                </Tooltip>,
                <Tooltip placement='top' title='Supprimer'>
                  <a onClick={() => this.props.deleteAffichage(affiche.id)}>
                    <Icon type='delete' />
                  </a>
                </Tooltip>
              ]}
            >
              <Card.Meta
                title={
                  affiche.perms && affiche.perms.length > 0
                    ? "Liste des créneaux d'affichage"
                    : "Pas d'affichage"
                }
                description={
                  affiche.perms && affiche.perms.length > 0 ? (
                    affiche.perms.map(perm => (
                      <div key={perm.id}>
                        - {perm.day} {perm.start}/{perm.end}{' '}
                        <a
                          style={{ color: 'red' }}
                          onClick={() =>
                            this.props.deletePermFromAffichage(
                              affiche.id,
                              perm.id
                            )
                          }
                        >
                          <Icon type='delete' />
                        </a>
                      </div>
                    ))
                  ) : (
                    <div>...</div>
                  )
                }
              />
            </Card>
          ))}
        </div>
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
  createAffichage: (assoId, params) =>
    dispatch(createAffichage(params, assoId)),
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
)(AssoAffiche)
