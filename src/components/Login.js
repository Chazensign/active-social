import React from 'react';

const Login = (props) => {
  return ( 
    <div className='outer-login' >
    <h2>Login</h2>
    <div>Email:</div>
    <input name='email' value={props.email} onChange={e => props.handleChange(e.target)} />
    <div>Password:</div>
    <input name='password' value={props.password} onChange={e => props.handleChange(e.target)} />
    </div>
   );
}
 
export default Login;