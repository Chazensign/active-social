import React from 'react';
import styled from 'styled-components'

const Step3 = (props) => {
  return ( 
    <ActivInfoBox>
      {props.userActivs.map((activ, i) => {
      return (
        <div key={activ.activId} className='activ-info-box' >
      <h2>{activ.activTitle}</h2>
      <h4>Skill Level</h4>
      <select name='skillLevel' onChange={(e) => {
        log
        props.updateUserActivs(e.trg, i)
        }}>
        <option  value="null">Select Skill Level</option>
        <option value="1">1 Minimal Experiance</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10 Professional</option>
      </select>
      <h4>Would you like to offer lessons/training?</h4>
      <select>
        <option value={false}>False</option>
        <option value={true}>True</option>
      </select>
      <h6>Some information about your involvemnt with the activity.</h6>
      <textarea className='activ-content' placeholder='"I have been doing it for 10 years." or "I am just getting into it and would love to find others in my area that enjoy it."' />
      </div>
      )
      })}
    </ActivInfoBox>
   );
}
 
export default Step3;

const ActivInfoBox = styled.div`
box-sizing: border-box;
margin-top: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
padding: 10px;

.activ-info-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 20px; 
  box-shadow: 5px 5px 15px 5px #000000;
  padding: 15px;
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
`