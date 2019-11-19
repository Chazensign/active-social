import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import axios from 'axios'
import { setUser } from '../ducks/reducer'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      display: false,
      loginDisp: false
    }
  }
  handleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }

  login = () => {
    axios
      .post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        this.props.setUser(res.data.user)
        alert(res.data.message)
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }

  showLogin = () => {
    this.setState({ loginDisp: !this.state.loginDisp });
  }

  render() {
    return (
      <>
        <header>
          <h1>Logo/Title</h1>
          <div onClick={this.showLogin} >Login</div>
          <div>
            <img src={this.props.profilePic} alt='profile' />
            <div>{this.props.firstName}</div>
          </div>
        </header>
        {this.state.loginDisp ? <Login
          login={this.login}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
        /> : null}
      </>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName
  }
}

export default connect(mapStateToProps, {setUser})(Header)
