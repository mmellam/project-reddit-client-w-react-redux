import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// fetches data for first page load
export const loadPostOverview = createAsyncThunk(
    'posts/loadPostOverview',
    async () => {
        const data = await fetch('https://www.reddit.com/r/europe/top.json?t=day');
        const json = await data.json();
        return json;
    }
);

// fetches data for search term entered by user
export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async (searchTerm) => {
        const data = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
        const json = await data.json();
        return json;
    }
);

// fetches data for subreddit selected by user
export const loadSubReddits = createAsyncThunk(
    'posts/loadSubReddits',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com${subreddit}/top.json?t=week`);
        const json = await data.json();
        return json;
    }
);

// fetches full post and comment data when user clicks to view whole post
export const fetchDetails = createAsyncThunk(
    'posts/fetchDetails',
    async (postUrl) => {
        const data = await fetch(`https://www.reddit.com${postUrl}.json`);
        const json = await data.json();
        return json;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        postTitles: [], // holds objects with post title data
        isLoadingTitles: false,
        failedToLoadTitles: false,
        postDetails: [], // holds objects with post detail data
        isLoadingDetails: false,
        failedToLoadDetails: false
    },
    reducers: {},
    extraReducers: {
        [loadPostOverview.pending]: (state) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [loadPostOverview.fulfilled]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
            state.postTitles = [...action.payload.data.children];
        },
        [loadPostOverview.rejected]: (state) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [searchPosts.pending]: (state) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
            state.postTitles = [...action.payload.data.children];
        },
        [searchPosts.rejected]: (state) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [loadSubReddits.pending]: (state) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [loadSubReddits.fulfilled]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
            state.postTitles = [...action.payload.data.children];
        },
        [loadSubReddits.rejected]: (state) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [fetchDetails.pending]: (state) => {
            state.isLoadingDetails = true;
            state.failedToLoadDetails = false;
        },
        [fetchDetails.fulfilled]: (state, action) => {
            state.isLoadingDetails = false;
            state.failedToLoadDetails = false;
            //console.log(action.payload[0].data.children[0].data);
            const postDetail = {
                id: action.payload[0].data.children[0].data.id,
                fulltext: action.payload[0].data.children[0].data.selftext,
                comments: action.payload[1].data.children
            };
            state.postDetails.push(postDetail);
        },
        [fetchDetails.rejected]: (state) => {
            state.isLoadingDetails = false;
            state.failedToLoadDetails = true;
        }
    }
});


export const selectPostTitles = (state) => state.posts.postTitles;
export const selectIsLoadingTitles = (state) => state.posts.isLoadingTitles;
export const selectFailedToLoadTitles = (state) => state.posts.failedToLoadTitles;

export const selectPostDetails = (state) => state.posts.postDetails;
export const selectIsLoadingDetails = (state) => state.posts.isLoadingDetails;
export const selectFailedToLoadDetails = (state) => state.posts.failedToLoadDetails;


export default postsSlice.reducer;