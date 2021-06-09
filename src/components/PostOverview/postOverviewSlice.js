import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const loadPostOverview = createAsyncThunk(
    'postOverview/loadPostOverview',
    async () => {
        const data = await fetch('https://www.reddit.com/r/popular.json?geo_filter=GLOBAL');
        const json = await data.json();
        return json;
    }
);

export const searchPosts = createAsyncThunk(
    'postOverview/searchPosts',
    async (searchTerm) => {
        const data = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
        const json = await data.json();
        console.log(searchTerm);
        return json;
    }
);

export const loadSubReddits = createAsyncThunk(
    'postOverview/loadSubReddits',
    async (subreddit) => {
        const data = await fetch(`https://www.reddit.com${subreddit}/top.json?t=week`);
        const json = await data.json();
        return json;
    }
);

const postOverviewSlice = createSlice({
    name: 'postOverview',
    initialState: {
        posts: [],
        searchTerm: '',
        isLoadingOverview: false,
        failedToLoad: false
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: {
        [loadPostOverview.pending]: (state, action) => {
            state.isLoadingOverview = true;
            state.failedToLoad = false;
        },
        [loadPostOverview.fulfilled]: (state, action) => {
            state.posts = [...action.payload.data.children];
            state.isLoadingOverview = false;
            state.failedToLoad = false;
        },
        [loadPostOverview.rejected]: (state, action) => {
            state.isLoadingOverview = false;
            state.failedToLoad = true;
        },

        [searchPosts.pending]: (state, action) => {
            state.isLoadingOverview = true;
            state.failedToLoad = false;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.posts = [...action.payload.data.children];
            state.isLoadingOverview = false;
            state.failedToLoad = false;
        },
        [searchPosts.rejected]: (state, action) => {
            state.isLoadingOverview = false;
            state.failedToLoad = true;
        },

        [loadSubReddits.pending]: (state, action) => {
            state.isLoadingOverview = true;
            state.failedToLoad = false;
        },
        [loadSubReddits.fulfilled]: (state, action) => {
            state.posts = [...action.payload.data.children];
            state.isLoadingOverview = false;
            state.failedToLoad = false;
        },
        [loadSubReddits.rejected]: (state, action) => {
            state.isLoadingOverview = false;
            state.failedToLoad = true;
        }
    }
});


export const { setSearchTerm } = postOverviewSlice.actions;

export const selectPostOverview = (state) => state.postOverview.posts;
export const selectSearchTerm = (state) => state.postOverview.searchTerm;
export const selectIsLoadingOverview = (state) => state.postOverview.isLoadingOverview;
export const selectFailedToLoad = (state) => state.postOverview.failedToLoad;

export default postOverviewSlice.reducer;