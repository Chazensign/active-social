import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'



const RequstList = (props) => {

  const goToUserPage = id => {
    props.history.push(`/member/${id}`)
    window.location.reload(true)
  }
  
    return (
      <FriendContainer>
        <div className='contact-cont'>
          <h2>Pending Requests</h2>
          {props.requestList.length > 0 ? (
            props.requestList.map(friend => {
              return (
                <div key={friend.id}>
                  <div onClick={() => goToUserPage(friend.id)}>
                    <img src={friend.profile_img} alt='' />
                    <h3>
                      {friend.first_name} {friend.last_name}
                    </h3>
                  </div>
                  <button
                    className='chat-confirm'
                    onClick={() =>
                      props.showPrivateChat(friend.id, friend.first_name)
                    }>
                    Chat
                  </button>
                  <button
                    className='chat-confirm'
                    onClick={() => props.confirmFriend(friend.id)}>
                    Confirm
                  </button>
                  <button onClick={() => props.denyFriend(friend.id)}>
                    Deny
                  </button>
                </div>
              )
            })
          ) : props.emptyRequests ? <h3 className='no-requests' >No Pending Requests</h3> :
            <ReactLoading
              type={'spokes'}
              color={'grey'}
              height={'75px'}
              width={'75px'}
            />
          }
        </div>
      </FriendContainer>
    )
  }

export default RequstList;

const FriendContainer = styled.div`
  position: relative;
  height: 450px;
  width: 300px;
  background: white;
  box-shadow: inset 0px 0px 4px 1px grey;
  border-radius: 6px;
  margin: 10px;
  h2 {
    box-sizing: border-box;
    width: 296px;
    margin: 2px 0 0 2px;
    padding: 5px;
    background: #14396a;
    color: #63b8ee;
    border-radius: 4px;
    box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.82);
  }
  .contact-cont h3 {
    margin: 0;
  }
  .no-requests {
    margin-top: 100px !important;
  }
  .contact-cont h3:hover {
    cursor: pointer;
  }
  button {
    margin: 10px;
    box-shadow: inset 0px 1px 0px 0px #bee2f9;
    background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
    background-color: #63b8ee;
    border-radius: 6px;
    border: 1px solid #3866a3;
    display: inline-block;
    cursor: pointer;
    color: #14396a;
    font-family: Arial;
    font-size: 14px;
    font-weight: bold;
    padding: 2px 10px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #7cacde;
  }
  button:hover {
    background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
    background-color: #468ccf;
  }
`
