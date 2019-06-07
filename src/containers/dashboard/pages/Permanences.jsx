import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import './styles/perms.css'
import { fetchPerms } from '../../../redux/actions/perm'
import PermPopover from './components/PermPopover'

class Permanences extends React.Component {
  constructor(props) {
    super(props)
    props.fetchPerms()
  }
  render() {
    console.log(this.props.perms)
    let rows = [
      {
        displayHour: '9h30/10h',
        start: '9h30',
        perms: {
          Lundi: {},
          Mardi: {},
          Mercredi: {},
          Jeudi: {},
          Vendredi: {}
        }
      },
      {
        displayHour: '10h/12h',
        start: '10h',
        perms: {
          Lundi: {},
          Mardi: {},
          Mercredi: {},
          Jeudi: {},
          Vendredi: {}
        }
      },
      {
        displayHour: '12h/14h',
        start: '12h',
        perms: {
          Lundi: {},
          Mardi: {},
          Mercredi: {},
          Jeudi: {},
          Vendredi: {}
        }
      },
      {
        displayHour: '14h/16h',
        start: '14h',
        perms: {
          Lundi: {},
          Mardi: {},
          Mercredi: {},
          Jeudi: {},
          Vendredi: {}
        }
      },
      {
        displayHour: '16h/18h',
        start: '16h',
        perms: {
          Lundi: {},
          Mardi: {},
          Mercredi: {},
          Jeudi: {},
          Vendredi: {}
        }
      }
    ]
    this.props.perms.forEach(perm => {
      const index = rows.findIndex(row => row.start === perm.start)
      console.log(index, perm, rows)
      if (index !== -1) {
        rows[index].perms[perm.day] = perm
      }
    })
    console.log(rows)
    return (
      <div>
        <Row gutter={2} className='perms-header'>
          <Col span={4}>
            <div />
          </Col>
          <Col span={4}>
            <div>Lundi</div>
          </Col>
          <Col span={4}>
            <div>Mardi</div>
          </Col>
          <Col span={4}>
            <div>Mercredi</div>
          </Col>
          <Col span={4}>
            <div>Jeudi</div>
          </Col>
          <Col span={4}>
            <div>Vendredi</div>
          </Col>
        </Row>
        {rows.map((row, index) => (
          <Row
            key={index}
            gutter={2}
            className={
              index % 2 === 0 ? 'perms-content odd' : 'perms-content even'
            }
          >
            <Col span={4}>
              <div>{row.displayHour}</div>
            </Col>
            {Object.keys(row.perms).map((day, index) => (
              <Col span={4} key={index}>
                <PermPopover perm={row.perms[day]} creneau={day + ' ' + row.displayHour} />
              </Col>
            ))}
          </Row>
        ))}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  perms: state.perm.perms
})

const mapDispatchToProps = dispatch => ({
  fetchPerms: () => dispatch(fetchPerms())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Permanences)
