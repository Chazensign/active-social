import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Routes from './Routes'
// import Axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }
  // componentDidMount = () => {
  //   Axios.get('/api/images')   
  //   .then(res => {
  //     this.setState({ images: res.data.Contents }); 
  //   })
  // }

render () {
  return (
    <div className='App'>
      <Header />
      {/* {this.state.images.length > 0 ? (
        <img
          src={`https://activsocial-project.s3-us-west-1.amazonaws.com/${this.state.images[1].Key}`}
        />
      ) : null} */}
      {Routes}
    </div>
  )
 }
}

export default App;
