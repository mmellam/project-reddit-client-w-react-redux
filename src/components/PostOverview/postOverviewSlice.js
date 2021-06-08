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
)

export const postOverviewSlice = createSlice({
    name: 'postOverview',
    initialState: {
        posts: [],
        searchTerm: '',
        isLoadingOverview: false
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: {
        [loadPostOverview.pending]: (state, action) => {
            state.isLoadingOverview = true;
        },
        [loadPostOverview.fulfilled]: (state, action) => {
            state.isLoadingOverview = false;
            state.posts = [...action.payload.data.children];
            //console.log(action.payload.data.children);
        },
        [loadPostOverview.rejected]: (state, action) => {},

        [searchPosts.pending]: (state, action) => {
            state.isLoadingOverview = true;
        },
        [searchPosts.fulfilled]: (state, action) => {
            state.isLoadingOverview = false;
            state.posts = [...action.payload.data.children];
        },
        [searchPosts.rejected]: (state, action) => {},

        [loadSubReddits.pending]: (state, action) => {
            state.isLoadingOverview = true;
        },
        [loadSubReddits.fulfilled]: (state, action) => {
            state.isLoadingOverview = false;
            state.posts = [...action.payload.data.children];
        },
        [loadSubReddits.rejected]: (state, action) => {}



    }
});


export const { setSearchTerm } = postOverviewSlice.actions;

export const selectPostOverview = (state) => state.postOverview.posts;
export const selectSearchTerm = (state) => state.postOverview.searchTerm;
export const selectIsLoadingOverview = (state) => state.postOverview.isLoadingOverview;

export default postOverviewSlice.reducer;