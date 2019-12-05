import React, { Component } from 'react';
import styled from 'styled-components'

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
      userId: 0
    }
  }

  componentDidMount = () => {
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

    return this.props.showEventModal ? (
      <EventModalOuter>
        <div className='create-modal'>
            <div className='title-date-img'>
              <div>
                <h2>{title}</h2>
                <h5>{eventDate}</h5>
                <h5>
                  {city},{state}
                </h5>
              </div>
              <img className='event-img' src={img} alt='' />
            </div>
            <div className='p-button'>
              <p>{content}</p>
              <button>Follow</button>
            </div>
        </div>
      </EventModalOuter>
    ) : null
  }
}
 
export default EventModal;

const EventModalOuter = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  padding-top: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  .create-modal {
    padding: 10px;
    width: 500px;
    height: 500px;
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
  .event-img {
    width: 150px;
    height: 150px;
    overflow: hidden;
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
    position: relative;
  }
  @media (max-width: 800px) {
    height: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding-top: 0;

    .create-modal {
      width: 325px;
      position: initial;
      transform: unset;
    }
    .event-li {
      width: 290px;
      flex-wrap: wrap;
    }
    .input-title {
      margin-left: 6px;
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