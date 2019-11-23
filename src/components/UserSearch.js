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

  render() {
    return (
      <SearchContainer>
        <div className='outermost-search'>
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
              <button type='button' onClick={this.userSearch}>
                Search
              </button>
            </form>
          </div>
          <div className='search-results'>
            {this.state.searchResults.map(user => {
              return (
                <Link key={user.id} to={`/member/${user.id}`}>
                  <div>
                    <img src={user.profile_img} alt='' />
                    <div>
                      {user.first_name} {user.last_name}
                    </div>
                    <div></div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </SearchContainer>
    )
  }
}
 
export default UserSearch;

const SearchContainer = styled.div`
  .search-results {
    box-shadow: inset 0px 0px 4px 1px #000000;
    border-radius: 3px;
  }
`