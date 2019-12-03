import React, { Component } from 'react'
import io from 'socket.io-client'
import {connect } from 'react-redux'
import styled from 'styled-components'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      messages: [],
      roomId: 0,
      userId: 0,
      userId2: 0,
      userName: '',
      userName2: '',
      activId: 0,
      activName: '',
      joined: false
    }
  }

  componentDidMount = async () => {
    this.socket = io()
    this.socket.on('room joined', data => {
      this.joinSuccess(data)
    })
    this.socket.on('message dispatched', data => {
      this.updateMessages(data)
    })
    this.setState({
      userName: this.props.userName,
      userName2: this.props.userName2,
      activName: this.props.activName,
      activId: this.props.activity,
      userId: this.props.userId,
      userId2: this.props.userId2
    },() => this.joinRoom())
    
  }

  componentWillUnmount() {
    this.socket.disconnect()
    this.setState({
      input: '',
      messages: [],
      roomId: 0,
      userId: 0,
      userId2: 0,
      userName: '',
      userName2: '',
      activId: 0,
      activName: '',
      joined: false
    })
  }

  sendMessage = () => {
    this.socket.emit('message sent', {
      message: this.state.input,
      roomId: this.state.roomId,
      userId: this.props.loggedInId
    })
    this.setState({
      input: ''
    })
  }

  updateMessages = messages => {
    this.setState({
      messages
    })
  }

  joinRoom = () => {
      this.socket.emit('join room', {
        userId: this.state.userId,
        userId2: this.state.userId2,
        activId:this.state.activId,
      })
  }
  joinSuccess = data => {
    this.setState({
      roomId: data.roomId,
      joined: true,
      messages: data.messages
    })
  }
  
  render() {
    
    return (
      <ChatBox background={this.props.privateChat}>
        {this.state.userName2 ? (
          <h2>
            {this.state.userName} and {this.state.userName2}'s Chat
            <div className='close' onClick={this.props.hide}>x</div>
          </h2>
        ) : (
          this.props.userName && <h2>{this.props.userName}'s Public Chat</h2>
        )}
        {this.state.activName && <h2>Public {this.state.activName} Chat</h2>}
        {this.state.messages.map(messageObj => {
          return (
            <div
              className={
                +this.props.loggedInId === +messageObj.user_id
                  ? 'user-message message'
                  : 'others-message message'
              }
              key={messageObj.message_id}>
              <p>{messageObj.message}</p>
            </div>
          )
        })}
        <div className='input-send'>
          <input
            className='chat-input'
            maxLength='100'
            value={this.state.input}
            onChange={e => {
              this.setState({
                input: e.target.value
              })
            }}
          />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </ChatBox>
    )
  }
}
function mapStateToProps(reduxState) {
  return {
    loggedInId: reduxState.userId,
  }
}

export default connect(mapStateToProps)(Chat)




const ChatBox = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 10px;
  height: 450px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 6px;
  overflow: scroll;
  padding-bottom: 70px;

  h2 {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    width: 296px;
    margin: 2px 0 0 0;
    padding: 5px;
    background: #14396a;
    color: #63b8ee;
    border-radius: 4px;
    font-size: 24px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .close {
    position: absolute;
    right: 2px;
    top: -4px;
    font-size: 20px;
    color: white;
  }
  .close:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  .message {
    box-sizing: border-box;
    max-width: 175px;
    padding: 4px 8px 4px 8px;
    margin: 5px;
    border-radius: 10px;
    font-size: 14px;
  }
  .user-message {
    background: #bee2f9;
    color: #14396a;
    align-self: flex-end;
  }
  .others-message {
    background: #b8b8b8;
    align-self: flex-start;
    color: white;
  }
  .message p {
    padding: 0;
    margin: 0;
  }
  .input-send {
    position: absolute;
    bottom: 0;
  }
  .input-send button {
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
  .input-send button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .chat-input {
    background: transparent;
    height: 28px;
    border-radius: 6px;
    font-size: 16px;
    width: 207px;
    border: none;
    border-top: 1px solid grey;
  }
`






