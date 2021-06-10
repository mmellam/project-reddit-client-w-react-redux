import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const loadPostOverview = createAsyncThunk(
    'posts/loadPostOverview',
    async () => {
        const data = await fetch('https://www.reddit.com/r/europe.json?geo_filter=GLOBAL');
        const json = await data.json();
        return json;
    }
);

export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async (searchTerm) => {
        const data = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
        const json = await data.json();
        console.log(searchTerm);
        return json;
    }
);

export const loadSubReddits = createAsyncThunk(
    'posts/loadSubReddits',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com${subreddit}/top.json?t=week`);
        const json = await data.json();
        return json;
    }
);

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
        postTitles: [],
        isLoadingTitles: false,
        failedToLoadTitles: false,
        postDetails: [],
        isLoadingDetails: false,
        failedToLoadDetails: false
    },
    reducers: {},
    extraReducers: {
        [loadPostOverview.pending]: (state, action) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [loadPostOverview.fulfilled]: (state, action) => {
            state.postTitles = [...action.payload.data.children];
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
        },
        [loadPostOverview.rejected]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [searchPosts.pending]: (state, action) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.postTitles = [...action.payload.data.children];
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
        },
        [searchPosts.rejected]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [loadSubReddits.pending]: (state, action) => {
            state.isLoadingTitles = true;
            state.failedToLoadTitles = false;
        },
        [loadSubReddits.fulfilled]: (state, action) => {
            state.postTitles = [...action.payload.data.children];
            state.isLoadingTitles = false;
            state.failedToLoadTitles = false;
        },
        [loadSubReddits.rejected]: (state, action) => {
            state.isLoadingTitles = false;
            state.failedToLoadTitles = true;
        },

        [fetchDetails.pending]: (state, action) => {
            state.isLoadingDetails = true;
            state.failedToLoadDetails = false;
        },
        [fetchDetails.fulfilled]: (state, action) => {
            state.isLoadingDetails = false;
            state.failedToLoadDetails = false;
            console.log(action.payload[0].data.children[0].data);
            const postDetail = {
                id: action.payload[0].data.children[0].data.id,
                fulltext: action.payload[0].data.children[0].data.selftext,
                comments: action.payload[1].data.children
            };
            state.postDetails.push(postDetail);
        },
        [fetchDetails.rejected]: (state, action) => {
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