import React, { Component } from 'react'
import axios from 'axios'


class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventDate: '',
      title: '',
      content: '',
      street: '',
      city: '',
      state: '',
      zip: 0,
      img: '',
      activId: 0
     }
  }
  componentDidMount = () => {
    this.setState({ activId: this.props.activId })
  }
  handleChange = (trg) => {
    this.setState({ [trg.name]: trg.value })
  }
  submitEvent = () => {
    console.log('submitted');
    
    axios.post('/api/events', this.state)
    .then(res => {
      console.log(res)
      this.props.updateEvents(res.data)
      alert(res.data.message)
    })
  }

  render() { 
    let { eventDate, title, content, street, city, state, zip, img} = this.state
    return this.props.addEvent ? (
      <div  >
        <div>Title:</div>
        <input
          required
          name='title'
          value={title}
          onChange={e => this.handleChange(e.target)}
        />
        <div>Street:</div>
        <input
          required
          name='street'
          value={street}
          onChange={e => this.handleChange(e.target)}
        />
        <div>City:</div>
        <input
          required
          name='city'
          value={city}
          onChange={e => this.handleChange(e.target)}
        />
        <div>State:</div>
        <input
          required
          maxLength='2'
          name='state'
          value={state}
          onChange={e => this.handleChange(e.target)}
        />
        <div>Zip:</div>
        <input
          required
          maxLength='5'
          name='zip'
          value={zip}
          onChange={e => this.handleChange(e.target)}
          type='number'
        />
        <input
          required
          name='eventDate'
          value={eventDate}
          onChange={e => this.handleChange(e.target)}
          type='date'
        />
        <textarea 
          required
          name='content'
          value={content}
          onChange={e => this.handleChange(e.target)}
          type='text'
          />
        <input 
        name='img' 
        value={img} 
        onChange={e => this.handleChange(e.target)} 
        type='text' />
        <button onClick={() => this.submitEvent()} >Submit</button>
      </div>
    ) : null
  }
}
 
export default CreateEvent