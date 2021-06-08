import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
    'postOverview/fetchPost',
    async (postUrl) => {
        const data = await fetch(`https://www.reddit.com${postUrl}.json`);
        const json = await data.json();
        //console.log(`https://www.reddit.com${postUrl}`)
        return json;
    }
);
// current post 
export const postSlice = createSlice({
    name: 'post',
    initialState: {
        currentPosts: [],
        isLoading: false
    },
    reducers: {},
    extraReducers: {
        [fetchPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload[0].data.children[0].data);
            const currentPost = {
                id: action.payload[0].data.children[0].data.id,
                fulltext: action.payload[0].data.children[0].data.selftext,
                comments: action.payload[1].data.children
            };
            state.currentPosts.push(currentPost);
            //console.log(currentPost)
        },
        [fetchPost.rejected]: (state, action) => {}
    }


})

export const selectCurrentPosts = (state) => state.post.currentPosts;
export const selectIsLoading = (state) => state.post.isLoading;

export default postSlice.reducer;