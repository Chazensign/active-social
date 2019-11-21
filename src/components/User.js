import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './User.css'
import Chat from './Chat';
import FriendList from './FriendList';
import EventList from './EventList';
import ActivitiesList from './ActivitiesList';
import ChatModal from './ChatModal';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      otherChatter: '',
      otherChatterId: 0,
      conversations: [],
      activitiesList: [],
      aboutContent: '',
      activ: '',
      range: 0,
      lessons: false,
      searchResults: [],
      privateChat: false,
     }
  }
  componentDidMount = () => {
    axios.get('/api/activities')
    .then(res => {
      this.setState({ activitiesList: res.data });
    })
  }
  userSearch = () => {
    axios.post('/api/search', {zip: +this.props.zip, range: +this.state.range })
    .then(res => {
      console.log(res)
      this.setState({ searchResults: res.data })
    })
    .catch(err => console.log(err))
  }

  searchHandleChange = (trg) => {
    this.setState({[trg.name]: trg.value });
  }

  showPrivateChat = (id, name) => {
    this.setState({ privateChat: true, otherChatter: name, otherChatterId: id })
  }

  hidePrivateChat = () => {
    this.setState({ privateChat: false })
  }

  render() { 
    return (
      <div className='background'>
        <h1 className='username'>
          {this.props.firstName} {this.props.lastName}
        </h1>
        <ChatModal
          hide={this.hidePrivateChat}
          userId={this.props.userId}
          userName={this.props.firstName}
          userId2={this.state.otherChatterId}
          userName2={this.state.otherChatter}
          hidden={this.state.privateChat}
        />
        {/* <Chat 
          userName={this.props.firstName}
           userName2={name}
            /> */}
        <FriendList
          showPrivateChat={this.showPrivateChat}
          userId={this.props.match.params.user_id}
        />
        <ActivitiesList userId={this.props.match.params.user_id} />
        <Chat
          userId={this.props.match.params.user_id}
          userName={this.props.firstName}
        />
        <EventList userId={this.props.match.params.user_id} />
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
              <button onClick={this.userSearch}>Search</button>
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
      </div>
    )
  }
}
 
function mapStateToProps(reduxState) {
  return {
    profilePic: reduxState.profilePic,
    firstName: reduxState.firstName,
    lastName: reduxState.lastName,
    userId: reduxState.userId,
    zip: reduxState.zip
  }
}

export default connect(mapStateToProps)(User)