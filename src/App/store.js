import { configureStore } from '@reduxjs/toolkit';
import postOverviewReducer from '../components/PostOverview/postOverviewSlice';
import postSliceReducer from '../components/Post/postSlice';

export default configureStore({
    reducer: {
        postOverview: postOverviewReducer,
        post: postSliceReducer
    }
})