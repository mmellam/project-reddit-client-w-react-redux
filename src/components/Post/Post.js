import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, selectCurrentPosts, selectIsLoading } from './postSlice';
import Comment from '../Comment/Comment';
import { addPost, selectSavedPosts } from '../SavedPosts/savedPostsSlice';

const Post = (props) => {
    const dispatch = useDispatch();

    const currentPosts = useSelector(selectCurrentPosts);
    const isLoading = useSelector(selectIsLoading);
    const savedPosts = useSelector(selectSavedPosts);

    const [showWholePost, setShowWholePost] = useState(false);
    const [buttonText, setButtonText] = useState('See post with comments');
    const [saveButtonText, setSaveButtonText] = useState('Save post');

    const postUrl = props.url;
    const postId = props.id;


    useEffect(() => {
        if (showWholePost === false) {
            setButtonText('See post with comments');
        } else {
            //dispatch(fetchPost(postUrl)); 
            setButtonText('Hide');
            // false currentPost = {};
            //resetCurrentPost
        }
    }, [showWholePost]);

    const toggleWholePostHandler = () => {
        //reset currentpost object state to none
        setShowWholePost(!showWholePost);
        if (showWholePost === false) {
            // check if comments had already been loaded into state
            if (currentPosts.find((post) => post.id === postId)) {
                return;
            }
            dispatch(fetchPost(postUrl));  
        } 
    }

    const onClickSavePost = (e) => {
        const currentPost = currentPosts.filter((post) => post.id === postId);
        /*
        if (savedPosts.find((post) => post.id === postId)) {
            setSaveButtonText('Post has already been saved');
            return;
        } */
        dispatch(addPost(currentPost));
        setSaveButtonText('Saved');
        e.target.disabled = true;
    }

    if (isLoading) {
        return (
            <p>Loading post...</p>
        )
    }
// posts and comments displayed in markup -- how to display propeprly

    return (
        <div>
            <button onClick={toggleWholePostHandler}>{buttonText}</button>
            
            
            <p>
            {currentPosts.map((post) => {
                if (showWholePost && post.id === postId) {
                    return (
                        <div>
                            <p>matched</p>
                            <p>{post.id}</p>
                            <p>{post.fulltext}</p>
                            <p>first comment: {post.comments[0].data.body}</p>

                            <Comment comments={post.comments}/>

                            <button onClick={onClickSavePost}>{saveButtonText}</button>
                        </div>
                    
                    )
                }
                return null
            })}
            </p>
        </div>
    )
}


export default Post;