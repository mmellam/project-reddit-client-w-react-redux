import { configureStore } from '@reduxjs/toolkit';
import postOverviewReducer from '../components/PostOverview/postOverviewSlice';
import postReducer from '../components/Post/postSlice';
import savedPostsReducer from '../components/SavedPosts/savedPostsSlice';

export default configureStore({
    reducer: {
        postOverview: postOverviewReducer,
        post: postReducer,
        savedPosts: savedPostsReducer
    }
})