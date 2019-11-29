import React from 'react';
import backdrop from '../sportsback.jpg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <LandingBack >
     <p>Just move to a new area?  Want to find people to go do things with?</p>
     <Link to='/wizard/explore'><button>Explore</button></Link>
    </LandingBack>
  )
}
 
export default Landing;

const LandingBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backdrop});
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 100vh;
  }
  p {
    font-size: 40px;
    font-weight: 700;
    color: #001850;
    max-width: 700px;
    margin: 50px;
    padding: 20px;
    background: rgba(218, 240, 255, 0.87);
    border-radius: 20px;
  }
  button {
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
  button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
  button:active {
    position: relative;
    top: 1px;
  }
`