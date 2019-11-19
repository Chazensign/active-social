import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step1'


export default (
  <Switch>
    <Route path='/wizard/step1' component={Step1}></Route>
    <Route path='/wizard/step2' component={Step2}></Route>
    <Route path='/wizard/step3' component={Step3}></Route>
  </Switch>
)