import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../components/Posts/postsSlice';
import savedPostsReducer from '../components/SavedPosts/savedPostsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        savedPosts: savedPostsReducer
    }
})