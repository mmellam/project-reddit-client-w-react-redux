import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, selectCurrentPosts, selectIsLoading } from './postSlice';


const Post = (props) => {
    const dispatch = useDispatch();

    const currentPosts = useSelector(selectCurrentPosts);
    const isLoading = useSelector(selectIsLoading);
    const [showWholePost, setShowWholePost] = useState(false);
    const [buttonText, setButtonText] = useState('See post with comments');

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
            //setFullPost('');
            dispatch(fetchPost(postUrl));  
        } 
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
            Id: {showWholePost ? currentPosts[0].id : 'dont show it'} </p>
               <p> Text: 
                {showWholePost ? currentPosts[0].fulltext : 'dont show it'}
                </p>
                <p>comments: {showWholePost ? currentPosts[0].comments[0].data.body : 'dont show it'}
                {console.log(postId)} 
{console.log(currentPosts)}
{console.log(currentPosts.id)}

</p>
        </div>
    )
}


export default Post;
          
//{showWholePost ? `https://www.reddit.com${props.url}` : 'none'}
// {isLoading ? 'loading' : null}
//{currentPost.selftext !== undefined ?  : null}

/*
            if (showWholePost === false) {
                //setFullPost('');
                dispatch(fetchPost(postUrl));  
            } 
*/