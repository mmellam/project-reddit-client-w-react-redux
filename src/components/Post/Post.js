import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, selectCurrentPost, selectIsLoading } from './postSlice';


const Post = (props) => {
    const dispatch = useDispatch();

    const currentPost = useSelector(selectCurrentPost);
    const isLoading = useSelector(selectIsLoading);
    const [showWholePost, setShowWholePost] = useState(false);
    const [buttonText, setButtonText] = useState('See post with comments');

    const postUrl = props.url;

    useEffect(() => {
        if (showWholePost === true) {
            setButtonText('Hide');
        } else {
            setButtonText('See post with comments');
        }
    }, [showWholePost]);

    const toggleWholePostHandler = () => {
        setShowWholePost(!showWholePost);
        if (showWholePost === false) {
            //setFullPost('');
            dispatch(fetchPost(postUrl));  
        } 
    }

    if (isLoading) {
        return (
            <p>Loading post...</p>
        )
    }
    // hide button or change it back to close comments
    return (
        
        <div>

            <button onClick={toggleWholePostHandler}>{buttonText}</button>
            
            
            <p>
               
                {showWholePost && currentPost !== undefined ? currentPost.selftext : 'dont show it'}
                </p>

        </div>
    )
}

export default Post;
          
//{showWholePost ? `https://www.reddit.com${props.url}` : 'none'}
// {isLoading ? 'loading' : null}
//{currentPost.selftext !== undefined ?  : null}