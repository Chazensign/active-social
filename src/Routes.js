import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Wizard from './components/Wizard'
import Member from './components/Member'
import Chat from './components/Chat'
import UserSearch from './components/UserSearch';
import User from './components/User';
import ActivityView from './components/ActivityView';


export default (
  <Switch>
    <Route exact path='/' component={Landing} ></Route>
    <Route path='/wizard' component={Wizard} ></Route>
    <Route path='/member/:user_id' component={Member} ></Route>
    <Route path='/chat' component={Chat} ></Route>
    <Route path='/search' component={UserSearch} ></Route>
    <Route path='/user/:user_id' component={User} ></Route>
    <Route path='/activity/:activ_id' component={ActivityView} ></Route>
  </Switch>

)