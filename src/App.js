import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  // async componentDidMount() {
  //   

  //   const res = await axios.get('https://api.github.com/users')

  //   this.setState({users: res.data, loading: false})
  // }

  const searchUsers = async text => {
    setLoading(true);

    const url = `https://api.github.com/search/users?q=${text}`;

    const res = await axios.get(url)

    setUsers(res.data.items);
    setLoading(false)
  }

  //get a single github user data
  const getUser = async (username) =>  {
    setLoading(true);

    const url = `https://api.github.com/users/${username}`;

    const res = await axios.get(url)

    setUser(res.data);
    setLoading(false);
  }

  //Get users repos
  const getUserRepos = async (username) =>  {
    setLoading(true);

    const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

    const res = await axios.get(url)

    setRepos(res.data);
    setLoading(false);
  }

  //Clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })

    setTimeout(() => setAlert(null), 5000);
  }

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}></Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={getUser} 
                  getUserRepos={getUserRepos} 
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

export default App;
