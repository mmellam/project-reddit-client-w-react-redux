import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const loadPostOverview = createAsyncThunk(
    'postOverview/loadPostOverview',
    async () => {
        const data = await fetch('https://www.reddit.com/r/popular.json?geo_filter=GLOBAL');
        const json = await data.json();
        return json;
    }
);


export const postOverviewSlice = createSlice({
    name: 'postOverview',
    initialState: {
        posts: []
    },
    reducers: {},
    extraReducers: {
        [loadPostOverview.pending]: (state, action) => {},
        [loadPostOverview.fulfilled]: (state, action) => {
            state.posts = [...action.payload.data.children];
            console.log(action.payload.data.children);
        },
        [loadPostOverview.rejected]: (state, action) => {}
    }
});



export const selectPostOverview = (state) => state.postOverview.posts;

export default postOverviewSlice.reducer;