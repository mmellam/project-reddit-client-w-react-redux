import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, selectSavedDetails, selectSavedTitles } from './savedPostsSlice';
import PostTitle from '../PostTitle/PostTitle';


const SavedPosts = () => {
    const dispatch = useDispatch();

    // make store states available
    const savedTitles = useSelector(selectSavedTitles);
    const savedDetails = useSelector(selectSavedDetails);

    // dispatches an action to remove that post from the 'saved' list
    const removePostHandler = (e) => {
        dispatch(removePost(e.target.value));
    }

    // display empty list if no posts saved
    if (savedDetails.length === 0) {
        return (
            <div>
                <h2>Saved for later</h2>
                <p>You have no saved posts yet.</p>
            </div>
        )
    }

    return (
        <section className='post-container'>
            <h2>Saved for later</h2>
            {savedTitles.map((title) => {
                return (
                    <div className='post' key={title.data.id}>
                        <PostTitle post={title.data} />
                        <button onClick={removePostHandler} value={title.data.id}>Remove</button>
                    </div>
                    )
            })}
            {console.log(savedTitles)}
            {console.log(savedDetails)}
        </section>
    )
}


export default SavedPosts;