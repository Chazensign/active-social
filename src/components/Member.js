import React, { Component } from 'react';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = { 
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
  render() { 
    return ( 
      <div>
        Member
      </div>
     );
  }
}
 
export default Member;