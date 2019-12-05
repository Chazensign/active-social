import React, { Component } from 'react'
import axios from 'axios'
import Chat from './Chat'
import FriendList from './FriendList'
import EventList from './EventList'
import styled from 'styled-components'
import { connect } from 'react-redux'

class ActivityView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      userNames: [],
      instructors: [],
      events: [],
      friends: []
    }
  }

  componentDidMount = () => {
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


  render() {
    if (this.state.activity)
      return (
        <ActivityPage>
          <div className='img-title' >
            <img className='sport-svg' src={this.state.activity.img} alt='' />
            <h1 className='activ-title' >{this.state.activity.activ_title}</h1>
          </div>
          {this.state.activity.activ_title && (
            <Chat
              activName={this.state.activity.activ_title}
              activity={this.state.activity.activ_id}
            />
          )}
          {this.state.userNames[0] ? (
            <FriendList
              {...this.props}
              addFriend={this.addFriend}
              title='Users'
              showFriends={true}
              userNames={this.state.userNames}
            />
          ) : null}
          {this.state.instructors[0] ? (
            <FriendList
              {...this.props}
              friends={this.state.friends}
              title='Instructors'
              showFriends={true}
              userNames={this.state.instructors}
            />
          ) : null}
          <EventList loggedInId={ this.props.loggedInId } usersEvents={this.props.events} activId={this.props.match.params.activ_id} />
        </ActivityPage>
      )
  }
}

function mapStateToProps(reduxState) {
  return {
    loggedInId: reduxState.userId,
    zip: reduxState.zip,
    friends: reduxState.friends,
    events: reduxState.events
  }
}

export default connect(mapStateToProps)(ActivityView)

const ActivityPage = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: #ebebeb;
  .img-title {
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
