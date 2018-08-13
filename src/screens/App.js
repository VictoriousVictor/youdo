import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../utils/Layout';

import Auth from '../screens/Auth/Auth';
import Profile from '../screens/Profile/Profile';
import Home from '../screens/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Auth} />
            <Route path='/signup' component={Auth} />
            <Route path='/' component={Home} />
          </Switch> 
        </Layout>
      </div>
    );
  }
}

export default App;
