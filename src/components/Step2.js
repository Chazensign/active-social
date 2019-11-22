import React from 'react'
import styled from 'styled-components'

const Step2 = props => {
  console.log(Step2Page)
  return (
    <Step2Page>
      {console.log(window.document.getElementsByName('activities'))}
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
      <button
        onClick={() =>{
          props.history.push('/wizard/step3')
          props.addActivity(window.document.getElementsByName('activities'))
        }
        }>
        Submit
      </button>
    </Step2Page>
  )
}

export default Step2

const Step2Page = styled.div`
  box-sizing: border-box;
  margin-top: 40px;
  width: 300px;

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
`
