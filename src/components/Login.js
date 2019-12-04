import React from 'react';
import styled from 'styled-components'

const Login = (props) => {
  
  return (
    <OuterLogin>
      <div
        className='show-login'
        ref={element => {
          props.assignLogin(element)
          element = props.Login
        }}
        hidden={props.hidden}>
        <div className='login-box'>
          <h2>Login</h2>
          <div>Email:</div>
          <input
            name='email'
            value={props.email}
            onChange={e => props.handleChange(e.target)}
            type='text'
          />
          <div>Password:</div>
          <input
            name='password'
            value={props.password}
            onChange={e => props.handleChange(e.target)}
            type='password'
          />
          <button className='login-submit' onClick={() => props.login()}>
            Submit
          </button>
        </div>
      </div>
    </OuterLogin>
  )
}
 
export default Login;

const OuterLogin = styled.div`
  .show-login {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    animation: drop 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .hide-login {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    animation: return 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .login-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 230px;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-125px, -200px);
    z-index: 5;
    border: 2px solid black;
    border-radius: 8px;
    background: #c4c4c4;
    animation: drop-inner 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes drop {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 100vh;
      font-size: 24;
    }
  }
  @keyframes drop-inner {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 230px;
      font-size: 24;
    }
  }
  @keyframes return {
    from {
      height: 100vh;
      font-size: 24;
    }
    to {
      height: 0;
      font-size: 0px;
    }
  }
  .login-box h2 {
    margin: 0 0 10px 0;
  }
  .login-box input {
    margin-bottom: 10px;
  }
  .login-submit {
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
    padding: 6px 20px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
    margin-top: 10px;
  }
`