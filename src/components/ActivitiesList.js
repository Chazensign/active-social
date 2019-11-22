import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
      <ActivitiesContainer>
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
      </ActivitiesContainer>
    )
  }
}

export default ActivitiesList

const ActivitiesContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 20px;
  overflow: scroll;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 3px;

  .activ-img {
    width: 100px;
  }
  .act-list-item {
    display: flex;
    margin: 5px;
  }
`