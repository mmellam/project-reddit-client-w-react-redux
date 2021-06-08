import React from 'react';
import { useSelector } from 'react-redux';
import { selectSavedPosts } from './savedPostsSlice';



const SavedPosts = () => {

    const savedPosts = useSelector(selectSavedPosts);

    if (savedPosts.length === 0) {
        return (
            <div>
                <h2>Saved for later</h2>
                <p>You have no saved posts yet.</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Saved for later</h2>
            <p>posts here</p>
            {savedPosts.map((post) => {
                return null
            })}
            {console.log(savedPosts)}
        </div>
    )
};

export default SavedPosts;