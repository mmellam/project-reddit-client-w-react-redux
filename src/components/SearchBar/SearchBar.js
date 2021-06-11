import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadSubReddits, searchPosts } from '../Posts/postsSlice';


const SearchBar = () => {
    const dispatch = useDispatch();

    // component state
    const [currentResultsHeading, setCurrentResultsHeading] = useState('in /r/popular');
    const [searchTerm, setSearchTerm] = useState('');
    const [timeframe, setTimeframe] = useState('today');

    // set entered search term as state
    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    // dispatch action to fetch data for the entered search term
    const onClickSearchHandler = () => {
        setCurrentResultsHeading(`for '${searchTerm}'`);
        setTimeframe('');
        dispatch(searchPosts(searchTerm));
    }

    // dispatch action to fetch data for the selected subreddit
    const onClickSubRedditHandler = (e) => {
        setCurrentResultsHeading(`in ${e.target.value}`);
        setTimeframe('this week');
        dispatch(loadSubReddits(e.target.value));
    }

    return (
        <div>
          <div className='search'>
            <div className='search-bar'>
              <h1>Search reddit</h1>
              <input type='search' onChange={onChangeHandler} autoFocus></input>
              <button onClick={onClickSearchHandler}>Search</button>
            </div>
            <div className='quick-links'>
              <h2>Suggested</h2>
              <button value='/r/popular' onClick={onClickSubRedditHandler}>/r/popular</button>
              <button value='/r/worldnews' onClick={onClickSubRedditHandler}>/r/worldNews</button>
              <button value='/r/de' onClick={onClickSubRedditHandler}>/r/de</button>
              <button value='/r/europe' onClick={onClickSubRedditHandler}>/r/europe</button>
              <button value='/r/politics' onClick={onClickSubRedditHandler}>/r/politics</button>
              <button value='/r/recipes' onClick={onClickSubRedditHandler}>/r/recipes</button>
              <button value='/r/photography' onClick={onClickSubRedditHandler}>/r/photography</button>
              <button value='/r/technology' onClick={onClickSubRedditHandler}>/r/technology</button>
              <button value='/r/oldschoolcool' onClick={onClickSubRedditHandler}>/r/oldSchoolCool</button>
              <button value='/r/askscience' onClick={onClickSubRedditHandler}>/r/askScience</button>
              <button value='/r/programmerhumor' onClick={onClickSubRedditHandler}>/r/programmerHumor</button>
              <button value='/r/space' onClick={onClickSubRedditHandler}>/r/space</button>
              <button value='/r/javascript' onClick={onClickSubRedditHandler}>/r/javascript</button>
              <button value='/r/outdoors' onClick={onClickSubRedditHandler}>/r/outdoors</button>
            </div>
          </div>
          <h2 className='post-overview-heading'>Top posts {timeframe} {currentResultsHeading}</h2>
        </div>
    )
}


export default SearchBar;