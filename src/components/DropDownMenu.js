import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DropDownMenu = (props) => {
  return (
    <OuterMenu hidden={props.hiddenMenu}>
      <div
        className='show-back'
        ref={element => {
          props.assignMenu(element)
          element = props.menu
        }}>
        <div className='show-menu' hidden={props.hiddenMenu}>
          <div
            className='link'
            onClick={() => {
              props.closeMenu({ target: 'go' })
              props.showLogin()
            }}>
            Login
          </div>
          <Link
            className='link'
            onClick={() => props.closeMenu({ target: 'go' })}
            to='/wizard/step1'>
            Register
          </Link>
          <Link
            className='link'
            onClick={() => props.closeMenu({ target: 'go' })}
            to='/wizard/explore'>
            Explore
          </Link>
        </div>
      </div>
    </OuterMenu>
  )
}
 
export default DropDownMenu;

const OuterMenu = styled.div`
  .show-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    /* background: rgba(0, 0, 0, 0.6); */
    animation: drop-back 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .hide-back {
    position: absolute;
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
    animation: drop-menu 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .link {
    color: black;
  }
  @keyframes drop-back {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 100vh;
      font-size: 24px;
    }
  }
  @keyframes drop-menu {
    from {
      height: 0;
      font-size: 0px;
    }
    to {
      height: 200px;
      font-size: 24px;
    }
  }
  @keyframes return-back {
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
