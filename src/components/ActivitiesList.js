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
    if (this.props.userId) {
      axios
      .get(`/api/activities/${this.props.userId}`)
      .then(res => this.setState({ userActivities: res.data }))
    }
  }

  render() {
    return (
      <ActivitiesContainer>
        <h2>Activities</h2>
        
        <Link to={`/wizard/step2/${this.props.userId}`}><button className='add-activity' hidden={this.props.addActiv} >Add Activities</button></Link>
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
  position: relative;
  width: 300px;
  height: 450px;
  margin: 10px;
  overflow: scroll;
  background: white;
  box-shadow: inset 0px 0px 4px 1px #000000;
  border-radius: 6px;
  
  h2 {
    box-sizing: border-box;
    border: inset 3px solid transparent;
    margin: 0;
    padding: 5px;
    background: #63b8ee;
    border-radius: 6px;
  }

  .activ-img {
    width: 100px;
  }
  .act-list-item {
    display: flex;
    margin: 5px;
  }
  .add-activity {
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    position: absolute;
    bottom: 10px;
    left: 80px;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
  }
  .add-activity:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
`