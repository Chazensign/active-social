import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DropDownMenu = (props) => {
  return (
    <OuterMenu display={props.menuDisp}>
      <div
        className='link'
        onClick={() => {
          props.showLogin()
          props.showMenu('none')
        }}>
        Login
      </div>
      <Link
        className='link'
        onClick={() => props.showMenu('none')}
        to='/wizard/step1'>
        Register
      </Link>
      <Link
        className='link'
        onClick={() => props.showMenu('none')}
        to='/wizard/explore'>
        Explore
      </Link>
    </OuterMenu>
  )
}
 
export default DropDownMenu;

const OuterMenu = styled.div`
  display: ${props => props.display};
  width: 150px;
  height: 200px;
  background: white;
  position: absolute;
  right: 20px;
  top: 50px;
  z-index: 11;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 24px;
  box-shadow: 3px 3px 15px -1px #000000;
  .link {
    color: black;
  }
`
