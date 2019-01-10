import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import './App.scss';

// import authRequests from '../helpers/data/authRequests';

class App extends React.Component {
  state ={
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const { authed } = this.state;

    if (!authed) {
      return (
        <div className="App">
          {/* <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent}/> */}
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
      You are authenticated.
      </div>
    );
  }
}

export default App;
