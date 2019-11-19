import React from 'react';
import './Login.css'

const Login = (props) => {
  return ( 
    <div className='login-background' >
    <div className='outer-login' >
    <h2>Login</h2>
    <div>Email:</div>
    <input name='email' value={props.email} onChange={e => props.handleChange(e.target)} type='text' />
    <div>Password:</div>
    <input name='password' value={props.password} onChange={e => props.handleChange(e.target)} type='password' />
    <button onClick={props.login} >Submit</button>
    </div>
    </div>
   );
}
 
export default Login;