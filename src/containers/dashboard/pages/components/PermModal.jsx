import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Select, Spin } from 'antd'
const { Option } = Select

class PermModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form, affichage } = this.props
    let perms = this.props.perms.filter(perm => {
      const found = ((affichage && affichage.perms) || []).find(
        p => p.id === perm.id
      )
      return !found
    })
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title='Ajouter une perm'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          {perms ? (
            <Form.Item label='Permanence'>
              {getFieldDecorator('perm')(
                <Select
                  showSearch
                  notFoundContent='Aucune perm'
                  placeholder='Sélectionnez une perm'
                  optionFilterProp='children'
                  filterOption={(input, option) => {
                    const perm = perms.find(p => p.id === option.props.value)
                    if (!perm) return false
                    const fullName = `${perm.day} ${perm.start}/${perm.end}`
                    return (
                      fullName.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    )
                  }}
                >
                  {perms.map(perm => (
                    <Option key={perm.id} value={perm.id}>
                      {`${perm.day} ${perm.start}/${perm.end}`}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          ) : (
            <Spin />
          )}
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  perms: state.perm.perms
})

const PermModalForm = Form.create()(PermModal)
export default connect(
  mapStateToProps,
  null
)(PermModalForm)
