import { createSlice } from '@reduxjs/toolkit';

const savedPostsSlice = createSlice({
    name: 'savedPosts',
    initialState: {
        savedPosts: []
    },
    reducers: {
        addPost: (state, action) => {
            state.savedPosts.push(...action.payload);
        }
    }
});

export const selectSavedPosts = (state) => state.savedPosts.savedPosts;

export const { addPost } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;