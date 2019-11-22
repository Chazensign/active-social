import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

import './User.css'
import Chat from './Chat';
import FriendList from './FriendList';
import EventList from './EventList';
import ActivitiesList from './ActivitiesList';
import ChatModal from './ChatModal';
import {setUser} from '../ducks/reducer'
import UserSearch from './UserSearch'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      otherChatter: '',
      otherChatterId: 0,
      conversations: [],
      aboutContent: '',
      privateChat: false,
     }
  }

componentDidUpdate = () => {
  axios.post('/auth/session')
  .then(res => {console.log(res)
    this.props.setUser(res.data.user)
  })
  .catch(err => console.log(err))
  console.log("component updated")
  }

  showPrivateChat = (id, name) => {
    this.setState({ privateChat: true, otherChatter: name, otherChatterId: id })
  }

  hidePrivateChat = () => {
    this.setState({ privateChat: false })
  }

  render() { 
    return (
      <div className='background'>
        <h1 className='username'>
          {this.props.firstName} {this.props.lastName}
        </h1>
        <ChatModal
          hide={this.hidePrivateChat}
          userId={this.props.userId}
          userName={this.props.firstName}
          userId2={this.state.otherChatterId}
          userName2={this.state.otherChatter}
          hidden={this.state.privateChat}
        />
        <FriendList
        {...this.props}
          showPrivateChat={this.showPrivateChat}
          userId={this.props.match.params.user_id}
        />
        <ActivitiesList userId={this.props.match.params.user_id} />
        <Chat
          userId={this.props.match.params.user_id}
          userName={this.props.firstName}
        />
        <EventList userId={this.props.match.params.user_id} />
        <UserSearch zip={this.props.zip} />
        
      </div>
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