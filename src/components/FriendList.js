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
    if (this.props.userId) {
    axios.get(`/api/friends/${this.props.userId}`)
    .then(res => this.setState({ friends: res.data }))
    }
  }
  goToUserPage = (id) => {
    this.props.history.push(`/member/${id}`)
    window.location.reload(true)
  }

  render() {
    console.log(this.props)
    return (
      <FriendContainer>
      <div className='contact-cont'>
        {this.state.friends.map(friend => {
          return (
            <div key={friend.id}>
              <div onClick={() => this.goToUserPage(friend.id)}>
                <img src={friend.profile_img} alt='' />
                <h3>
                  {friend.first_name} {friend.last_name}
                </h3>
              </div>
              <button
                onClick={() =>
                  this.props.showPrivateChat(friend.id, friend.first_name)
                }>
                Chat
              </button>
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
  height: 400px;
  width: 200px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 3px;
  margin: 20px;

  .contact-cont h3 {
    margin: 0;
  }
  .contact-cont h3:hover {
    cursor: pointer;
  }
`
