import React, { Component } from 'react'
import axios from 'axios'
import CreateEvent from './CreateEvent'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import EditEventModal from './EditEventModal'
import EventModal from './EventModal'

class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      editEvent: {},
      event: {},
      showEventModal: false,
      showEditEventModal: false,
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
        .catch(err => console.log(err))
    } else if (this.props.memberId) {
      axios
        .get(`/api/events/${this.props.memberId}`)
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => console.log(err))
    } else if (this.props.activId) {
      axios
        .get(`/api/activity/events/${this.props.activId}`)
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => console.log(err))
    }
  }
  showAddEvent = () => {
    this.setState({ addEvent: !this.state.addEvent })
  }
  updateEvents = res => {
    this.setState({ events: res.data })
  }
  addEventToUser = id => {
    if (this.props.loggedInId > 0) {
    axios.post(`/api/user/events/${id}`).then(res =>
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1000
      })
    )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No User',
        text: 'Please Login or Create Account.',
        showConfirmButton: true
      })
    }
  }

  deleteEvent = (id) => {
       Swal.fire({
      title: 'Are you sure?',
      text: 'You will delete this event.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        axios.delete(`/api/event/${id}`).then(res => {
          this.setState({ events: res.data })
          Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Your event has been removed.',
            showConfirmButton: false,
            timer: 1000
          })
        })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your event remains :)', 'error')
      }
    }
    )
  }
  dispEditEventModal = (index) => {
    this.setState({ 
      showEditEventModal: !this.state.showEditEventModal,
      editEvent: this.state.events[index]
    });
  }

  dispEventModal = (index) => {
    console.log('dispEventModal', index);
    
    this.setState({
      showEventModal: !this.state.showEventModal,
      event: this.state.events[index]
    })
  }

  render() {
   
    return (
      <>
        <OuterEvents>
          <h2 className='title'>Events</h2>
          {this.props.activId ? (
            <button className='add-event' onClick={() => this.showAddEvent()}>
              Create New Event
            </button>
          ) : null}
          {!this.state.events ? (
            <ReactLoading color={'grey'} height={'100px'} width={'100px'} />
          ) : (
            this.state.events.map((event, i) => {
              return (
                <div key={event.event_id} className='event-li'>
                  <div onClick={() => this.dispEventModal(i)} className='title-date-img'>
                    <div>
                      <h2>{event.ev_title}</h2>
                      <h4>{event.date}</h4>
                    </div>
                    <div
                      className='event-img'
                      style={{ backgroundImage: `url(${event.img})` }}
                    />
                  </div>
                  <div className='p-button'>
                    <p>{event.content}</p>
                    {this.props.userId > 0 ? (
                      this.props.usersEvents.includes(event.event_id) ? (
                        <button
                          className='follow-button'
                          onClick={() => this.addEventToUser(event.event_id)}>
                          Follow
                        </button>
                      ) : (
                        <button className='follow-button'>Unfollow</button>
                      )
                    ) : null}
                    {+this.props.userId === event.user_id ? (
                      <>
                        <button
                          id='edit'
                          onClick={() => this.dispEventModal(i)}>
                          Edit
                        </button>
                        <button
                          id='delete'
                          onClick={() => this.deleteEvent(event.event_id)}>
                          Delete
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              )
            })
          )}
        </OuterEvents>

        <CreateEvent
          showAddEvent={this.showAddEvent}
          updateEvents={this.updateEvents}
          addEvent={this.state.addEvent}
          activId={this.props.activId}
        />
        {this.state.showEditEventModal && (
          <EditEventModal
            updateEvents={this.updateEvents}
            event={this.state.editEvent}
            dispEventModal={this.dispEditEventModal}
            showEditEventModal={this.state.showEditEventModal}
          />
        )}
        {this.state.showEventModal && 
        <EventModal 
          showEventModal={this.state.showEventModal}
          event={this.state.event}
        />}
      </>
    )
  }
}

export default EventList

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
  overflow: scroll;
  .event-li {
    box-sizing: border-box;
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 5px;
    width: 490px;
    height: 175px;
    display: flex;
    padding: 10px 0;
  }
  p {
    width: 160px;
    margin: 10px 0 0 0;
  }
  .title {
    box-sizing: border-box;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;

    margin: 1px;
    padding: 5px;
    background: #14396a;
    color: #63b8ee;
    border-radius: 6px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .event-img {
    max-height: 160px;
    width: 170px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
  }
  .title-date-img {
    display: flex;
    width: 310px;
    height: 160px;
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
    box-sizing: border-box;
    padding-bottom: 10px;
    position: relative;
    width: 178px;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .p-button button {
    padding: 1px 4px;
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    width: unset;
    height: unset;
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
  }
  .p-button button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  #delete {
    position: absolute;
    bottom: 10px;
    left: 5px;
    
  }
  #edit {
    position: absolute;
    bottom: 10px;
    left: 65px;
  }
  .follow-button {
    position: absolute;
    bottom: 10px;
    right: 5px;
  }
  @media (max-width: 800px) {
    width: 300px;
    .event-li {
      width: 290px;
      height: unset;
      flex-wrap: wrap;
      padding: 0;
    }
    .title-date-img {
      height: 120px;
      align-items: center;
      padding: 0 5px;
    }
    .p-button {
      width: 280px;
      height: unset;
      min-height: 100px;
      padding: 0 10px;
    }
    #delete {
      left: 16px;
    }
    #edit {
      left: 120px;
    }
    h2 {
      margin: 0 0 10px 0;
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
    .event-img {
      width: 100px;
      height: 100px;
    }
  }
`
