import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Select, Spin } from 'antd'
import { fetchAssos } from '../../../../redux/actions/asso'
const { Option } = Select

class AssosModal extends React.Component {
  constructor(props) {
    super(props)
    props.fetchAssos()
  }

  render() {
    const { visible, onCancel, onCreate, form, assos } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title='Ajouter une association'
        okText='Create'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          {assos ? (
            <Form.Item label='Association'>
              {getFieldDecorator('asso')(
                <Select
                  showSearch
                  notFoundContent='Aucune association'
                  placeholder='Sélectionnez une association'
                  optionFilterProp='children'
                  filterOption={(input, option) => {
                    const asso = assos.find(a => a.login === option.props.value)
                    if (!asso) return false
                    return (
                      asso.name.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      asso.login.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    )
                  }}
                >
                  {assos.map(asso => (
                    <Option key={asso.login} value={asso.login}>
                      {asso.name}
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
  assos: state.asso.assos
})

const mapDispatchToProps = dispatch => ({
  fetchAssos: () => dispatch(fetchAssos())
})

const AssosModalForm = Form.create()(AssosModal)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssosModalForm)
