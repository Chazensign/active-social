import React from 'react'
import UserSearch from './UserSearch'
import Step2 from './Step2'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const ExplorePage = (props) => {
  return (
    <ExploreBack>
      <Step2 {...props} checkbox={false} register={false} activities={props.activities} />
      <UserSearch searchOnly={true} />
    </ExploreBack>
  )
}
 
export default withRouter(ExplorePage)

const ExploreBack = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 1100px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`