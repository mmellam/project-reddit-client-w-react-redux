import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Comment from '../Comment/Comment';
import { addPostDetail, addPostTitle, selectSavedTitles } from '../SavedPosts/savedPostsSlice';
import { selectFailedToLoadDetails, selectIsLoadingDetails, selectPostDetails, selectPostTitles } from '../Posts/postsSlice';


const PostDetail = (props) => {
    const dispatch = useDispatch();

    // extract id from props
    const postId = props.id;
    
    // make store states available
    const postDetails = useSelector(selectPostDetails);
    const postTitles = useSelector(selectPostTitles);
    const savedTitles = useSelector(selectSavedTitles);
    const isLoadingDetails = useSelector(selectIsLoadingDetails);
    const failedToLoadDetails = useSelector(selectFailedToLoadDetails);

    // component state
    const [saveButtonText, setSaveButtonText] = useState('Save post');
    const [buttonState, setButtonState] = useState(false);

    // change button text after saving post
    useEffect(() => {
        if (savedTitles.find((title) => title.data.id === postId)) {
            setButtonState(true);
            setSaveButtonText('Saved');   
        } else {
            setButtonState(false);
            setSaveButtonText('Save post');
        }
    }, [savedTitles, postId]);

    // save current post title and details from store in 'details' state
    const onClickSavePost = () => {
        const postTitle = postTitles.filter((post) => post.data.id === postId);
        const postDetail = postDetails.filter((post) => post.id === postId);
        dispatch(addPostTitle(postTitle));
        dispatch(addPostDetail(postDetail));
    }

    // display load and error statuses
    if (isLoadingDetails) {
        return <div className='loading'>Loading details...</div>
    }

    if (failedToLoadDetails) {
        return <div>Network error while loading data. Please refresh the page and try again.</div>
    } 

    return (
        <div>
            {postDetails.map((post) => {
                if (post.id === postId) {
                    return (
                        <div key={post.id}>
                            <div>
                                <ReactMarkdown className='post-fulltext'>{post.fulltext}</ReactMarkdown>
                            </div>
                            <Comment comments={post.comments}/>
                            <button className='post-button' onClick={onClickSavePost} disabled={buttonState}>{saveButtonText}</button>
                        </div>   
                    )
                }
                return null
            })}
        </div>
    )
}


export default PostDetail;