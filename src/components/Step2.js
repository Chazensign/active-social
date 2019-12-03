import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router'

const Step2 = props => {

  return (
    <Step2Page>
      <div className={props.register ? 'register-style' : 'explore-style'}>
        {props.register ? (
          <h2>Select All Your Interests</h2>
        ) : (
          <h2>Available Interests</h2>
        )}
        <div className='checkbox-cont'>
          {props.activities.map(activ => {
            return (
              <div className='activ-check' key={activ.activ_id}>
                {props.checkbox ? (
                  <input
                    type='checkbox'
                    id={activ.activ_title}
                    name='activities'
                    value={activ.activ_id}
                  />
                ) : null}
                <label
                  onClick={() =>
                    props.history.push(`/activity/${activ.activ_id}`)
                  }>
                  {activ.activ_title}
                </label>
              </div>
            )
          })}
        </div>
        {props.updateUserActivs ? (
          <div className='add-buttons' >
          <button onClick={() => props.history.push(`/user/${props.match.params.userId}`)}>Cancel</button>
          <button
              onClick={() => {
                props.history.push(
                  `/wizard/add/step3/${props.match.params.userId}`
                )
                props.addActivity(
                  window.document.getElementsByName('activities')
                )
              }}>
              Next
            </button>
            </div>
        ) : (props.register &&
          <div className='back-next'>
            <button
              onClick={() => {
                props.history.push('/wizard/step1')
              }}>
              Back
            </button>
            <button
              onClick={() => {
                props.history.push('/wizard/step3')
                props.addActivity(
                  window.document.getElementsByName('activities')
                )
              }}>
              Next
            </button>
          </div>
        )}
      </div>
    </Step2Page>
  )
}

export default withRouter(Step2)

const Step2Page = styled.div`
  .register-style {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(300px, -300px);
    box-sizing: border-box;
    background: white;
    width: 600px;
    height: 660px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 5px 5px 15px 5px #000000;
  }
  .explore-style {
    box-sizing: border-box;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 600px;
    background: rgba(218, 240, 255, 0.87);
    border-radius: 20px;
    margin: 50px;
    padding: 20px;
  }

  .explore-style h2 {
    margin-top: 0;
  }

  .checkbox-cont {
    box-sizing: border-box;
    height: 500px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    font-size: 20px;
    background: white;
    box-shadow: inset 0px 0px 4px 1px grey;
    border-radius: 3px;
    padding: 10px;
    margin: 10px;
  }
  .activ-check {
    box-sizing: border-box;
    padding: 5px;
    text-align: left;
  }
  .activ-check input {
    box-sizing: border-box;
    height: 15px;
    width: 15px;
    margin: 3px 6px 6px 3px;
  }
  .activ-check label:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  .active-check label {
    text-align: left;
  }
  .back-next {
    box-sizing: border-box;
    height: 60px;
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .register-style {
      margin-top: 0;
      padding-top: 0;
      position: inherit;
      transform: unset;
      top: unset;
      right: unset;
      height: 600px;
      width: 315px;
    }
    .explore-style {
      margin: 0;
      width: 350px;
    }
    .checkbox-cont {
      width: 275px;
      height: 432.2px;
    }
    .back-next {
      /* margin-top: 10px; */
      margin-bottom: 15px;
      height: 50px;
    }
  }
`
