import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const searchPosts = createAsyncThunk(
    'searchBar/searchPosts',
    async () => {
        const data = await fetch('https://www.reddit.com/search.json?q=cake%20recipes');
        const json = await data.json();
        return json;
    }
);

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        searchTerm: ""
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: {
        [searchPosts.pending]: (state, action) => {},
        [searchPosts.fulfilled]: (state, action) => {
            state.posts = [...action.payload.data.children];
            console.log(action.payload)
        },
        [searchPosts.rejected]: (state, action) => {}

    }
});

export const { setSearchTerm } = searchBarSlice.actions;

export const selectSearchTerm = (state) => state.searchBar.searchTerm;

export default searchBarSlice.reducer;

/* state.postOverview.posts = [...action.payload];
            
            console.log(action.payload.data.children);
             */
