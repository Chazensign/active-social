import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ActivitiesList from './ActivitiesList'
import EventList from './EventList'
import FriendList from './FriendList'
import styled from 'styled-components'
import Chat from './Chat'
import { setUser } from '../ducks/reducer'

class Member extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      email: '',
      firstName: '',
      lastName: '',
      aboutContent: '',
      birthDate: '',
      city: '',
      state: '',
      zip: 0,
      activities: []
    }
  }

  componentDidMount = () => {
     axios.post('/auth/session').then(res => {
       console.log(res.data.user)
       this.props.setUser(res.data.user)
     })
    if (this.props.match.params.user_id) {
      axios
      .get(`api/member/${+this.props.match.params.user_id}`)
      .then(res => {
        this.setState({
          userId: res.data.id,
          email: res.data.email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          aboutContent: res.data.about_content,
          birthdate: res.data.birth_date,
          city: res.data.city,
          state: res.data.state,
          zip: res.data.zip
        })
      })
      .catch(err => console.log(err)
      )
    }
  }
  // componentDidUpdate = () => {
  //   console.log(this.props.reduxState)
  //   axios.post('/auth/session', {user:{...this.props.reduxState}}).then(res => {
  //     this.props.setUser(res.data.user)
  //   })
  // }

  render() {
    return (
      <MemberPage>
        <h2 className='user-name'>
          {this.state.firstName} {this.state.lastName}
        </h2>
        {this.state.firstName && (
          <Chat
            userId={this.props.match.params.user_id}
            userName={this.state.firstName}
          />
        )}
        <ActivitiesList
          addActiv={false}
          userId={this.props.match.params.user_id}
        />
        <FriendList
          title={'Friends'}
          showChat={false}
          {...this.props}
          userId={this.props.match.params.user_id}
        />
        <EventList userId={this.props.match.params.user_id} />
      </MemberPage>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    reduxState: reduxState,
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName,
    userId: reduxState.userId
  }
}

export default connect(mapStateToProps, { setUser })(Member)

const MemberPage = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:700&display=swap');
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  width: 100vw;
  background: #ebebeb;
  .user-name {
    width: 100vw;
    text-align: center;
    font-size: 58px;
    font-family: 'Noto Sans', sans-serif;
  }
`
