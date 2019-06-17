import React from 'react'
import { Button, List } from 'antd'
import { connect } from 'react-redux'
import MessageDrawer from './MessageDrawer'
import {
  fetchAffichages,
  deleteAffichage
} from '../../../../redux/actions/affichage'

class AssoMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      affichage: null,
      visible: false
    }
    props.fetchAffichages()
  }

  render() {
    const { visible, affichage } = this.state
    const { affichages } = this.props
    const messages = affichages.filter(affichage => !affichage.image)
    console.log('messages:', messages)
    return (
      <div>
        <MessageDrawer
          visible={visible}
          affichage={affichage}
          assoId={this.props.assoId}
          onClose={() => this.setState({ visible: false })}
        />
        {/* TODO add message list */}
        <List
          itemLayout='horizontal'
          dataSource={messages}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  onClick={() =>
                    this.setState({ visible: true, affichage: item })
                  }
                >
                  modifier
                </a>,
                <a onClick={() => this.props.deleteAffichage(item.id)}>
                  supprimer
                </a>
              ]}
            >
              <List.Item.Meta title={item.title} description={item.text} />
            </List.Item>
          )}
        />
        <Button
          type='primary'
          onClick={() => this.setState({ visible: true, affichage: null })}
        >
          Ajouter un text
        </Button>
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
  deleteAffichage: id => {
    dispatch(deleteAffichage(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoMessage)
