import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class FriendList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }
  componentDidMount = () => {
    if (this.props.userId && this.props.requests) {
      console.log('requests hitting')
      axios
        .get(`/api/friend/requests/${this.props.userId}`)
        .then(res => {
          console.log(res)
          this.setState({ friends: res.data })
        })
    }else if (this.props.userId) {
        axios
          .get(`/api/friends/${this.props.userId}`)
          .then(res => this.setState({ friends: res.data }))
      } else if (this.props.userNames) {
        this.setState({ friends: [...this.props.userNames] })
      }
  }
  goToUserPage = (id) => {
    this.props.history.push(`/member/${id}`)
    window.location.reload(true)
  }

  addFriend = (id) => {
    axios.post(`/api/friends/${id}`)
  }

  confirmFriend = (id) => {
    axios.put(`/api/friend/request/${id}`)
    .then(res => {
      this.componentDidMount()
      alert(res.data.message)
    })
  }

  render() {
  
    return (
      <FriendContainer>
      <div className='contact-cont'>
    <h2>{this.props.title}</h2>
        {this.state.friends.map(friend => {
          return (
            <div key={friend.id}>
              <div onClick={() => this.goToUserPage(friend.id)}>
                <img src={friend.profile_img} alt='' />
                <h3>
                  {friend.first_name} {friend.last_name}
                </h3>
              </div>
              {typeof this.props.userId === 'number' ? (
                <button
                  onClick={() =>
                    this.props.showPrivateChat(friend.id, friend.first_name)
                  }>
                  Chat
                </button>
              ) : (
                <button onClick={() => this.addFriend(friend.id)}>
                  Connect
                </button>
              )}
              {this.props.requests ? (
                <button onClick={() => this.confirmFriend(friend.id)}>
                  Confirm
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
      </FriendContainer>
    )
  }
}

export default FriendList


const FriendContainer = styled.div`
  height: 450px;
  width: 300px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 6px;
  margin: 10px;
  h2 {
    box-sizing: border-box;
    width: 296px;
    margin: 2px 0 0 2px;
    padding: 5px;
    background: #63b8ee;
    color: #14396a;
    border-radius: 4px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .contact-cont h3 {
    margin: 0;
  }
  .contact-cont h3:hover {
    cursor: pointer;
  }
`
