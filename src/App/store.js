import { configureStore } from '@reduxjs/toolkit';
import postOverviewReducer from '../components/Post/postOverviewSlice';
import searchBarReducer from '../components/SearchBar/searchBarSlice';

export default configureStore({
    reducer: {
        postOverview: postOverviewReducer,
        searchBar: searchBarReducer
    }
})