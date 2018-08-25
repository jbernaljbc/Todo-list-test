import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';

class App extends Component {

  constructor () {
    super()
    this.state = {
      user:null
    }

//    this.app = firebase.initializeApp(DB_CONFIG);
//    this.database = this.app.database().ref().child('notes');

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
    })
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        console.log(result.user)
        firebase.database().ref('users')
          .push({
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL
          })
      })
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log('out'))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  renderLoginButton(){
    if (this.state.user) {
      return (
        <div>
          <p>Hola {this.state.user.displayName}</p> 
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <button onClick={this.handleLogout}>Salir</button>
        </div>
      )
    } else {
      return (
        <button onClick={this.handleAuth}>Login</button>
      )
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;
