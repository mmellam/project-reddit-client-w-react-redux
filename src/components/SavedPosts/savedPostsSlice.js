import { createSlice } from '@reduxjs/toolkit';

const savedPostsSlice = createSlice({
    name: 'savedPosts',
    initialState: {
        savedTitles: [], // holds the loaded titles saved by user
        savedPosts: [] // holds the loaded comments for those posts that are saved by the user
    },
    reducers: {
        addPostTitle: (state, action) => {
            state.savedTitles.push(...action.payload);
        },
        addPost: (state, action) => {
            state.savedPosts.push(...action.payload);
        }
    }
});

export const selectSavedPosts = (state) => state.savedPosts.savedPosts;
export const selectSavedTitles = (state) => state.savedPosts.savedTitles;

export const { addPost, addPostTitle } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;