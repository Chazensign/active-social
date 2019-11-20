import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ActivitiesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userActivities: []
    }
  }

  componentDidMount = () => {
    axios
      .get(`/api/activities/${this.props.userId}`)
      .then(res => this.setState({ userActivities: res.data }))
  }

  render() {
    return (
      <div className='activ-cont'>
        {this.state.userActivities.map(activ => {
          return (
            <Link key={activ.activ_id} to={`/activity/${activ.activ_id}`}>
              <div className='act-list-item'>
                <img className='activ-img' src={activ.img} alt='' />
                <h3>{activ.activ_title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default ActivitiesList
