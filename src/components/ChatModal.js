import React from 'react'
import styled from 'styled-components'
import Chat from './Chat'


const ChatModal = (props) => {
  return props.hidden && ( 
    <ChatBoxWrapper>
      <Chat 
      {...props}
      /> <button onClick={props.hide} >Close</button>
    </ChatBoxWrapper>
   )
}
 
export default ChatModal

const ChatBoxWrapper = styled.div`
position: fixed;
top:0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
z-index: 10;
background: rgba(0, 0, 0, .8);
`
