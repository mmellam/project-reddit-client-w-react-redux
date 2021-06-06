import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPostOverview } from '../Post/postOverviewSlice';
import { searchPosts, setSearchTerm } from './searchBarSlice';



const SearchBar = () => {
    // trigger the action from async action creator
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPostOverview());
    });

    const onChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }

    const onClickSearchHandler = () => {
        dispatch(searchPosts());
    }
    

    return (
        <div>
            <h1>Search Reddit</h1>
            <input type='search' onChange={onChangeHandler}></input>
            <button onClick={onClickSearchHandler}>Search</button>
        </div>
    )
}

export default SearchBar;