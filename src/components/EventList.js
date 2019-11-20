import React, { Component } from 'react';
import axios from 'axios'

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: []
     }
  }

  componentDidMount = () => {
    axios.get(`/api/events/${this.props.userId}`)
    .then(res => this.setState({ events: res.data }))
  }

  render() { 
    return (
      <div className='outer-events'>
        {this.state.events.map(event => {
          return (
            <div key={event.event_id} className='event-li'>
              <div>
                <h2>{event.ev_title}</h2>
                <h4>{event.date}</h4>
              </div>
              <img src={event.img} alt='' />
              <p>{event.content}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
 
export default EventList;