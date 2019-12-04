import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Chat from './Chat'
import FriendList from './FriendList'
import EventList from './EventList'
import ActivitiesList from './ActivitiesList'
import ChatModal from './ChatModal'
import { setUser, updateFriends } from '../ducks/reducer'
import UserSearch from './UserSearch'
import styled from 'styled-components'
import axios from 'axios'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otherChatter: '',
      otherChatterId: 0,
      aboutContent: '',
      privateChat: false,
      friends: []
    }
  }

  componentDidMount = () => {
    if (+this.props.match.params.user_id !== +this.props.loggedInId) {
      this.props.history.push(`/member/${this.props.match.params.user_id}`)
    }
    axios.post('/auth/session').then(res => {
      this.props.setUser(res.data.user)
    })
    console.log('component mounted')
    this.getCurrentFriends()
   
  }

  showPrivateChat = (id, name) => {
    this.setState({ privateChat: true, otherChatter: name, otherChatterId: id })
  }

  hidePrivateChat = () => {
    this.setState({ privateChat: false })
  }
  getCurrentFriends = () => {
     axios.get(`/api/friends/${this.props.loggedInId}`).then(res => {
       console.log(res.data)
       this.setState({ friends: res.data })
     })
  }
  updateReduxFriends = () => {
    axios.get(`/api/friends/redux/${this.props.loggedInId}`)
  .then(res => {
   this.props.updateFriends(res.data)
  }
  )}
  render() {
    console.log(this.state.friends);
    
    return (
      <UserPage>
        <h1 className='username'>
          {this.props.firstName} {this.props.lastName}
        </h1>
        <Link to={`/wizard/step1/update/${this.props.loggedInId}`}>
          <button className='update-button'>Update Profile</button>
        </Link>
        <ChatModal
          hide={this.hidePrivateChat}
          userId={this.props.loggedInId}
          userName={this.props.firstName}
          userId2={this.state.otherChatterId}
          userName2={this.state.otherChatter}
          hidden={this.state.privateChat}
        />
        {this.state.friends.length > 0 ? <FriendList
          friendList={this.state.friends}
          updateReduxFriends={this.updateReduxFriends}
          showChat={true}
          {...this.props}
          title='Friends'
          showPrivateChat={this.showPrivateChat}
          userId={this.props.loggedInId}
          remove={true}
        /> : null}
        <FriendList
          getCurrentFriends={this.getCurrentFriends}
          title='Pending Requests'
          userId={this.props.loggedInId}
          showPrivateChat={this.showPrivateChat}
          requests='true'
          remove={false}
        />
        <UserSearch
          userId={this.props.loggedInId}
          friends={this.props.friends}
          zip={this.props.zip}
          searchOnly={false}
        />
        <ActivitiesList addActiv={true} userId={this.props.loggedInId} />
        <Chat userId={this.props.loggedInId} userName={this.props.firstName} />
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
    loggedInId: reduxState.userId,
    zip: reduxState.zip,
    friends: reduxState.friends,
    events: reduxState.events
  }
}

export default connect(mapStateToProps, { setUser, updateFriends })(User)

const UserPage = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:700&display=swap');
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100vw;
  background: #ebebeb;

  .username {
    width: 100vw;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
    font-size: 58px;
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
  @media (max-width: 800px) {
    .update-button {
      display: none;
    }
  }
`
