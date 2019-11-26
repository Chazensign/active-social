import React from 'react'
import styled from 'styled-components'

const Step2 = props => {
  return (
    <Step2Page>
      <h4>Select All Your Interests</h4>
      <div className='checkbox-cont'>
        {props.activities.map(activ => {
          return (
            <div key={activ.activ_id}>
              <input
                type='checkbox'
                id={activ.activ_title}
                name='activities'
                value={activ.activ_id}
              />
              <label>{activ.activ_title}</label>
            </div>
          )
        })}
      </div>
      <div className='back-next' >
        <button
          onClick={() => {
            props.history.push('/wizard/step1')
          }}>
          Back
        </button>
        <button
          onClick={() => {
            props.history.push('/wizard/step3')
            props.addActivity(window.document.getElementsByName('activities'))
          }}>
          Next
        </button>
      </div>
    </Step2Page>
  )
}

export default Step2

const Step2Page = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(225px, -350px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px 5px #000000;
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 40px;
  width: 450px;

  .checkbox-cont {
    height: 500px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    font-size: 20px;
    background: ${props => (props.background ? 'red' : 'white')};
    box-shadow: inset 0px 0px 4px 1px #000000;
    border-radius: 3px;
  }
  .back-next {
    box-sizing: border-box;
    height: 60px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .back-next button {
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
  .back-next button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .info-form button:active {
    position: relative;
    top: 1px;
  }
`
