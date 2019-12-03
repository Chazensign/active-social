import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class CreateEvent extends Component {
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
      activId: 0
    }
  }
  componentDidMount = () => {
    this.setState({ activId: this.props.activId })
  }
  handleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }
  submitEvent = () => {
    axios.post('/api/events', this.state).then(res => {
      this.props.updateEvents(res.data)
      alert(res.data.message)
    })
    this.props.showAddEvent()
    this.setState({
      dateLimit: '',
      eventDate: '',
      title: '',
      content: '',
      street: '',
      city: '',
      state: '',
      zip: 0,
      img: '',
      activId: 0
    })
  }

  getDate = (input) => {
  
    let morningOrNight = ''
    function ISODateString(d) {
      function pad(n) {
        return n < 10 ? '0' + n : n
      }
      function fromMill(h) {
         if (h > 13) {
           amPm('pm')
           return h - 12 
         }
         else {
           amPm('am')
          return h
         }
      }
      function amPm(input) {
        morningOrNight = input
      }
      let date = pad(d.getUTCMonth() + 1) +
      '/' +
      pad(d.getUTCDate()) +
      '/' +
      d.getUTCFullYear()
      
      let time = fromMill(d.getUTCHours() + 5) +
      ':' +
      pad(d.getUTCMinutes()) +
      ` ${morningOrNight}`
      return (
        `${date} ${time}`
      )
    }
    const d = new Date(input)
    const finalDate = ISODateString(d)
    this.setState({
      eventDate: finalDate
    })
  }

  render() {
    let {
      eventDate,
      title,
      content,
      street,
      city,
      state,
      zip,
      img
    } = this.state
    return this.props.addEvent ? (
      <EventCreator>
        <div className='create-modal'>
          <div className='event-li'>
            <div className='title-date-img'>
              <div>
                <h4>{title}</h4>
                <h2>
                  {eventDate}
                </h2>
                <h6>
                  {city},{state}
                </h6>
              </div>
              <img src={img} alt='' />
            </div>
            <div className='p-button'>
              <p>{content}</p>
              <button>Follow</button>
            </div>
          </div>
          <div className='input-title'>Title:</div>
          <input
            required
            name='title'
            value={title}
            onChange={e => this.handleChange(e.target)}
          />
          <div className='input-title'>Street:</div>
          <input
            required
            name='street'
            value={street}
            onChange={e => this.handleChange(e.target)}
          />
          <div className='input-title'>City:</div>
          <input
            required
            name='city'
            value={city}
            onChange={e => this.handleChange(e.target)}
          />
          <div className='input-title'>State:</div>
          <input
            required
            maxLength='2'
            name='state'
            value={state}
            onChange={e => this.handleChange(e.target)}
          />
          <div className='input-title'>Zip:</div>
          <input
            required
            maxLength='5'
            name='zip'
            value={zip}
            onChange={e => this.handleChange(e.target)}
            type='number'
          />{' '}
          <div className='input-title'>Date/Time:</div>
          <input
            type='datetime-local'
            // value={eventDate}
            name='eventDate'
            min={this.state.dateLimit}
            onChange={e => this.getDate(e.target.value)}
          />
          <div className='input-title'>Image Link:</div>
          <input
            name='img'
            value={img}
            onChange={e => this.handleChange(e.target)}
            type='text'
          />
          <div className='input-title'>About:</div>
          <textarea
            required
            name='content'
            value={content}
            onChange={e => this.handleChange(e.target)}
            type='text'
          />
          <div className='button-cont'>
            <button onClick={() => this.submitEvent()}>Submit</button>
            <button onClick={this.props.showAddEvent}>Cancel</button>
          </div>
        </div>
      </EventCreator>
    ) : null
  }
}

export default CreateEvent

const EventCreator = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  padding-top: 80px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  .create-modal {
    padding: 10px;
    width: 500px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(250px, -350px);
    border-radius: 10px;
    box-shadow: 5px 5px 15px 5px #000000;
  }
  .create-modal input {
    width: 300px;
    height: 20px;
    font-size: 14px;
    border-radius: 3px;
  }
  .input-title {
    align-self: flex-start;
    margin-left: 80px;
    padding-top: 8px;
    font-weight: 600;
    font-size: 20px;
  }
  textarea {
    width: 300px;
    height: 100px;
  }
  .button-cont {
    width: 300px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .button-cont button {
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
  .button-cont button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .button-cont button:active {
    position: relative;
    top: 1px;
  }
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
    margin: 2px 0 0 0;
    padding: 5px;
    background: #63b8ee;
    color: #14396a;
    border-radius: 4px;
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
