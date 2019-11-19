import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activity: '',
      userNames: '',
      chat: [],
      userLessons: [],
      events: []
     }
  }
  render() { 
    return ( 
      <div>Activity</div>
     );
  }
}
 
export default Activity;