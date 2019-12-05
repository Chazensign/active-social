import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setUser, clearUser } from '../ducks/reducer'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import bars from '../bars.svg'
import DropDownMenu from './DropDownMenu'
import UserDropDown from './UserDropDown'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      display: false,
      loginDisp: false,
      hidden: true,
      hiddenMenu: true,
      menuDisp: false
    }
  }

  componentDidMount = () => {
    axios.post('/auth/session').then(res => {
      this.props.setUser(res.data.user)
    })
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
        this.setState({
          hidden: true,
          email: '',
          password: ''
        })
        this.props.setUser(res.data.user)
        this.props.history.push(`/user/${this.props.userId}`)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: true
        })
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
  assignLogin = element => {
    this.login = element
  }
  showMenu = value => {
    this.setState({ menuDisp: value })
    this.login.classList.remove('hide-back')
    this.login.classList.add('show-back')
    this.setState({ hiddenMenu: false }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }
  closeMenu = (event) => {
    let location = document.getElementsByClassName('show-back')
    location = location[0]
    if (event.target === location || event.target === 'go') {
      this.login.classList.remove('hide-back')
      this.login.classList.add('return-back')
      setTimeout(() => {
        this.setState({ hiddenMenu: true, menuDisp: false }, () => {
          document.removeEventListener('click', this.closeMenu)
        })
      }, 400)
    }
  }
  assignMenu = element => {
    this.menu = element
  }
  logout = () => {
    axios.delete('/auth/logout').then(res => {
      this.setState({ loginDisp: false })
      this.props.clearUser()
      this.props.history.push('/')
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  render() {
    return (
      <FunctionalHeader>
        <header>
          <Link to='/'>
            <h1>Logo/Title</h1>
          </Link>
          {!this.state.loginDisp && !this.props.firstName ? (
            <nav className='login-nav'>
              <div className='login' onClick={this.showLogin}>
                Login
              </div>
              <Link to='/wizard/step1'>Register</Link>
              <Link to='/wizard/explore'>Explore</Link>
            </nav>
          ) : (
            <div className='logout-nav'>
              <div className='username-pic'>
                <img
                  hidden={!this.props.profilePic}
                  src={this.props.profilePic}
                  alt='profile'
                />
                <div className='username' onClick={this.toUserProfile}>
                  {this.props.firstName}
                </div>
              </div>
              <nav className='logout' onClick={this.logout}>
                Logout
              </nav>
            </div>
          )}
          <div className='initals-bars'>
            {this.props.firstName && (
              <div onClick={this.toUserProfile} className='user-initials'>
                {this.props.firstName.charAt(0)}
                {this.props.lastName.charAt(0)}
              </div>
            )}
            <img
              className={!this.props.firstName ? 'bars regular' : 'bars small'}
              onClick={() => this.showMenu('flex')}
              src={bars}
              alt='menu'
            />
          </div>
          {!this.props.firstName ? (
            <DropDownMenu
              assignMenu={this.assignMenu}
              closeMenu={this.closeMenu}
              hiddenMenu={this.state.hiddenMenu}
              showLogin={this.showLogin}
            />
          ) : (
            <UserDropDown
              assignMenu={this.assignMenu}
              closeMenu={this.closeMenu}
              hiddenMenu={this.state.hiddenMenu}
              logout={this.logout}
              loggedInId={this.props.userId}
            />
          )}
        </header>
        <div>
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
    lastName: reduxState.lastName,
    userId: reduxState.userId,
    reduxState
  }
}

export default withRouter(
  connect(mapStateToProps, { setUser, clearUser })(Header)
)

const FunctionalHeader = styled.div`
  header {
    box-sizing: border-box;
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(
      to bottom,
      #14396a 15%,
      #14396abf 100%,
      #14396a73 100%,
      #14396a4d 100%
    );
    color: white;
    padding: 0 70px 0 70px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
  }
  header h1 {
    /* color: #00d625; */
    margin-right: 300px;
  }
  header a {
    text-decoration: none;
    color: #63b8ee;
  }
  .username {
    font-size: 18px;
    font-weight: 700;
    margin-right: 30px;
  }
  .username:hover {
    cursor: pointer;
  }
  .login-nav {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    justify-content: space-between;
    color: #63b8ee;
    width: 450px;
    min-width: 230px;
  }
  .logout-nav {
    display: flex;
  }
  .logout {
    font-size: 18px;
    font-weight: 600;
    color: #63b8ee;
  }
  .logout:hover {
    cursor: pointer;
  }
  .login:hover {
    cursor: pointer;
  }
  .bars {
    display: none;
  }
  .initals-bars {
    display: none;
  }

  @media (max-width: 800px) {
    header {
      padding: 0 30px 0 30px;
    }
    header h1 {
      margin-right: 80px;
      font-size: 30px;
    }
    .initals-bars {
      display: initial;
    }
    .login-nav {
      display: none;
    }
    .logout {
      display: none;
    }
    .bars {
      display: inline;
      z-index: 3;
    }
    .regular {
      width: 50px;
      height: 50px;
      position: absolute;
      right: 30px;
      top: 15px;
    }
    .small {
      height: 30px;
      width: 30px;
      position: absolute;
      right: 15px;
      top: 24px;
    }
    .bars:active {
      fill: #63b8ee;
    }
    .username-pic {
      display: none;
    }
    .user-initials {
      margin-right: 40px;
      display: initial;
      font-size: 24px;
      font-weight: 700;
    }
  }
`
