import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, selectSearchTerm, setSearchTerm } from '../Post/postOverviewSlice';


const SearchBar = () => {
    const dispatch = useDispatch();
    
    const searchTerm = useSelector(selectSearchTerm);

    const onChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }

    const onClickSearchHandler = () => {
        dispatch(searchPosts(searchTerm));
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