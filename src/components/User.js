import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './User.css'
import Chat from './Chat';
import FriendList from './FriendList';
import EventList from './EventList';
import ActivitiesList from './ActivitiesList';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      conversations: [],
      user: {},
      userActivities: [],
      activitiesList: [],
      aboutContent: '',
      activ: '',
      range: 0,
      lessons: false,
      searchResults: [],
      privateChat: false,
     }
  }
  // componentDidMount = () => {
  //   if (this.props.match.params.user_id === undefined) {
  //     axios
  //       .get(`/api/user/${this.props.match.params.user_id}`)
  //       .then(res => {
  //         this.setState({
  //           friends: res.data.friends,
  //           events: res.data.events,
  //           userActivities: res.data.activities
  //         })
  //       })
  //       .catch(err => console.log(err))
  //   axios.get('/api/activities')
  //   .then(res => {
  //     this.setState({ activitiesList: res.data });
  //   })
  //   }
  // }
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

  showPrivateChat = (name) => {
    this.setState({ privateChat: true });
    return <div className='chat-popup' ><Chat userName={this.props.firstName} userName2={name} /></div>
  }

  render() { 
    return (
      <div className='background'>
        <h1 className='username'>
          {this.props.firstName} {this.props.lastName}
        </h1>
        <FriendList
          showPrivateChat={this.showPrivateChat}
          userId={this.props.match.params.user_id}
        />
        <ActivitiesList userId={this.props.match.params.user_id} />
        <Chat userName={this.props.firstName} />
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