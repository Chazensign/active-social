import React, { Component } from 'react';
import { Switch, Route} from 'react-router'
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
    await axios.post('/auth/register', this.state).then(async res => {
      alert(res.data.message)
      await this.props.setUser(res.data.user)
    })
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
    let activObj = {...this.state.userActivs[i]}
    activObj = {...activObj, [name]: value}
    activeArr[i] = activObj
    this.setState({
      userActivs:  [...activeArr]
    })
  }

  render() {
  
    return (
      <WizardBack>
        <Switch>
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
        </Switch>
      </WizardBack>
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

export default connect(mapStateToProps, {setUser})(Wizard)

const WizardBack = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  /* align-items: center;
  justify-content: center; */
`
