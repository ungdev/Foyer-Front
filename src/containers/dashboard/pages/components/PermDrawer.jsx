import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Input, Select } from 'antd'
import { createPerm, editPerm } from '../../../../redux/actions/perm'
const { Option } = Select

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
        const [start, end] = values.creneau.split('/')
        let perm = {
          name: values.name,
          day: values.day,
          start: start.split(' ')[1],
          end
        }
        if (this.props.perm) this.props.editPerm(this.props.perm.id, perm)
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
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
    const creneaux = ['9h30/10h', '10h/12h', '12h/14h', '14h/16h', '16h/18h']
    return (
      <Drawer
        title={perm ? 'Modifier une permanence' : 'Créer un permanence'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Nom' style={{ marginBottom: 0 }}>
            {getFieldDecorator('name', {
              initialValue: perm ? perm.name : ''
            })(<Input placeholder='Le nom de la permanence (optionel)' />)}
          </Form.Item>
          <Form.Item label={<span>Jour de la permanence</span>}>
            {getFieldDecorator('day', {
              initialValue: perm ? perm.day : this.props.day || null
            })(
              <Select
                showSearch
                notFoundContent='Aucun jour'
                placeholder='Sélectionnez un jour'
                optionFilterProp='children'
                filterOption={(input, option) => {
                  const day = days.find(d => d === option.props.value)
                  if (!day) return false
                  return day.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {days.map(day => (
                  <Option key={day} value={day}>
                    {day}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label={<span>Créneau de la permanence</span>}>
            {getFieldDecorator('creneau', {
              initialValue: perm
                ? perm.start + '/' + perm.end
                : this.props.creneau || null
            })(
              <Select
                showSearch
                notFoundContent='Aucun créneau'
                placeholder='Sélectionnez un créneau'
                optionFilterProp='children'
                filterOption={(input, option) => {
                  const creneau = creneaux.find(c => c === option.props.value)
                  if (!creneau) return false
                  return creneau.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
              >
                {creneaux.map(creneau => (
                  <Option key={creneau} value={creneau}>
                    {creneau}
                  </Option>
                ))}
              </Select>
            )}
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
