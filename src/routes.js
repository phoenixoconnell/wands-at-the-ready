import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Landing from './Components/Landing/Landing';


export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
)
