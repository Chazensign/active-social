import React from 'react';
import backdrop from '../sportsback.jpg'
import styled from 'styled-components'

const Landing = () => {
  return (
    <LandingBack >
     <p>Just move to a new area, want to find people to go do things with?</p>
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
  color: #63b8ee;
  max-width: 700px;
}
`