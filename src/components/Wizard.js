import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import { setUser } from '../ducks/reducer'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import axios from 'axios'
import styled from 'styled-components'

class Wizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      city: '',
      state: '',
      zip: 0,
      activities: [],
      userActivs: []
    }
  }

  componentDidMount = () => {
    if (this.props.userId) {
      axios.get(`/api/member/${this.props.userId}`).then(res => {
        this.setState({
          email: res.data.email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          birthDate: res.data.birth_date,
          city: res.data.city,
          state: res.data.state,
          zip: res.data.zip
        })
      })
    }
    axios.get('/api/activities').then(res => {
      this.setState({ activities: res.data })
    })
  }

  handleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }

  createUser = async () => {
    if (this.state.password !== this.state.password2) {
      return alert('Passwords do not match.')
    }
    await axios
      .post('/auth/register', this.state)
      .then(res => {
        alert(res.data.message)
        this.props.setUser(res.data.user)

        this.setState({
          email: '',
          password: '',
          password2: '',
          firstName: '',
          lastName: '',
          birthDate: '',
          city: '',
          state: '',
          zip: 0,
          activities: [],
          userActivs: []
        })
      })
      .catch(err => alert(err))
    this.props.history.push(`/user/${this.props.userId}`)
  }

  addActivity = allActivBoxes => {
    let userActs = []
    for (var i = 0; i < allActivBoxes.length; i++) {
      if (allActivBoxes[i].checked) {
        userActs.push({
          activId: allActivBoxes[i].value,
          activTitle: allActivBoxes[i].id,
          lessons: false
        })
      }
      this.setState({ userActivs: userActs })
    }
  }

  updateUserActivs = (name, value, i) => {
    let activeArr = [...this.state.userActivs]
    let activObj = { ...this.state.userActivs[i] }
    activObj = { ...activObj, [name]: value }
    activeArr[i] = activObj
    this.setState({
      userActivs: [...activeArr]
    })
  }
  updateProfile = async () => {
    console.log('hitting wiz fn')
    const {
      email,
      password,
      password2,
      firstName,
      lastName,
      birthDate,
      city,
      state,
      zip
    } = this.state
    await axios
      .put('/api/user/update', {
        email,
        password,
        password2,
        firstName,
        lastName,
        birthDate,
        city,
        state,
        zip,
        userId: this.props.userId
      })
      .then(res => {
        this.props.setUser(res.data.user)
        alert(res.data.message)
      })
    this.props.history.push(`/user/${this.props.userId}`)
  }

  render() {
    return (
      <>
        <Switch>
          <Route
            path='/wizard/step1/:userId'
            render={() => (
              <Step1
                updateProfile={this.updateProfile}
                edit={true}
                {...this.props}
                handleChange={this.handleChange}
                userInfo={this.state}
              />
            )}
          />
          <Route
            path='/wizard/step2/:userId'
            render={() => (
              <Step2
                history={this.props.history}
                activities={this.state.activities}
                addActivity={this.addActivity}
              />
            )}
          />
          <WizardBack>
            <Route
              path='/wizard/step1'
              render={() => (
                <Step1
                  {...this.props}
                  handleChange={this.handleChange}
                  userInfo={this.state}
                />
              )}
            />

            <Route
              path='/wizard/step2'
              render={() => (
                <Step2
                  history={this.props.history}
                  activities={this.state.activities}
                  addActivity={this.addActivity}
                />
              )}
            />
            <Route
              path='/wizard/step2/:userId'
              render={() => (
                <Step2
                  edit={this.props}
                  {...this.props}
                  activities={this.state.activities}
                  addActivity={this.addActivity}
                />
              )}
            />
            <Route
              path='/wizard/step3'
              render={() => (
                <Step3
                  {...this.props}
                  createUser={this.createUser}
                  userActivs={this.state.userActivs}
                  updateUserActivs={this.updateUserActivs}
                />
              )}
            />
          </WizardBack>
        </Switch>
      </>
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

export default connect(mapStateToProps, { setUser })(Wizard)

const WizardBack = styled.div`
  position: relative;
  background: rgba(0, 83, 166, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 2;
  /* margin-top: 80px; */
  /* align-items: center;
  justify-content: center; */
`
