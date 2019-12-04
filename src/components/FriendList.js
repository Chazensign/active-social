import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { updateFriends } from '../ducks/reducer'
class FriendList extends Component {
  static getDerivedStateFromProps = (props, state) => {
    if (props.friendList !== state.friends) return { 
      friends: props.friendList
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }
  componentDidMount = () => {
    if (this.props.userId && this.props.requests) {
      axios.get(`/api/friend/requests/${this.props.userId}`).then(res => {
        this.setState({ friends: res.data })
      })
    } else if (this.props.userId) {
      console.log(this.props.friendList)
      this.setState({ friends: this.props.friendList })
    } else if (this.props.userNames) {
      this.setState({ friends: [...this.props.userNames] })
    }
  }
  goToUserPage = id => {
    this.props.history.push(`/member/${id}`)
    window.location.reload(true)
  }
  addFriend = id => {
    axios
      .post(`/api/friends/${id}`)
      .then(res => this.props.updateFriends(res.data.friends))
  }
  confirmFriend = id => {
    axios.put(`/api/friend/request/${id}`).then(res => {
      this.setState({ friends: res.data.friends })
      this.props.updateFriends(res.data.friends)
    Swal.fire({
      icon: 'success',
      title: res.data.message,
      showConfirmButton: false,
      timer: 1000
    })
    })
  }
  denyFriend = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will remove this request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        axios.delete(`/api/friend/request/${id}`).then(res => {
          this.setState({ friends: res.data })
          Swal.fire({
            icon: 'success',
            title: 'This request has been removed.',
            showConfirmButton: false,
            timer: 1000
          })
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your connection remains :)', 'error')
      }
    })
  }
  removeFriend = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will remove this connection.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.value) {
        axios.delete(`/api/friends/${id}`).then(res => {
          this.setState({ friends: res.data })
          this.props.updateReduxFriends()
          Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Your connection has been removed.',
            showConfirmButton: false,
            timer: 1000
          })
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your connection remains :)', 'error')
      }
    })
  }
  render() {
    return (
      <FriendContainer>
        <div className='contact-cont'>
          <h2>{this.props.title}</h2>
          {this.state.friends ? (
            this.state.friends.map(friend => {
              return (
                <div key={friend.id}>
                  <div onClick={() => this.goToUserPage(friend.id)}>
                    <img src={friend.profile_img} alt='' />
                    <h3>
                      {friend.first_name} {friend.last_name}
                    </h3>
                  </div>
                  {this.props.userId > 0 ? (
                    <>
                      <button
                        className='chat-confirm'
                        onClick={() =>
                          this.props.showPrivateChat(
                            friend.id,
                            friend.first_name
                          )
                        }>
                        Chat
                      </button>
                      {this.props.remove && (
                        <button onClick={() => this.removeFriend(friend.id)}>
                          Remove
                        </button>
                      )}
                    </>
                  ) : (
                    <button onClick={() => this.addFriend(friend.id)}>
                      Connect
                    </button>
                  )}
                  {this.props.requests ? (
                    <>
                      <button
                        className='chat-confirm'
                        onClick={() => this.confirmFriend(friend.id)}>
                        Confirm
                      </button>
                      <button onClick={() => this.denyFriend(friend.id)}>
                        Deny
                      </button>
                    </>
                  ) : null}
                </div>
              )
            })
          ) : (
            <ReactLoading
              type={'spokes'}
              color={'grey'}
              height={'75px'}
              width={'75px'}
            />
          )}
        </div>
      </FriendContainer>
    )
  }
}
function mapStateToProps(reduxState) {
  return {
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName,
    lastName: reduxState.lastName,
    userId: reduxState.userId,
    friends: reduxState.friends
  }
}
export default connect(mapStateToProps, { updateFriends })(FriendList)
const FriendContainer = styled.div`
  height: 450px;
  width: 300px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px grey;
  border-radius: 6px;
  margin: 10px;
  h2 {
    box-sizing: border-box;
    width: 296px;
    margin: 2px 0 0 2px;
    padding: 5px;
    background: #14396a;
    color: #63b8ee;
    border-radius: 4px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .contact-cont h3 {
    margin: 0;
  }
  .contact-cont h3:hover {
    cursor: pointer;
  }
  button {
    margin: 10px;
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    font-size: 14px;
    font-weight: bold;
    padding: 2px 10px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
  }
  button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
`
