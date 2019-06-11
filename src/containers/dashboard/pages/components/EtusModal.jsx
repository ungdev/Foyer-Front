import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Select, Spin } from 'antd'
import { fetchEtus } from '../../../../redux/actions/user'
const { Option } = Select

class EtusModal extends React.Component {
  constructor(props) {
    super(props)
    props.fetchEtus('')
  }
  render() {
    const { visible, onCancel, onCreate, form, etus } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title='Ajouter un étudiant'
        okText='Ajouter'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          {etus ? (
            <Form.Item label='Étudiants'>
              {getFieldDecorator('etu')(
                <Select
                  showSearch
                  notFoundContent='Aucun étudiant'
                  placeholder='Sélectionnez un étudiant'
                  optionFilterProp='children'
                  onSearch={this.props.fetchEtus}
                  filterOption={(input, option) => {
                    const etu = etus.find(e => e.login === option.props.value)
                    if (!etu) return false
                    return (
                      etu.fullName.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    )
                  }}
                >
                  {etus.map(etu => (
                    <Option key={etu.login} value={etu.login}>
                      {etu.fullName}
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
  etus: state.user.etus
})

const mapDispatchToProps = dispatch => ({
  fetchEtus: search => dispatch(fetchEtus(search))
})
const EtusModalForm = Form.create()(EtusModal)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtusModalForm)
