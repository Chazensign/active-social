import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Chat from './Chat';
import FriendList from './FriendList';
import EventList from './EventList';
import ActivitiesList from './ActivitiesList';
import ChatModal from './ChatModal';
import {setUser} from '../ducks/reducer'
import UserSearch from './UserSearch'
import styled from 'styled-components'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      otherChatter: '',
      otherChatterId: 0,
      aboutContent: '',
      privateChat: false,
     }
  }

componentDidUpdate = () => {
  axios.post('/auth/session')
  .then(res => {
    console.log(res)
    this.props.setUser(res.data.user)
  })
  .catch(err => console.log(err))
  }
  showPrivateChat = (id, name) => {
    this.setState({ privateChat: true, otherChatter: name, otherChatterId: id })
  }

  hidePrivateChat = () => {
    this.setState({ privateChat: false })
  }

  render() { 
    return (
      <UserPage>
        <h1 className='username'>
          {this.props.firstName} {this.props.lastName}
        </h1>
        <Link to={`/wizard/step1/${this.props.userId}`}><button className='update-button'>Update Profile</button></Link>
        <ChatModal
          hide={this.hidePrivateChat}
          userId={this.props.userId}
          userName={this.props.firstName}
          userId2={this.state.otherChatterId}
          userName2={this.state.otherChatter}
          hidden={this.state.privateChat}
        />
        <FriendList
          showChat={'true'}
          {...this.props}
          title='Friends'
          showPrivateChat={this.showPrivateChat}
          userId={this.props.userId}
        />
        <FriendList
          title='Pending Requests'
          userId={this.props.userId}
          showPrivateChat={this.showPrivateChat}
          requests='true'
        />
        <UserSearch zip={this.props.zip} />
        <ActivitiesList
          addActiv={false}
          userId={this.props.match.params.user_id}
        />
        <Chat
          userId={this.props.match.params.user_id}
          userName={this.props.firstName}
        />
        <EventList userId={this.props.match.params.user_id} />
      </UserPage>
    )
  }
}
 
function mapStateToProps(reduxState) {
  return {
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName,
    lastName: reduxState.lastName,
    userId: reduxState.userId,
    zip: reduxState.zip
  }
}

export default connect(mapStateToProps, {setUser})(User)

const UserPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100vw;
  min-height: 100vh;
  background: grey;
  margin-top: 80px;
  .username {
    width: 100vw;
    text-align: center;
    margin-top: 20px;
  }
  
  .update-button {
    height: 31px;
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
    position: absolute;
    right: 20px;
    top: 100px;
  }
  .update-button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
`