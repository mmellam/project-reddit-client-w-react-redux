import { configureStore } from '@reduxjs/toolkit';
import postOverviewReducer from '../components/PostOverview/postOverviewSlice';
import postReducer from '../components/Post/postSlice';

export default configureStore({
    reducer: {
        postOverview: postOverviewReducer,
        post: postReducer
    }
})