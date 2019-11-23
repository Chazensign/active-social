import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import styled from 'styled-components'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      messages: [],
      room: '',
      roomId: 0,
      userId: 0,
      userId2: 0,
      userName: '',
      userName2: '',
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
      activity: this.props.activity,
      userId: this.props.userId,
      userId2: this.props.userId2
    },() => this.joinRoom())
    
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  sendMessage = () => {
    this.socket.emit('message sent', {
      message: this.state.input,
      roomId: this.state.roomId,
      userId: this.state.userId,
      room: this.state.room
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

  joinRoom = async () => {

    let asignRoomName = () => {
      if (this.state.activity) {
        return this.state.activity
      } else if (this.state.userName2) {
        return {
          room1: `${this.state.userName} and ${this.state.userName2}`,
          room2: `${this.state.userName2} and ${this.state.userName}`
        }
      } else if (this.state.userName) {
        return this.state.userName
      } else {
        console.log('returning null')
        return null
      }
    }
    let roomName = await asignRoomName()
    if (roomName) {
      this.socket.emit('join room', {
        room: roomName
      })
    }
  }
  joinSuccess = data => {
    this.setState({
      roomId: data.roomId,
      room: data.room,
      joined: true,
      messages: data.messages
    })
  }
  render() {
    return (
      <ChatBox background={this.props.privateChat} >
        {this.state.joined ? <h1>{this.state.room}</h1> : null}
        <div className='messages-cont'>
          {this.state.messages.map(messageObj => (
            <div 
              className={ this.state.userId === messageObj.user_id ? 'user-message message': 'others-message message'} 
              key={messageObj.message_id} >
              <p >{messageObj.message}</p>
            </div>
          ))}
        </div>
          <div>
            <input
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
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName,
    userId: reduxState.userId
  }
}

export default connect(mapStateToProps)(Chat)




const ChatBox = styled.div`
  margin: 0 20px 0 20px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .messages-cont {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    box-sizing: border-box;
    height: 400px;
    width: 250px;
    background: ${props => (props.background ? 'red' : 'white')};
    box-shadow: inset 0px 0px 4px 1px #000000;
    border-radius: 3px;
    overflow: scroll;
    padding-bottom: 70px;
  }
  .message {
    box-sizing: border-box;
    max-width: 175px;
    padding: 2px 7px 2px 7px;
    margin: 5px;
    border-radius: 10px;
    font-size: 14px;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.8);
  }
  .user-message {
    background: #04ff00;
    align-self: flex-end;
  }
  .others-message {
    background: #0073ff;
    align-self: flex-start;
    color: white;
  }
  .message p {
    padding: 0;
    margin: 0;
  }
`






