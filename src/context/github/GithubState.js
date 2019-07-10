import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState ={
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async text => {
        setLoading();
    
        const url = `https://api.github.com/search/users?q=${text}`;
    
        const res = await axios.get(url)

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })

    }
    const clearUsers = () => dispatch({ type: CLEAR_USERS })

      //get a single github user data
    const getUser = async (username) => {
        setLoading();

        const url = `https://api.github.com/users/${username}`;

        const res = await axios.get(url)

        dispatch({
            type: GET_USER, 
            payload: res.data
        })
    }
    
    //Get users repos
    const getUserRepos = async (username) => {
        setLoading();

        const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

        const res = await axios.get(url)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    const setLoading = () => dispatch({ type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;