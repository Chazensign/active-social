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
    if (this.props.match.params.user_id) {
      axios.post('/auth/session').then(res => {
        this.props.setUser(res.data.user)
      })
      axios.get(`api/member/${+this.props.match.params.user_id}`).then(res => {
        console.log(res)
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
    }
  }
  componentDidUpdate = () => {
    axios.post('/auth/session').then(res => {
      console.log(res)
      this.props.setUser(res.data.user)
    })
  }

  render() {
    return (
      <MemberPage>
        <h2 className='user-name'>
          {this.state.firstName} {this.state.lastName}
        </h2>
        {this.state.firstName && <Chat userName={this.state.firstName} />}
        <ActivitiesList userId={this.props.match.params.user_id} />
        <EventList userId={this.props.match.params.user_id} />
        <FriendList title={'Friends'} showChat={false} {...this.props} userId={this.props.match.params.user_id} />
      </MemberPage>
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

export default connect(mapStateToProps, { setUser })(Member)

const MemberPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  min-height: 100vh;
  background: grey;
  margin-top: 80px;
  .user-name {
    width: 100vw;
    text-align: center;
  }
`
