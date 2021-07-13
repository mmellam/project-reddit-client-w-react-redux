import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../components/Posts/postsSlice';
import savedPostsReducer from '../components/SavedPosts/savedPostsSlice';
import { loadState, saveState } from '../localStorage';

const persistedState = loadState();


const store = configureStore({
    reducer: {
        posts: postsReducer,
        savedPosts: savedPostsReducer
        
    },
    preloadedState: persistedState
});

store.subscribe(() => {
    saveState({
        savedPosts: store.getState().savedPosts
    });
});

export default store;
