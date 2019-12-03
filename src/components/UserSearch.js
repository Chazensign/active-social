import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'

class UserSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      activitiesList: [],
      activId: 0,
      range: 0,
      zip: '',
      lessons: false,
      loading: false
    }
  }

  componentDidMount = () => {
    axios
      .get('/api/activities')
      .then(res => {
        this.setState({ activitiesList: res.data })
      })
      .catch(err => console.log(err))
    if (this.props.zip) this.setState({ zip: this.props.zip })
  }

  userSearch = async () => {
    this.setState({ loading: true })
    console.log(this.props.friends)
    let searchedUsers = []
    let returnedUsers = await axios
      .get(`/api/search?zip=${this.state.zip}&range=${this.state.range}`)
      .catch(err => console.log(err))

    for (let i = 0; i < this.props.friends.length; i++) {
      for (let j = returnedUsers.data.length - 1; j >= 0; j--) {
        if (
          this.props.friends[i].second_id ===
            returnedUsers.data[j].user.user_id ||
          this.props.userId === returnedUsers.data[j].user.user_id
        ) {
          returnedUsers.data.splice(j, 1)
        }
      }
    }
    if (returnedUsers.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'No users found by that criteria.',
        showConfirmButton: true
      })
    }else if (this.state.activId && this.state.lessons) {
      for (let i = 0; i < returnedUsers.data.length; i++) {
        let user = returnedUsers.data[i].userActivs.filter(
          activ =>
            Number(this.state.activId) === activ.activ_id && activ.lessons
        )
        if (user.length > 0) {
          searchedUsers.push(returnedUsers.data[i].user)
        }
      }
    } else if (this.state.activId) {
      for (let i = 0; i < returnedUsers.data.length; i++) {
        let user = returnedUsers.data[i].userActivs.filter(
          activ => Number(this.state.activId) === Number(activ.activ_id)
        )

        if (user.length > 0) {
          searchedUsers.push(returnedUsers.data[i].user)
        }
      }
    } else {
      for (let i = 0; i < returnedUsers.data.length; i++) {
        searchedUsers.push(returnedUsers.data[i].user)
      }
    }
    this.setState({ searchResults: searchedUsers })
  }
  searchHandleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }
  addFriend = id => {
    axios.post(`/api/friends/${id}`).then(res =>
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1000
      })
    )
  }
  hideConnectedUser = (id) => {
    let userDiv = document.getElementById(id)
    userDiv.setAttribute("style", "display: none !important;");
  }

  render() {
    
    return (
      <SearchContainer>
        <div className={!this.props.searchOnly ? 'search-box' : 'search-only'}>
            <h2>Find Users</h2>
            <form>
              {!this.props.zip && (
                <input
                  onChange={e => this.searchHandleChange(e.target)}
                  type='text'
                  name='zip'
                  value={this.state.zip}
                  placeholder='Enter Zip Code'
                />
              )}
              <select
                required
                name='range'
                onChange={e => this.searchHandleChange(e.target)}>
                <option>Select distance</option>
                <option value={5}>5 Miles</option>
                <option value={10}>10 Miles</option>
                <option value={25}>25 Miles</option>
                <option value={50}>50 MIles</option>
                <option value={100}>100 Miles</option>
              </select>
              <select
                name='activId'
                onChange={e => this.searchHandleChange(e.target)}>
                <option>Select Activity</option>
                {this.state.activitiesList.map(activ => {
                  return (
                    <option key={activ.activ_id} value={activ.activ_id}>
                      {activ.activ_title}
                    </option>
                  )
                })}
              </select>
              <select
                name='lessons'
                onChange={e => this.searchHandleChange(e.target)}>
                <option>Select training</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <button
                className='search-button'
                type='button'
                onClick={this.userSearch}>
                Search
              </button>
            </form>
          <div className='search-results'>
            {!this.state.searchResults.length && this.state.loading
              ? ( <div className='loading'>
                  <ReactLoading
                    type={'spokes'}
                    color={'grey'}
                    height={'75px'}
                    width={'75px'}
                  />
                  </div>
                )
              : this.state.searchResults.map(user => {
                  return (
                    <div key={user.id} id={user.id} className='result'>
                      <Link to={`/member/${user.id}`}>
                        <div className='result-name-img'>
                          <img src={user.profile_img} alt='' />
                          <div className='result-name'>
                            {user.first_name} {user.last_name}
                          </div>
                        </div>
                      </Link>
                      {!this.props.searchOnly && (
                        <button
                          className='connect'
                          onClick={() => {
                            this.hideConnectedUser(user.id)
                            this.addFriend(user.id)
                            }}>
                          Connect
                        </button>
                      )}
                    </div>
                  )
                })}
          </div>
        </div>
      </SearchContainer>
    )
  }
}

export default UserSearch

const SearchContainer = styled.div`

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 450px;
    margin: 10px;
  }
  .search-only {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
    width: 350px;
    margin: 50px;
    padding: 20px;
    background: rgba(218, 240, 255, 0.87);
    border-radius: 20px;
  }
  h2 {
    margin: 0 0 10px 0;
  }
  form {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .search-results {
    position: relative;
    box-shadow: inset 0px 0px 4px 1px grey;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 6px;
    width: 300px;
    height: 380px;
    background: white;
    overflow-y: scroll;
  }
  .loading {
    position: absolute;
    left: 115px;
    top: 90px;
  }
  .result {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .result-name-img {
    display: flex;
    align-items: center;
  }
  .result-name {
    font-size: 20px;
    font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  form input {
    width: 190px;
  }
  form select {
    width: 200px;
    margin: 5px 0 0 0;
    background: white;
  }
  form option {
    background: white;
  }
  button {
    margin: 10px;
    height: 31px;
    width: 150px;
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
  .connect {
    padding: 1px 4px;
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    width: unset;
    height: unset;
  }
  @media (max-width: 800px) {
    .search-only {
      margin: 20px 0;
    }
  }
`
