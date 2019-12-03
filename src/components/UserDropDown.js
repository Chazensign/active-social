import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserDropDown = props => {

  return (
    <OuterMenu display={props.menuDisp}>
      <Link
        onClick={() => props.showMenu('none')}
        className='link'
        to={`/wizard/step1/update/${props.loggedInId}`}>
        Update Profile
      </Link>
      <Link
        className='link'
        onClick={() => {
          props.logout()
          props.showMenu('none')
        }}
        to='/'>
        Logout
      </Link>
    </OuterMenu>
  )
}

export default UserDropDown

const OuterMenu = styled.div`
  display: ${props => props.display};
  width: 130px;
  height: 150px;
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
    margin: 5px;
  }
`
