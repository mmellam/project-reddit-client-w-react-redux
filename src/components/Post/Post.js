import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { fetchPost, selectCurrentPosts, selectIsLoading, selectFailedToLoad } from './postSlice';
import Comment from '../Comment/Comment';
import { addPost, addPostTitle, selectSavedTitles } from '../SavedPosts/savedPostsSlice';
import { selectPostOverview } from '../PostOverview/postOverviewSlice';

const Post = (props) => {
    const dispatch = useDispatch();

    const currentPosts = useSelector(selectCurrentPosts);
    const isLoading = useSelector(selectIsLoading);
    const failedToLoad = useSelector(selectFailedToLoad);
    const postsInOverview = useSelector(selectPostOverview);
    const savedTitles = useSelector(selectSavedTitles);

    const [showWholePost, setShowWholePost] = useState(false);
    const [buttonText, setButtonText] = useState('See post with comments');
    const [saveButtonText, setSaveButtonText] = useState('Save post');
    const [buttonState, setButtonState] = useState(false);

    const postUrl = props.url;
    const postId = props.id;

    useEffect(() => {
        if (showWholePost === false) {
            setButtonText('See post with comments');
        } else {
            setButtonText('Hide');
        }
    }, [showWholePost]);

    const toggleWholePostHandler = () => {
        setShowWholePost(!showWholePost);
        if (showWholePost === false) {
            // check if comments had already been loaded into state
            if (currentPosts.find((post) => post.id === postId)) {
                return;
            }
            dispatch(fetchPost(postUrl));  
        } 
    }

    useEffect(() => {
        if (savedTitles.find((title) => title.data.id === postId)) {
            setButtonState(true);
            setSaveButtonText('Saved');   
        } else {
            setButtonState(false);
            setSaveButtonText('Save post');
        }
    }, [savedTitles, postId]);

    const onClickSavePost = () => {
        // get current post title and comments from store
        const postTitle = postsInOverview.filter((post) => post.data.id === postId);
        const currentPost = currentPosts.filter((post) => post.id === postId);

        dispatch(addPostTitle(postTitle));
        dispatch(addPost(currentPost));

    }

    if (isLoading) {
        return <p>Loading post...</p>
    }
    if (failedToLoad) {
        return <p>Network error while loading data. Please refresh the page and try again.</p>
    }

    return (
        <div>
            <button onClick={toggleWholePostHandler}>{buttonText}</button>
            
            <p>
            {currentPosts.map((post) => {
                if (showWholePost && post.id === postId) {
                    return (
                        <div>
                            <p>{post.fulltext}</p>
                            <ReactMarkdown>{post.fulltext}</ReactMarkdown>

                            <Comment comments={post.comments}/>

                            <button onClick={onClickSavePost} disabled={buttonState}>{saveButtonText}</button>
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