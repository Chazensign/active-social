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
  createUser = () => {
    if (this.state.password !== this.state.password2) {
      return alert('Passwords do not match.')
    }
    axios.post('/auth/register', this.state).then(async res => {
      alert(res.data.message)
      await this.props.setUser(res.data.user)
      this.props.history.push(`/user/${this.props.userId}`)
    })
  }
  addActivity = allActivBoxes => {
      let userActs = []
      console.log(allActivBoxes[0].checked)
      for (var i = 0; i < allActivBoxes.length; i++) {
        if (allActivBoxes[i].checked) {
          userActs.push({
            activId: allActivBoxes[i].value,
            activTitle: allActivBoxes[i].id
          })
      }
      this.setState({ userActivs: userActs })
    }
  }

  updateUserActivs = (trg, i) => {
    let activObj = {...this.state.userActivs[i]}
    activObj = activObj[trg.name] = trg.value
    this.setState({
      userActivs: [...this.state.userActivs, this.state.userActivs[i]: activObj ]
    })
  }

  render() {
    console.log(this.state.userActivs)

    return (
      <WizardBack>
        <Switch>
          <Route
            path='/wizard/step1'
            render={() => (
              <Step1
                createUser={this.createUser}
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
  align-items: center;
  justify-content: center;
`
