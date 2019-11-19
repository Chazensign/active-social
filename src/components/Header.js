import React, { Component } from 'react';
import Login from './Login'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      display: false,
      loginDisp: false
     }
  }
  handleChange = (trg) => {
    this.setState({ [trg.name]: trg.value });
  }

  render() { 
    return ( 
      <>
      <header>Header</header>
      <Login email={this.state.email} password={this.state.password} handleChange={this.handleChange} />
      </>
     );
  }
}
 
export default Header;