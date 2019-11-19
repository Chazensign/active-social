import React, { Component } from 'react';
import { Switch, Route} from 'react-router'
import { connect } from 'react-redux'
import { setUser } from '../ducks/reducer'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import axios from 'axios'


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
      activities: []
    }
  }
  handleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }
  createUser = () => {
    if (this.state.password !== this.state.password2){
      return alert('Passwords do not match.')
    }
    axios.post('/auth/register', this.state)
    .then(res => {
      console.log(res.data.message)
      this.props.setUser(res.data.user)
    })
  }

  render() {
    return (
      <Switch>
        <Route
          path='/wizard/step1'
          render={() => (
            <Step1 createUser={this.createUser} handleChange={this.handleChange} userInfo={this.state} />
          )}
        />
        <Route path='/wizard/step2' component={Step2} />
        <Route path='/wizard/step3' component={Step3} />
      </Switch>
    )
  }
}
 
function mapStateToProps(reduxState) {
  return {
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName
  }
}

export default connect(mapStateToProps, {setUser})(Wizard)