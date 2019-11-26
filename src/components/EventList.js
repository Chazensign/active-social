import React, { Component } from 'react';
import axios from 'axios'
import CreateEvent from './CreateEvent';
import styled from 'styled-components'

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      addEvent: false
     }
  }

  componentDidMount = () => {
    if (this.props.userId) {
      axios
        .get(`/api/events/${this.props.userId}`)
        .then(res => {
          this.setState({ events: res.data })})
    }else if (this.props.activId) {
      axios
        .get(`/api/activity/events/${this.props.activId}`)
        .then(res => {
          this.setState({ events: res.data })})
        .catch(err => console.log(err))
    }
  }
  showAddEvent = () => {
    this.setState({ addEvent: !this.state.addEvent });
  }
  updateEvents = (res) => {
    this.setState({ events: res.data })
  }

  render() { 
    return (
      <OuterEvents>
        <h2>Events</h2>
        <CreateEvent
          updateEvents={this.updateEvents}
          addEvent={this.state.addEvent}
          activId={this.props.activId}
        />
        {this.props.activId ? (
          <button className='add-event' onClick={() => this.showAddEvent()}>
            Create New Event
          </button>
        ) : null}
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
      </OuterEvents>
    )
  }
}
 
export default EventList;

const OuterEvents = styled.div`
  width: 500px;
  height: 450px;
  margin: 10px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 6px;
  .event-li {
    display: flex;
  }
  h2 {
    box-sizing: border-box;
    border: inset 3px solid transparent;
    margin: 0;
    padding: 5px;
    background: #63b8ee;
    border-radius: 6px;
  }
  .event-li img {
    width: 150px;
  }
  .add-event {
    position: absolute;
    bottom: 10px;
  }
`