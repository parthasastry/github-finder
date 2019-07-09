import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';


class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   

  //   const res = await axios.get('https://api.github.com/users')

  //   this.setState({users: res.data, loading: false})
  // }

  searchUsers = async text => {
    this.setState({ loading: true });

    const url = `https://api.github.com/search/users?q=${text}`;

    const res = await axios.get(url)

    this.setState({ users: res.data.items, loading: false })
  }

  //get a single github user data
  getUser = async (username) =>  {
    this.setState({ loading: true });

    const url = `https://api.github.com/users/${username}`;

    const res = await axios.get(url)

    this.setState({ user: res.data, loading: false })
  }

  //Get users repos
  getUserRepos = async (username) =>  {
    this.setState({ loading: true });

    const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

    const res = await axios.get(url)

    this.setState({ repos: res.data, loading: false })
  }

  //Clear users
  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })

    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos} 
                  user={user} loading={loading} 
                  repos={repos}
                />
              )}></Route>
            </Switch>

          </div>
        </div>
      </Router>

    );
  }
}

export default App;
