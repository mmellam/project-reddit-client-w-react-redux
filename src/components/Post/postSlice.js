import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
    'postOverview/fetchPost',
    async (postUrl) => {
        const data = await fetch(`https://www.reddit.com${postUrl}.json`);
        const json = await data.json();
        return json;
    }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        currentPosts: [],
        isLoading: false,
        failedToLoad: false
    },
    reducers: {},
    extraReducers: {
        [fetchPost.pending]: (state, action) => {
            state.isLoading = true;
            state.failedToLoad = false;
        },
        [fetchPost.fulfilled]: (state, action) => {
            console.log(action.payload[0].data.children[0].data);
            const currentPost = {
                id: action.payload[0].data.children[0].data.id,
                fulltext: action.payload[0].data.children[0].data.selftext,
                comments: action.payload[1].data.children
            };
            state.currentPosts.push(currentPost);
            state.isLoading = false;
            state.failedToLoad = false;
        },
        [fetchPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.failedToLoad = true;
        }
    }
});

export const selectCurrentPosts = (state) => state.post.currentPosts;
export const selectIsLoading = (state) => state.post.isLoading;
export const selectFailedToLoad = (state) => state.post.failedToLoad;

export default postSlice.reducer;