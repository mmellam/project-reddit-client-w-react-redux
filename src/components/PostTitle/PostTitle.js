import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostDetail from '../PostDetail/PostDetail';
import { fetchDetails, selectPostDetails, selectPostTitles } from '../Posts/postsSlice';


const PostTitle = (props) => {
    const dispatch = useDispatch();

    // extract post from props and calculate its date
    const post = props.post;
    const date = new Date(post.created_utc * 1000);

    // make store states available
    const postTitles = useSelector(selectPostTitles);
    const postDetails = useSelector(selectPostDetails);

    // component state
    const [viewDetail, setViewDetail] = useState(false);
    const [buttonText, setButtonText] = useState('Full post & comments');

    // dispatches an action to fetch post details if user clicks to view whole post
    const showDetail = (e) => {
        setViewDetail(!viewDetail);
        if (viewDetail === false) {
            // check if that post's details have previously been loaded into state
            if (postDetails.find((post) => post.id === e.target.value)) {
                return;
            }
            const post = postTitles.filter((post) => post.data.id === e.target.value);
            console.log(post)
            dispatch(fetchDetails(post[0].data.permalink));  
        }   
    }

    // toggles the button text for showing/hiding post details
    useEffect(() => {
        if (!viewDetail) {
            setButtonText('Full post & comments');
        } else {
            setButtonText('Hide');
        }
    }, [viewDetail]);

    return (
        <div className='post-title'>
            <h2>{post.title}</h2>
            {post.post_hint === 'link' ? <div className='link'><a href={post.url}>{post.domain}</a></div> : null}
            {post.post_hint === 'image' ? <img src={post.url} alt='#'/> : null}
            {post.post_hint === 'hosted:video' ? <video controls width="300"><source src={post.media.reddit_video.fallback_url} type="video/mp4"></source></video> : null}
            {post.post_hint === 'rich:video' ? <div className='link'><a href={post.url}>{post.domain}</a></div> : null}
            {post.post_hint === undefined && post.url_overridden_by_dest !== undefined ? <div className='link'><a href={post.url_overridden_by_dest}>{post.domain}</a></div> : null}
            
            <p>{post.total_awards_received} Awards</p>
            <p>{post.num_comments} Comments</p>
            <p>Posted in {post.subreddit_name_prefixed} by {post.author}, {date.toUTCString()}</p>

            <button className='post-button' onClick={showDetail} value={post.id}>{buttonText}</button> 

            {viewDetail ? <PostDetail id={post.id}/> : null}
        </div>
    )
}


export default PostTitle;

