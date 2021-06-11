import { createSlice } from '@reduxjs/toolkit';

const savedPostsSlice = createSlice({
    name: 'savedPosts',
    initialState: {
        savedTitles: [], // holds the loaded titles for those posts that were saved by the user
        savedDetails: [] // holds the loaded details for those posts that were saved by the user
    },
    reducers: {
        addPostTitle: (state, action) => {
            state.savedTitles.push(...action.payload);
        },
        addPostDetail: (state, action) => {
            state.savedDetails.push(...action.payload);
        },
        removePost: (state, action) => {
            state.savedTitles = state.savedTitles.filter((title) => title.data.id !== action.payload);
            state.savedDetails = state.savedDetails.filter((post) => post.id !== action.payload);
        }
    }
});


export const selectSavedDetails = (state) => state.savedPosts.savedDetails;
export const selectSavedTitles = (state) => state.savedPosts.savedTitles;

export const { addPostDetail, addPostTitle, removePost } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;