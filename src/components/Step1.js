import React from 'react'
import { Link } from 'react-router-dom'

const Step1 = (props) => {
  const { email, password, password2, firstName, lastName, birthDate, state, city, zip } = props.userInfo
  return (
    <div className='step-1'>
      <div>First Name:</div>
      <input
        name='firstName'
        value={firstName}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>Last Name:</div>
      <input
        name='lastName'
        value={lastName}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>Email:</div>
      <input
        name='email'
        value={email}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>City:</div>
      <input
        name='city'
        value={city}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>State:</div>
      <input
        name='state'
        value={state}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>Zip:</div>
      <input
        name='zip'
        value={zip}
        onChange={e => props.handleChange(e.target)}
        type='text'
      />
      <div>Birthday</div>
      <input
        name='birthDate'
        value={birthDate}
        onChange={e => props.handleChange(e.target)}
        type='date'
      />
      <div>Password:</div>
      <input
        name='password'
        value={password}
        onChange={e => props.handleChange(e.target)}
        type='password'
      />
      <div>Re-Enter Password</div>
      <input
        name='password2'
        value={password2}
        onChange={e => props.handleChange(e.target)}
        type='password'
      />
      <div className='button-cont' >
      <Link to='/'>
        <button>Back</button>
      </Link>
      <button onClick={props.createUser}>Register</button>
      <Link to='/wizard/step2' >
        <button>Next</button>
      </Link>
      </div>
    </div>
  )
}
 
export default Step1;