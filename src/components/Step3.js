import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const Step3 = (props) => {
  return (
    <ActivInfoBox>
      {props.userActivs.map((activ, i) => {
        return (
          <div key={i} className='activ-info-box'>
            <h2>{activ.activTitle}</h2>
            <h4>Skill Level</h4>
            <select
              name='skillLevel'
              id={`skillLevel${i}`}
              onChange={() => {
                let el = document.getElementById(`skillLevel${i}`)

                let value = el.options[el.selectedIndex].value
                let name = el.name
                props.updateUserActivs(name, value, i)
              }}>
              <option value='null'>Select Skill Level</option>
              <option value='1'>1 Minimal Experiance</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10 Professional</option>
            </select>
            <h4>Would you like to offer lessons/training?</h4>
            <select
              name='lessons'
              id={`lessons${i}`}
              onChange={e => {
                let el = document.getElementById(`lessons${i}`)
                let value = el.options[el.selectedIndex].value
                let name = el.name
                props.updateUserActivs(name, value, i)
              }}>
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
            <h6>Some information about your involvemnt with the activity.</h6>
            <textarea
              name='activContent'
              // value={props.activContent}
              onChange={e =>
                props.updateUserActivs(e.target.name, e.target.value, i)
              }
              className='activ-content'
              placeholder='"I have been doing it for 30 years, I love backcountry skiing the most." or "I am just getting into it."'
            />
          </div>
        )
      })}
      {props.addActivity ? (
        <div className='back-submit-update' >
          <Link to={`/wizard/add/step2/${props.match.params.userId}`}>
            <button>Back</button>
          </Link>
          <button onClick={() => {
            props.addToUserActivs()
            props.history.push(`/user/${props.match.params.userId}`)
            }}>Submit</button>
        </div>
      ) : (
        <div className='back-create-button'>
          <Link to='/wizard/step2'>
            <button>Back</button>
          </Link>
          <button onClick={props.createUser}>Create Account</button>
        </div>
      )}
    </ActivInfoBox>
  )
}
 
export default withRouter(Step3);

const ActivInfoBox = styled.div`
background: white;
width: 780px;
min-height: 500px;
box-sizing: border-box;
margin: 50px 0 50px 0;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 10px;
border-radius: 8px;
box-shadow: 5px 5px 15px 5px #000000;

.activ-info-box {
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 20px; 
  padding: 15px;
  z-index: 4;
  background: white;
  border-radius: 7px;
  border: 2px solid grey;
}

h2 {
  margin-top: 5px;
}
h4 {
  margin-top: 8px;
  width: 200px;
  text-align: left;
}
select {
  width: 145px;

}
h6 {
  margin: 10px;
  width: 200px:
}
textarea {
  width: 300px;
  height: 120px;
  align-self: center;
}
.back-create-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-self: flex-end;
  height: 30px;
  border-radius: 8px;
}
.back-submit-update {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-self: flex-end;
  height: 30px;
}
button {
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
  }
  button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  button:active {
    position: relative;
    top: 1px;
  }
  @media (max-width: 800px) {
    width: 315px;
    margin: 50px 0;
    .activ-info-box {
      width: 300px;
    }
    .back-create-button {
      width: 300px;
    }
    h4 {
      margin: 10px 0 10px 0;
    }
    select {
      border: 1px solid grey;
    }
    .activ-content{
      width: 270px;
      border: 1px solid grey;
      border-radius: 4px;
    }
  }
`