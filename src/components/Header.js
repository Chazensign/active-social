import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../ducks/reducer'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import bars from '../bars.svg'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      display: false,
      loginDisp: false,
      hidden: true
    }
  }
  handleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }

  submitLogin = () => {
    axios
      .post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        this.setState({ hidden: true });
        this.props.setUser(res.data.user)
        this.props.history.push(`/user/${this.props.userId}`)
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1000
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire(err.response.data.message)
      })
  }

  toUserProfile = () => {
    this.props.history.push(`/user/${this.props.userId}`)
  }

  closeLogin = event => {
   let location = document.getElementsByClassName('show-login')
   location = location[0]
    if (event.target === location || event.target === 'go') {
      this.login.classList.remove('hide-login')
      this.login.classList.add('return-login')
      setTimeout(() => {
        this.setState({ hidden: true, loginDisp: false }, () => {
          document.removeEventListener('click', this.closeLogin)
        })
      }, 400)
    }
  }

  showLogin = () => {
    this.setState({ loginDisp: !this.state.loginDisp })
    this.login.classList.remove('hide-login')
    this.login.classList.add('show-login')
    this.setState({ hidden: false }, () => {
      document.addEventListener('click', this.closeLogin)
    })
  }
  assignLogin =(element) => {
    this.login = element
  }


  render() {
     
    return (
      <FunctionalHeader>
        <header>
          <Link to='/'>
            <h1>Logo/Title</h1>
          </Link>

          {!this.state.loginDisp && !this.props.firstName ? (
            <nav>
              <div className='login' onClick={this.showLogin}>
                Login
              </div>
              <Link to='/wizard/step1'>Register</Link>
              <Link to='/wizard/explore'>Explore</Link>
            </nav>
          ) : (
            <div>
              <img
                hidden={!this.props.profilePic}
                src={this.props.profilePic}
                alt='profile'
              />
              <div className='username' onClick={this.toUserProfile}>{this.props.firstName}</div>
            </div>
          )}
        </header>
        <img className='bars' src={bars} alt='menu'/>
        <div
          
          >
          <Login
            assignLogin={this.assignLogin}
            hidden={this.state.hidden}
            login={this.submitLogin}
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
          />
        </div>
      </FunctionalHeader>
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

const FunctionalHeader = styled.div`
  header {
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #161a1ff7;
    color: white;
    padding: 0 70px 0 70px;
    position: fixed;
    top: 0px;
    z-index: 2;
  }
  header h1 {
    margin-right: 300px;
  }
  header a {
    text-decoration: none;
    color: #63b8ee;
  }
  .username {
    font-size: 18px;
    font-weight: 700;
  }
  .username:hover {
    cursor: pointer;
  }
  header nav {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    justify-content: space-between;
    color: #63b8ee;
    width: 500px;
    min-width: 230px;
  }
  .login:hover {
    cursor: pointer;
  }
  .bars {
    display: none;
  }
  @media (max-width: 800px) {
   header nav {
      display: none;
    }
    .bars {
      display: inline;
      width: 50px;
      height: 50px;
      position: absolute;
      right: 30px;
      top: 20px;
      z-index: 10;
    }
  }
`
