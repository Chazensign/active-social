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
            activName={this.state.activity.active_title}
            activity={this.state.activity.activ_id}
          />
        )}
        {this.state.userNames[0] ? (
          <FriendList
            {...this.props}
            title='Users'
            userNames={this.state.userNames}
          />
        ) : null}
        {this.state.instructors[0] ? (
          <FriendList
            {...this.props}
            title='Instructors'
            userNames={this.state.instructors}
          />
        ) : null}
        <EventList activId={this.props.match.params.activ_id} />
      </ActivityPage>)
  }
}

export default ActivityView

const ActivityPage = styled.div`
  margin-top: 80px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  background: grey;

  h1 {
    width: 100vw;
  }
`
