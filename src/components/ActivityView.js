import React, { Component } from 'react'
import axios from 'axios'
import Chat from './Chat'
import FriendList from './FriendList'
import EventList from './EventList'
import styled from 'styled-components'

class ActivityView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: {},
      userNames: [],
      instructors: [],
      events: []
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.activ_id) {
      axios
        .get(`/api/activity/${this.props.match.params.activ_id}`)
        .then(res => {
          console.log(res.data);
          
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
    if (this.state.activity) return (
      <ActivityPage>
        {/* <img src={require(this.state.activity.img)} alt='' /> */}
        <h1>{this.state.activity.activ_title}</h1>
        {this.state.activity.activ_title && (
          <Chat
            activName={this.state.activity.activ_title}
            activity={this.state.activity.activ_id}
          />
        )}
        {this.state.userNames[0] ? (
          <FriendList
            {...this.props}
            title='Users'
            showFriends={true}
            userNames={this.state.userNames}
          />
        ) : null}
        {this.state.instructors[0] ? (
          <FriendList
            {...this.props}
            title='Instructors'
            showFriends={true}
            userNames={this.state.instructors}
          />
        ) : null}
        <EventList activId={this.props.match.params.activ_id} />
      </ActivityPage>)
  }
}

export default ActivityView

const ActivityPage = styled.div`
  box-sizing: border-box;
  padding-top: 80px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: #ebebeb;

  h1 {
    width: 100vw;
  }
`
