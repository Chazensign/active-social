import React, { Component } from 'react';
import axios from 'axios'
import CreateEvent from './CreateEvent';
import styled from 'styled-components'
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading'

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
          this.setState({ events: res.data })
        })
        .catch(err =>
          console.log(err)
          
        )
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
  addEventToUser = (id) => {
    axios.post(`/api/user/events/${id}`)
    .then(res => Swal.fire({
      icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1000
    })
    )
  }

  render() { 
  
    return (
      <>
      <OuterEvents>
        <h2 className='title' >Events</h2>
        
        {this.props.activId ? (
          <button className='add-event' onClick={() => this.showAddEvent()}>
            Create New Event
          </button>
        ) : null}
        {!this.state.events ? <ReactLoading color={'grey'} height={'100px'} width={'100px'} /> : this.state.events.map(event => {
          return (
            <div key={event.event_id} className='event-li'>
              <div className='title-date-img'>
                <div>
                  <h2>{event.ev_title}</h2>
                  <h4>{event.date}</h4>
                </div>
                <img src={event.img} alt='' />
              </div>
              <div className='p-button'>
                <p>{event.content}</p>
                {!this.props.userId ? (
                  <button onClick={() => this.addEventToUser(event.event_id)}>
                    Follow
                  </button>
                ) : null}
                {+this.props.userId === +event.user_id ? (
                  <button>Delete</button>
                ) : null}
              </div>
            </div>
          )
        })}
      </OuterEvents>
      <CreateEvent
      showAddEvent={this.showAddEvent}
          updateEvents={this.updateEvents}
          addEvent={this.state.addEvent}
          activId={this.props.activId}
        />
        </>
    )
  }
}
 
export default EventList;

const OuterEvents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 450px;
  margin: 10px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px grey;
  border-radius: 6px;
  .event-li {
    box-sizing: border-box;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 5px;
    width: 490px;
    display: flex;
    padding: 10px;
  }
  p {
    width: 170px;
  }
  .title {
    box-sizing: border-box;
    width: 100%;
    margin: 1px;
    padding: 5px;
    background: #14396a;
    color: #63b8ee;
    border-radius: 6px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .event-li img {
    width: 150px;
    height: auto;
    border-radius: 12px;
  }
  .title-date-img {
    display: flex;
    width: 280px;
  }
  .add-event {
    position: absolute;
    bottom: 10px;
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
  }
  .add-event:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .p-button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .p-button button {
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
  }
  .p-button button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  @media (max-width: 800px) {
    width: 300px;
    .event-li {
      width: 290px;
      flex-wrap: wrap;
    }
    h2 {
      margin: 0 5px 10px 5px;
    }
    h4 {
      margin: 10px 5px;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      width: auto;
      margin: 5px 0;
    }
    .event-li img {
      width: 100px;
      height: 100px;
    }
  }
`