import React from 'react'
import { Card, Avatar, Spin } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './styles/asso.css'
import DiapoImage from './components/DiapoImage'

class AssoManagement extends React.Component {

  tabList = [
    {
      key: 'presentation',
      tab: 'Présentation de l\'asso',
    },
    {
      key: 'members',
      tab: 'Membres',
    },
    {
      key: 'contact',
      tab: 'Contact',
    },
  ];
  contentList = {};

  state = {
    key: 'presentation',
  };

  addImage = image => this.setState({ image })
  render() {
    const { login, assos, allasso } = this.props
    const isInAsso = assos.find(a => a.login === login)
    if (!isInAsso) return <Redirect to='/' />
    const asso = { ...allasso.find(a => a.login === login), ...isInAsso }
    console.log('asso:', asso) // @fred toutes les informations d'une asso se trouvent dans la variable asso ici
    
    const president = asso.members.find(function(element) {
      return (element.group === 'Bureau' && element.role === 'president')
    });
    var groupsAsso = {};
    for (let member of asso.members){
      if (groupsAsso[member.group] === undefined){
        groupsAsso[member.group] = [];
      }
      groupsAsso[member.group].push(member);
    }
    var membersUl = []
    const style1 = {'listStyleType': "none"}
    for (let group in groupsAsso){
      var sublist = []
      for (let member of groupsAsso[group]){
        let profileUrl = "https://etu.utt.fr/user/"+member.login;
        sublist.push(
          <li style ={style1}><a href={profileUrl}>{member.fullName}</a></li>
        )
      }
      membersUl.push(<li style ={style1}><b>{group} :</b><ul>{sublist}</ul><br /></li>)
    }
    var compositionAsso = <ul>{membersUl}</ul>
    
    this.contentList = {
      presentation: asso.descriptionShort,
      contact:  <p><b>Président : </b>{president.fullName}<br />
                <b>Télephone de contact : </b>{asso.phone}<br />
                <b>Mail de contact : </b><a>{asso.mail}</a><br />
                <b>Site internet : </b><a>{asso.website}</a></p>,
      members: compositionAsso,
    };

    if (!asso) return <Spin />
    return (
      <React.Fragment>
        <Card
          title={
            <div className='asso-card-title'>
              <Avatar
                size={150}
                shape='square'
                src={`${process.env.REACT_APP_API}/assos/${asso.id}/image`}
              />
              <span>{asso.name}</span>
              <div style={{ width: '150px' }} />
            </div>
          }
          tabList={this.tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            console.log("selected:", key);
            this.setState({['key'] : key});
          }}
        >
        {this.contentList[this.state.key]}
        </Card>
        <br />
        <DiapoImage asso={asso} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  assos: state.user.assos,
  allasso: state.asso.assos,
  login: state.routing.location.pathname.split('/assos/')[1]
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssoManagement)
