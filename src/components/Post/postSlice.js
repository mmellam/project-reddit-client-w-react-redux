import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
    'postOverview/fetchPost',
    async (postUrl) => {
        const data = await fetch(`https://www.reddit.com${postUrl}.json`);
        const json = await data.json();
        console.log(`https://www.reddit.com${postUrl}`)
        return json;
    }
);
// current post 
export const postSlice = createSlice({
    name: 'post',
    initialState: {
        currentPost: {},
        isLoading: false
        // showWholePost: false
    },
    reducers: { /*
        toggleShowWholePost: (state, action) => {
            state.showWholePost === true ? state.showWholePost = false : state.showWholePost = true;
        }*/
    },
    extraReducers: {
        [fetchPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentPost = {...action.payload[0].data.children[0].data};
            //console.log(action.payload)
            //console.log(state.currentPost)
        },
        [fetchPost.rejected]: (state, action) => {}
    }


})

export const { toggleShowWholePost } = postSlice.actions;

export const selectCurrentPost = (state) => state.post.currentPost;
export const selectIsLoading = (state) => state.post.isLoading;

export default postSlice.reducer;