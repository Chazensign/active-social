import React, { Component } from 'react'
import axios from 'axios'
import Chat from './Chat'
import FriendList from './FriendList'
import EventList from './EventList'

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
  console.log(this.props)
  axios.get(`/api/activity/${this.props.match.params.activ_id}`)
  .then(res => {
    console.log(res.data);
    
    this.setState({ 
      instructors: res.data.instructors,
      userNames: res.data.users,
      activity: res.data.activ,
      events: res.data.events
    })
    console.log('activityview')
  })
}

  render() {
    console.log(this.state);
    
    return (
      <div>
        Activity
        {this.state.activity.activ_title && <Chat activity={this.state.activity.activ_title} />}
        <FriendList userNames={this.state.userNames} />
        <FriendList userNames={this.state.instructors} />
        <EventList />
      </div>
    )
  }
}

export default ActivityView
