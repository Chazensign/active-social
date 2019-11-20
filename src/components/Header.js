import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../ducks/reducer'
import { withRouter } from 'react-router-dom'
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
        this.showLogin()
        this.props.setUser(res.data.user)
        this.props.history.push(`/user/${this.props.userId}`)
        alert(res.data.message)
      })
      .catch(err => {
        alert(err.message)
      })
  }

  showLogin = () => {
    this.setState({ loginDisp: !this.state.loginDisp });
  }

  render() {
    return (
      <>
        <header>
          <Link to='/'><h1>Logo/Title</h1></Link>
          <nav>
          {!this.state.loginDisp ? (
            <div onClick={this.showLogin} >Login</div>
          ) : (
            <div onClick={this.showLogin} >Cancel</div>

          )}
          <Link to='/wizard/step1'>Register</Link>
          </nav>
          <div>
            <img hidden={!this.props.profilePic} src={this.props.profilePic} alt='profile' />
            <div>{this.props.firstName}</div>
          </div>
        </header>
        {this.state.loginDisp ? (
          <Login
            login={this.login}
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
          />
        ) : null}
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

export default withRouter(connect(mapStateToProps, {setUser})(Header))
