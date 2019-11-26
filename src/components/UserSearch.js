import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class UserSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      activitiesList: [],
      activ: '',
      range: 0,
      lessons: false
    }
  }

  componentDidMount = () => {
    axios.get('/api/activities').then(res => {
      this.setState({ activitiesList: res.data })
    })
  }

  userSearch = () => {
    console.log(this.props.zip, +this.state.range)
    axios
      .get(`/api/search?zip=${this.props.zip}&range=${this.state.range}`)
      .then(async res => {
        console.log(res)
        await this.setState({ searchResults: res.data })
        console.log(this.state.searchResults)
      })
      .catch(err => console.log(err))
  }
  searchHandleChange = trg => {
    this.setState({ [trg.name]: trg.value })
  }
  addFriend = id => {
    axios.post(`/api/friends/${id}`)
    .then(res => alert(res.data.message))
  }

  render() {
    return (
      <SearchContainer>
          <div className='search-box'>
            <h2>Find Users</h2>
            <form>
              <select
                name='range'
                onChange={e => this.searchHandleChange(e.target)}>
                <option>Select distance</option>
                <option value={5}>5 Miles</option>
                <option value={10}>10 Miles</option>
                <option value={25}>25 Miles</option>
                <option value={50}>50 MIles</option>
                <option value={100}>100 Miles</option>
              </select>
              <select name='lessons' onChange={this.searchHandleChange}>
                <option>Select training</option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
              <select name='activ' onChange={this.searchHandleChange}>
                <option>Select Activity</option>
                {this.state.activitiesList.map(activ => {
                  return (
                    <option key={activ.activ_id} value={activ.activ_id}>
                      {activ.activ_title}
                    </option>
                  )
                })}
              </select>
              <button className='search-button' type='button' onClick={this.userSearch}>
                Search
              </button>
            </form>
          </div>
          <div className='search-results'>
            {this.state.searchResults.map(user => {
              return (
                <div>
                  <Link key={user.id} to={`/member/${user.id}`}>
                    <div>
                      <img src={user.profile_img} alt='' />
                      <div>
                        {user.first_name} {user.last_name}
                      </div>
                    </div>
                  </Link>
                  <button onClick={() => this.addFriend(user.id)}>
                    Connect
                  </button>
                </div>
              )
            })}
          </div>
      </SearchContainer>
    )
  }
}
 
export default UserSearch;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 450px;
  margin: 10px;

  .search-results {
    box-shadow: inset 0px 0px 4px 1px #000000;
    border-radius: 6px;
    width: 300px;
    height: 330px;
    background: white;
    overflow-y: scroll;
  }
  .search-box h2 {
    margin: 0;
  }
  .search-box form {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .search-box form select {
    width: 200px;
    margin: 5px 0 0 0;
  }
  .search-button {
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
    .update-button:hover {
      background: linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
      background-color: #468ccf;
    }
  }
`