import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Select, Spin } from 'antd'
const { Option } = Select

class PermModal extends React.Component {
  getDayId = day => {
    switch (day) {
      case 'Lundi':
        return 1
      case 'Mardi':
        return 2
      case 'Mercredi':
        return 3
      case 'Jeudi':
        return 4
      case 'Vendredi':
        return 5
      case 'Samedi':
        return 6
      case 'Dimanche':
        return 7
      default:
        return 0
    }
  }
  render() {
    const { visible, onCancel, onCreate, form, affichage } = this.props
    let perms = this.props.perms
      .filter(perm => {
        const found = ((affichage && affichage.perms) || []).find(
          p => p.id === perm.id
        )
        return !found
      })
      .sort((a, b) => {
        if (this.getDayId(a.day) > this.getDayId(b.day)) return 1
        if (this.getDayId(a.day) < this.getDayId(b.day)) return -1
        if (
          parseInt(a.start.split('h')[0], 10) >
          parseInt(b.start.split('h')[0], 10)
        )
          return 1
        if (
          parseInt(a.start.split('h')[0], 10) <
          parseInt(b.start.split('h')[0], 10)
        )
          return -1
        return 0
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
                      {perm.name
                        ? perm.name
                        : perm.orgas && perm.orgas.length > 0
                        ? ' (' +
                          perm.orgas.map(orga => orga.name).join(', ') +
                          ')'
                        : ''}
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
