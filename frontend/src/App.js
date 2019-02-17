import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Index from './components/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditList from './components/EditList';
import NewList from './components/NewList';
import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div>
            <div className="container-fluid nav-container">
              <div className="container">
                <Navbar />
              </div>
            </div>
            <Route exact path="/" component={ Home } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/index" component={ Index } />
              <Route exact path="/create" component={ NewList } />
              <Route path='/edit/:id' component={ EditList } />
            </div>
          </div>
        </Router>
        </Provider>
    );
  }
}

export default App;