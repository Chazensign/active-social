import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Step1 = props => {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    birthDate,
    state,
    city,
    zip
  } = props.userInfo
  return (
    <Step1Outer className='step-1'>
      <form className='info-form'>
        <div className='line-label'>First Name:</div>
        <input
          required
          name='firstName'
          value={firstName}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div className='line-label'>Last Name:</div>
        <input
          required
          name='lastName'
          value={lastName}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div className='line-label'>Email:</div>
        <input
          required
          name='email'
          value={email}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div className='line-label'>City:</div>
        <input
          required
          name='city'
          value={city}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div className='line-label'>State:</div>
        <input
          required
          name='state'
          value={state}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        <div className='line-label'>Zip:</div>
        <input
          required
          name='zip'
          value={zip}
          onChange={e => props.handleChange(e.target)}
          type='text'
        />
        {!props.edit &&
        <>
        <div className='line-label'>Birthday:</div>
        <input
          required
          name='birthDate'
          value={birthDate}
          onChange={e => props.handleChange(e.target)}
          type='date'
        />
        </>}
        <div className='line-label'>Password:</div>
        <input
          required={!props.edit}
          name='password'
          value={password}
          onChange={e => props.handleChange(e.target)}
          type='password'
        />
        <div className='line-label'>Re-Enter Password</div>
        <input
          required={!props.edit}
          name='password2'
          value={password2}
          onChange={e => props.handleChange(e.target)}
          type='password'
        />
        <div className='button-cont'>
          {!props.edit ? (
            <>
              <Link to='/'>
                <button>Cancel</button>
              </Link>
              <button
                onClick={() => {
                  let f = document.getElementsByTagName('form')[0]
                  if (f.checkValidity()) {
                    props.history.push('/wizard/step2')
                  }
                }}>
                Next
              </button>
            </>
          ) : (
            <>
            <button
              type="button"
              className='save-button'
              onClick={() => props.updateProfile()}>
              Save
            </button>
            <button onClick={() => props.history.push(`/user/${props.userId}`)}>Cancel</button>
            </>
          )}
        </div>
      </form>
    </Step1Outer>
  )
}

export default Step1

const Step1Outer = styled.div`
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
  box-shadow: 5px 5px 15px 5px #000000;
  padding: 20px;
  z-index: 10;

  .info-form {
    height: 620px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .info-form input {
    width: 300px;
    height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid #b8b8b8;
  }
  .line-label {
    align-self: flex-start;
    font-weight: 600;
    padding-left: 30px;
  }
  .button-cont {
    width: 350px;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-around;
  }
  .info-form button {
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
  .info-form button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  .info-form button:active {
    position: relative;
    top: 1px;
  }
  .save-button {
    align-self: center;
    justify-self: !important center;
  }
  @media (max-width: 800px) {
    border-radius: 20px;
    top: unset;
    right: unset;
    transform: translate(0, 0);
    height: 600px;
    padding: 7px 7px 7px 7px;
    width: 315px;

    .button-cont {
      align-self: bottom;
      box-sizing: border-box;
      margin-top: 15px;
      width: 220px;
    }
    .line-label {
      padding-left: 8px;
    }
    .info-form input {
      width: 240px;
    }
    .info-form {
      width: 250px;
      height: 550px;
    }
  }
`
