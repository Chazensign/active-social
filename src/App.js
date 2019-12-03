import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Routes from './Routes'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

render () {
  return (
    <div className='App'>
      <Header />
     
      {Routes}
    </div>
  )
 }
}

export default App;
