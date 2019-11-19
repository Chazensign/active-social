import React, { Component } from 'react';
import WizRoutes from '../WizRoutes'


class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      city: '',
      zip: 0,
      activities: []
     }
  }
  render() { 
    return ( 
      <div>
        Wizard
        {WizRoutes}
      </div>
     );
  }
}
 
export default Wizard;