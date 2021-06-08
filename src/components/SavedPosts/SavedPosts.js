import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, selectSavedPosts, selectSavedTitles } from './savedPostsSlice';



const SavedPosts = () => {
    const dispatch = useDispatch();
    const savedTitles = useSelector(selectSavedTitles);
    const savedPosts = useSelector(selectSavedPosts);

    const removePostHandler = (e) => {
        dispatch(removePost(e.target.value));
    }

    if (savedPosts.length === 0) {
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
                        <div className='post'>
                            <h2>{title.data.title}</h2>
                            {title.data.post_hint === 'link' ? <a href={title.data.url}>{title.data.url}</a> : null}
                            {title.data.post_hint === 'image' ? <img src={title.data.url} alt='#'/> : null}
                            {title.data.post_hint === 'hosted:video' ? <video controls width="300"><source src={title.data.media.reddit_video.fallback_url} type="video/mp4" muted></source></video> : null}
                            
                            <p>Subreddit: {title.data.subreddit_name_prefixed}</p>
                            <p>{title.data.total_awards_received} Awards</p>
                            <p>{title.data.num_comments} Comments</p>
                        </div>
                        <div className='full-post'>
                            {savedPosts.map((post) => {
                                if (post.id === title.data.id) {
                                    return <p>{post.fulltext}</p>
                                }
                                return null;
                            })}
                        </div>
                        <button onClick={removePostHandler} value={title.data.id}>Remove</button>
                     </div>
                    )
            })}
            {console.log(savedTitles)}
            {console.log(savedPosts)}
        </section>
    )
};

export default SavedPosts;

/*
check audio settings for videos
                     */