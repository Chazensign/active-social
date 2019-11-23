import React from 'react'
import { Link } from 'react-router-dom'

const Step1 = (props) => {
  const { email, password, password2, firstName, lastName, birthDate, state, city, zip } = props.userInfo
  return (
    <div className='step-1'>
      <form>
        <div>First Name:</div>
        <input
          required
          name='firstName'
          value={firstName}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>Last Name:</div>
        <input
          required
          name='lastName'
          value={lastName}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>Email:</div>
        <input
          required
          name='email'
          value={email}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>City:</div>
        <input
          required
          name='city'
          value={city}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>State:</div>
        <input
          required
          name='state'
          value={state}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>Zip:</div>
        <input
          required
          name='zip'
          value={zip}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div>Birthday</div>
        <input
          required
          name='birthDate'
          value={birthDate}
          onChange={e => props.handleChange(e.target)}
          type='date'
        />
        <div>Password:</div>
        <input
          required
          name='password'
          value={password}
          onChange={e => props.handleChange(e.target)}
          type='password'
        />
        <div>Re-Enter Password</div>
        <input
          required
          name='password2'
          value={password2}
          onChange={e => props.handleChange(e.target)}
          type='password'
        />
        <div className='button-cont'>
          <Link to='/'>
            <button>Back</button>
          </Link>
          <button onClick={() => {
            let f = document.getElementsByTagName('form')[0]
            if (f.checkValidity()) {
              props.history.push('/wizard/step2')
            }
          }}>Next</button>
        </div>
      </form>
    </div>
  )
}
 
export default Step1;