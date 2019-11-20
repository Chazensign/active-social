import React, { Component } from 'react'
import './Chat.css'
import io from 'socket.io-client'
import { connect } from 'react-redux'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      messages: [],
      room: '',
      roomId: 0,
      userName: '',
      userName2: '',
      activity: '',
      joined: false
    }
  }

  componentDidMount = () => {
    this.socket = io()
    this.socket.on('room joined', data => {
      this.joinSuccess(data)
    })
    this.socket.on('message dispatched', data => {
      this.updateMessages(data)
    })
    this.setState(
      {
        userName: this.props.userName,
        userName2: this.props.userName2,
        activity: this.props.activity
      })
    this.joinRoom()
  }

  // componentWillUnmount() {
  //   this.socket.disconnect()
  // }

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

  joinRoom = () => {
    let roomName = ''
    if (this.state.activity) {
      roomName = this.state.activity
    } else if (this.state.userName2) {
      roomName = `${this.state.userName} and ${this.state.userName2}`
    } else {
      roomName = `${this.props.userName}'s Public Chat`
    }
    if (this.state.room) {
      this.socket.emit('join room', {
        roomId: this.state.roomId,
        room: roomName
      })
    }
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
      <div className='chat-box'>
        {this.state.joined ? <h1>My Room: {this.state.room}</h1> : null}
        <div className='messages-cont'>
          {this.state.messages.map(messageObj => (
            <p key={messageObj.message_id}>{messageObj.message}</p>
          ))}
        </div>
        {this.state.joined ? (
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
        ) : (
          <div>
            <input
              value={this.state.room}
              onChange={e => {
                this.setState({
                  room: e.target.value
                })
              }}
            />
            <button onClick={this.joinRoom}>Join</button>
          </div>
        )}
      </div>
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
