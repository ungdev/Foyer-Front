import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Input } from 'antd'
import { createPerm, editPerm } from '../../../../redux/actions/perm'

class PermDrawer extends React.Component {
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
        const p = this.props.perm
        let perm = {
          name: values.name,
          day: p ? p.day : this.props.day,
          start: p ? p.start : this.props.start,
          end: p ? p.end : this.props.end
        }
        if (p) this.props.editPerm(p.id, perm)
        else this.props.createPerm(perm)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.event && (!state.event || props.event.id !== state.event.id)) {
      return {
        event: props.event
      }
    }
    return null
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { perm } = this.props
    return (
      <Drawer
        title={perm ? 'Modifier une permanence' : 'Créer un permanence'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Nom (optionel)' style={{ marginBottom: 0 }}>
            {getFieldDecorator('name', {
              initialValue: perm ? perm.name : ''
            })(<Input placeholder='Le nom de la permanence' />)}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {perm ? 'Modifier' : 'Créer'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createPerm: params => dispatch(createPerm(params)),
  editPerm: (id, params) => dispatch(editPerm(id, params))
})

const PermDrawerForm = Form.create()(PermDrawer)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PermDrawerForm)
