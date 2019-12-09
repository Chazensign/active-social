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
        <div
          className='login-box-show'
          ref={element => {
            props.assignLogin(element)
            element = props.Login
          }}>
          <h2 className='show-h2' >Login</h2>
          <div>Email:</div>
          <form onSubmit={e => props.login(e)}>
            <input
              className='input-show'
              name='email'
              value={props.email}
              onChange={e => props.handleChange(e.target)}
              type='text'
            />
            <div>Password:</div>
            <input
              className='input-show'
              name='password'
              value={props.password}
              onChange={e => props.handleChange(e.target)}
              type='password'
            />
            <button
              type='submit'
              className='login-submit-show'
              onClick={() => props.login()}>
              Submit
            </button>
          </form>
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
    animation: outer-show 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  div {
    font-size: 18px;
  }
  .hide-login {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    animation: return-outer 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }

  .login-box-show {
    contain: content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    padding: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-125px, -200px);
    z-index: 5;
    border: 2px solid black;
    border-radius: 8px;
    background: #c4c4c4;
    animation: drop-login 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  .login-box-hide {
    box-sizing: border-box;
    height: 31px;
    contain: content;
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
    animation: return 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .input-show {
    font-size: 12px;
    height: 20px;
    width: 170px;
    margin: 0 0 10px 0;
    animation: input-show 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  .login-submit-show {
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    width: 100px;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 10px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
    margin: 5px 0;
    animation: button-drop 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  .show-h2 {
    font-size: 32px;
    margin: 0 0 10px 0;
    animation: h2-drop 400ms cubic-bezier(0.45, 0.73, 0.18, 0.95);
  }
  @keyframes h2-drop {
    0% {
      font-size: 0px;
      margin: 0;
    }
    100% {
      font-size: 32px;
      margin: 10px;
    }
  }
  @keyframes button-drop {
    from {
      height: 0px;
      padding: 0;
      font-size: 0px;
      margin: 0 0;
    }
    to {
      height: 31px;
      padding: 6px 10px;
      font-size: 15px;
      margin: 5px 0;
    }
  }
  @keyframes outer-show {
    from {
      height: 0;
    }
    to {
      height: 100vh;
    }
  }
  @keyframes input-show {
    from {
      height: 0;
      margin: 0;
    }
    to {
      height: 20px;
      margin: 0 0 10px 0;
    }
  }
  @keyframes drop-login {
    0% {
      font-size: 0px;
      padding: 0px;
    }
    25% {
      padding: 10px;
    }
    to {
      font-size: 18px;
      padding: 10px;
    }
  }
  @keyframes return-outer {
    from {
      height: 100vh;
      font-size: 18px;
    }
    to {
      height: 0;
      font-size: 0px;
    }
  }
  /* @keyframes return {
    from {
      height: 250px;
    }
    to {
      height: 0;
    }
  } */
`