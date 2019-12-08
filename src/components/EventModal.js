import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MapContainer from './MapContainer'

class EventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateLimit: '',
      eventDate: '',
      title: '',
      content: '',
      street: '',
      city: '',
      state: '',
      zip: 0,
      img: '',
      eventId: 0,
      userId: 0,
      eventLocation: {},
      showMap: false,
      mapStreet: '',
      mapCity: '',
      mapState: ''
    }
  }

  componentDidMount = () => {
    console.log()
    const {
      date,
      ev_title,
      content,
      street,
      city,
      state,
      event_zip,
      img,
      event_id,
      user_id
    } = this.props.event
    this.setState({
      eventDate: date,
      title: ev_title,
      content: content,
      street: street,
      city: city,
      state: state,
      zip: event_zip,
      img: img,
      eventId: event_id,
      userId: user_id
    })
    axios
      .post('/api/google/location', { street, city, state, event_zip })
      .then(res => {
        console.log(res)
        this.setState({ 
          showMap: true,
          eventLocation: res.data.location,
          mapStreet: res.data.street,
          mapCity: res.data.city,
          mapState: res.data.state
        })
      })
  }
  googleMapDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.state.mapStreet},${this.state.mapCity},${this.state.mapState}&travelmode=driving`)
  }

  render() {
    let {
      eventDate,
      title,
      content,
      city,
      state,
      img
    } = this.state

    return this.props.showEventModal ? (
      <EventModalOuter>
        <div className='event-modal'>
          <div className='upper-half'>
            <div className='title-address'>
              <h1 className='title'>{title}</h1>
              <div className='date-address' >
                <h5>{eventDate}</h5>
                <h5>
                  {city},{state}
                </h5>
              </div>
              <img className='event-img' src={img} alt='' />
            </div>
            {this.state.showMap ? (
              <div id='map-div'>
                <MapContainer
                  {...this.props}
                  pos={this.state.eventLocation}
                />
              </div>
            ) : null}
          </div>
          <p>{content}</p>
          <div className='buttons'>
            <button onClick={() => this.props.dispEventModal()}>Close</button>
            <button onClick={() => this.googleMapDirections()}>
              Directions
            </button>
            {!this.props.usersEvents.includes(this.state.eventId) && <button onClick={() => this.props.addEventToUser(this.state.eventId)}>
              Follow
            </button>}
          </div>
        </div>
      </EventModalOuter>
    ) : null
  }
}

export default EventModal

const EventModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  padding-top: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  .event-modal {
    position: relative;
    padding: 10px;
    width: 500px;
    height: 500px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(250px, -350px);
    border-radius: 10px;
    box-shadow: 5px 5px 15px 5px #000000;
  }
  .upper-half {
    position: absolute;
    left: 18px;
    top: 10px;
    width: 230px;
    display: flex;
    justify-content: space-between;
  }
  #map-div > div > div {
    position: relative;
  }
  #map-div > div {
    position: relative;
  }
  h5 {
    width: 200px;
    margin: 5px 0;
  }

  .buttons button {
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
  .buttons button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .buttons button:active {
    position: relative;
    top: 1px;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 400px;
  }
  p {
    width: 400px;
  }
  .title {
    box-sizing: border-box;
    width: 200px;
    margin: 2px 0 0 0;
    padding: 5px;
    color: #14396a;
  }
  .event-img {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 12px;
  }
  .title-date-img {
    display: flex;
    flex-direction: column;
    width: 400px;
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
    position: relative;
  }
  @media (max-width: 800px) {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding-top: 0;

    .event-modal {
      width: 325px;
      height: 700px;
      position: initial;
      transform: unset;
      margin-bottom: 85px;
    }
    .upper-half {
      width: 325px;
      flex-direction: column;
    }
    .title-address {
      width: 345px;
    }
    .date-address {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .event-li {
      width: 290px;
      flex-wrap: wrap;
    }
    .title {
      width: 300px;
      margin-left: 6px;
    }

    h5 {
      margin: 3px 5px;
      font-size: 16px;
      font-weight: normal;
    }
    p {
      height: 100px;
      width: auto;
      margin: 10px 0;
    }
    .event-li img {
      width: 100px;
      height: 100px;
    }
    #map-div {

      margin: 10px 0 0 45px;
      height: 250px;
      contain: content;
    }
    .buttons {
      width: 300px;
    }
    .buttons button {
      padding: 2px 10px;
    }
  }
`
