import React from 'react'
import { List, Avatar, Spin, Input, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { modifyImageDisplay } from '../../../redux/actions/asso'

class AssoManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }
  filterAsso = asso => {
    const { search } = this.state
    if (asso.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) return true
    if (asso.login.toLowerCase().indexOf(search.toLowerCase()) >= 0) return true
    return false
  }
  render() {
    const { allasso } = this.props
    console.log('allasso:', allasso)
    if (!allasso) return <Spin />
    const displayAsso = allasso.filter(this.filterAsso)
    return (
      <div>
        <Input
          value={this.state.search}
          onChange={e => this.setState({ search: e.target.value })}
          placeholder='Rechercher une association'
        />
        <List
          header={<div>Liste des associations :</div>}
          bordered
          dataSource={displayAsso}
          renderItem={item => {
            return (
              <List.Item
                actions={[
                  <Tooltip
                    placement='top'
                    title={
                      item.displayImage ? 'Cacher le logo' : 'Afficher le logo'
                    }
                  >
                    <a
                      onClick={() =>
                        this.props.modifyImageDisplay(
                          item.id,
                          !item.displayImage
                        )
                      }
                    >
                      {item.displayImage ? 'cacher' : 'afficher'}
                    </a>
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`${process.env.REACT_APP_API}/assos/${
                        item.id
                      }/image`}
                    />
                  }
                  title={
                    <a
                      href={`${process.env.REACT_APP_API}/assos/${
                        item.id
                      }/link`}
                    >
                      {item.name}
                    </a>
                  }
                  description={
                    item.displayImage
                      ? 'Le logo de cette association est affiché'
                      : "Le logo de cette association n'est pas affiché"
                  }
                />
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allasso: state.asso.assos
})

const mapDispatchToProps = dispatch => ({
  modifyImageDisplay: (id, displayImage) =>
    dispatch(modifyImageDisplay(id, displayImage))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoManagement)
