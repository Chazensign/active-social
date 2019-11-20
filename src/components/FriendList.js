import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class FriendList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }
  componentDidMount = () => {
    axios.get(`/api/friends/${this.props.userId}`)
    .then(res => this.setState({ friends: res.data }))
  }

  render() {
    return (
      <div className='contact-cont'>
        {this.state.friends.map(friend => {
          return (
            <div key={friend.id}>
              <Link to={`/member/${friend.id}`}>
                <div>
                  <img src={friend.profile_img} alt='' />
                  <h3>
                    {friend.first_name} {friend.last_name}
                  </h3>
                </div>
              </Link>
              <button onClick={() => this.props.showPrivateChat(friend.id)}>
                Chat
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default FriendList
