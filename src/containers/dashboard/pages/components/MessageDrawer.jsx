import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Input } from 'antd'
import { createAffichage, editAffichage } from '../../../../redux/actions/affichage'

class MessageDrawer extends React.Component {
  constructor(props) {
    super(props)
    const { perm } = props
    this.state = {
      perm
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.title && !values.text) return
        const a = this.props.affichage
        let affichage = {
          title: values.title,
          text: values.text
        }
        if (a) this.props.editAffichage(a.id, affichage)
        else this.props.createAffichage(affichage, this.props.assoId)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { affichage } = this.props
    return (
      <Drawer
        title={affichage ? 'Modifier un message' : 'Créer un message'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Titre' style={{ marginBottom: 0 }}>
            {getFieldDecorator('title', {
              initialValue: affichage ? affichage.title : ''
            })(<Input placeholder='Le titre du message' />)}
          </Form.Item>
          <Form.Item label='Contenu' style={{ marginBottom: 0 }}>
            {getFieldDecorator('text', {
              initialValue: affichage ? affichage.text : ''
            })(<Input placeholder='Le contenu du message' />)}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {affichage ? 'Modifier' : 'Créer'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  createAffichage: (params, assoId) => dispatch(createAffichage(params, assoId)),
  editAffichage: (id, params) => dispatch(editAffichage(id, params))
})

const MessageDrawerForm = Form.create()(MessageDrawer)
export default connect(
  null,
  mapDispatchToProps
)(MessageDrawerForm)
