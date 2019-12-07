import React, { Component } from 'react'
import axios from 'axios'
import Chat from './Chat'
import FriendList from './FriendList'
import EventList from './EventList'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setUser } from '../ducks/reducer'
import ChatModal from './ChatModal'

class ActivityView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      userNames: [],
      instructors: [],
      events: [],
      friends: [],
      privateChat: false,
      otherChatter: '',
      otherChatterId: 0
    }
  }

  componentDidMount = () => {
    axios
      .post('/auth/session')
      .then(res => {
        this.props.setUser(res.data.user)
      })
      .catch(err => console.log(err))
    if (this.props.match.params.activ_id) {
      axios
        .get(`/api/activity/${this.props.match.params.activ_id}`)
        .then(res => {
          this.setState({
            instructors: res.data.instructors,
            userNames: res.data.users,
            activity: res.data.activ,
            events: res.data.events
          })
        })
    }
  }
  showPrivateChat = (id, name) => {
    this.setState({ privateChat: true, otherChatter: name, otherChatterId: id })
  }
  hidePrivateChat = () => {
    this.setState({ privateChat: false })
  }

  render() {
    
    if (this.state.activity)
      return (
        <ActivityPage>
          <div className='img-title'>
            <img className='sport-svg' src={this.state.activity.img} alt='' />
            <h1 className='activ-title'>{this.state.activity.activ_title}</h1>
          </div>
          <div className='components'>
            {this.state.activity.activ_title && (
              <Chat
                activName={this.state.activity.activ_title}
                activity={this.state.activity.activ_id}
              />
            )}
            <ChatModal
              hide={this.hidePrivateChat}
              userId={this.props.loggedInId}
              userName={this.props.firstName}
              userId2={this.state.otherChatterId}
              userName2={this.state.otherChatter}
              hidden={this.state.privateChat}
            />
            {this.state.userNames[0] ? (
              <FriendList
                {...this.props}
                showPrivateChat={this.showPrivateChat}
                userId={this.props.loggedInId}
                friends={this.props.friends}
                addFriend={this.addFriend}
                title='Users'
                showFriends={true}
                userNames={this.state.userNames}
              />
            ) : null}
            {this.state.instructors[0] ? (
              <FriendList
                {...this.props}
                showPrivateChat={this.showPrivateChat}
                userId={this.props.loggedInId}
                friends={this.props.friends}
                title='Instructors'
                showFriends={true}
                userNames={this.state.instructors}
              />
            ) : null}
            <EventList
              setUser={this.props.setUser}
              userId={this.props.loggedInId}
              usersEvents={this.props.events}
              activId={this.props.match.params.activ_id}
            />
          </div>
        </ActivityPage>
      )
  }
}

function mapStateToProps(reduxState) {
  return {
    loggedInId: reduxState.userId,
    firstName: reduxState.firstName,
    zip: reduxState.zip,
    friends: reduxState.friends,
    events: reduxState.events
  }
}

export default connect(mapStateToProps, { setUser })(ActivityView)

const ActivityPage = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  background: #ebebeb;
  .components {
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .img-title {
    height: 100px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }
  .sport-svg {
    height: 75px;
  }
  .activ-title {
    font-size: 48px;
    margin: 20px;
  }
`
