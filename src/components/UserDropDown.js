import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserDropDown = props => {

  return (
    <OuterMenu hidden={props.hiddenMenu}>
      <div
        className='show-back'
        ref={element => {
          props.assignMenu(element)
          element = props.menu
        }}>
          <div 
        className='show-menu' 
        hidden={props.hiddenMenu}>
      <Link
        onClick={() => props.closeMenu({target: 'go'})}
        className='link'
        to={`/wizard/step1/update/${props.loggedInId}`}>
        Update Profile
      </Link>
      <Link
        className='link'
        onClick={() => {
          props.logout()
          props.closeMenu({ target: 'go' })
        }}
        to='/'>
        Logout
      </Link>
      </div>
      </div>
    </OuterMenu>
  )
}

export default UserDropDown

const OuterMenu = styled.div`
  .show-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    /* background: rgba(0, 0, 0, 0.6); */
    animation: drop 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .hide-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    animation: return 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .show-menu {
    display: flex;
    width: 130px;
    height: 150px;
    background: white;
    position: fixed;
    right: 20px;
    top: 55px;
    z-index: 11;
    border-radius: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 24px;
    box-shadow: 3px 3px 15px -1px #000000;
    animation: drop-inner 4000ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .link {
    color: black;
    margin: 5px;
  }
  @keyframes drop {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 100vh;
      font-size: 24px;
    }
  }
  @keyframes drop-inner {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 200px;
      font-size: 24px;
    }
  }
  @keyframes return {
    from {
      height: 100vh;
      font-size: 24px;
    }
    to {
      height: 0;
      font-size: 0px;
    }
  }
`
