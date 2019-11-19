import React from 'react';

const Step1 = (props) => {
  const { email, password, password2, firstName, lastName, birthDate, city, zip } = props
  return ( 
    <div>Step1
      <div>First Name:</div>
      <input value={firstName} onChange={e => props.handleChange(e.target)} type="text"/>
      <div>Last Name:</div>
      <input value={lastName} onChange={e => props.handleChange(e.target)} type="text"/>
      <div>Email:</div>
      <input value={email} onChange={e => props.handleChange(e.target)} type="text"/>
      <div>City:</div>
      <input value={city} onChange={e => props.handleChange(e.target)} type="text"/>
      <div>State</div>
      <input value={state} onChange={e => props.handleChange(e.target)} type="text"/>
      <input value={zip} onChange={e => props.handleChange(e.target)} type="text"/>
      <input value={birthDate} onChange={e => props.handleChange(e.target)} type="date"/>
      <input value={password} onChange={e => props.handleChange(e.target)} type="password"/>
      <input value={password2} onChange={e => props.handleChange(e.target)} type="password"/>
    </div>
   );
}
 
export default Step1;