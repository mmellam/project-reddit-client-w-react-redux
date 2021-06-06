import { configureStore } from '@reduxjs/toolkit';
import postOverviewReducer from '../components/Post/postOverviewSlice';

export default configureStore({
    reducer: {
        postOverview: postOverviewReducer,

    }
})