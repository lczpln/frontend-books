import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Livro from './components/Livro';

class App extends Component {
  state = {
    username: '',
    password: '',
    bookcard: '',
    logged: false,
  }

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  userSetBookCard = () => {
    this.setState({ bookcard: this.state.username });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  userSetLogged = () => {
    this.setState({ logged: true });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Route path='/' exact render={(props) => <Login {...props} {...this.state}
              handleChangeUsername={this.handleChangeUsername.bind(this)}
              handleChangePassword={this.handleChangePassword.bind(this)} 
              userSetLogged={this.userSetLogged.bind(this)}
              userSetBookCard={this.userSetBookCard.bind(this)}
              />}
            />
            <Route path='/home' render={(props) => <Home {...props} {...this.state} />} />
            <Route path='/books/:id' render={(props) => <Livro {...props} bookcard={this.state.bookcard} />} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
