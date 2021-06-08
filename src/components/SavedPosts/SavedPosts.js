import React from 'react';
import { useSelector } from 'react-redux';
import { selectSavedPosts, selectSavedTitles } from './savedPostsSlice';



const SavedPosts = () => {

    const savedPosts = useSelector(selectSavedPosts);
    const savedTitles = useSelector(selectSavedTitles);

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
                return (null
                    )
            })}
            {console.log(savedTitles)}
            {console.log(savedPosts)}
        </div>
    )
};

export default SavedPosts;

/*4
<div className='post' key={post.data.id}>
                        <section className='post'>
                            <h2>{post.data.title}</h2>
                            {post.data.post_hint === 'link' ? <a href={post.data.url}>{post.data.url}</a> : null}
                            {post.data.post_hint === 'image' ? <img src={post.data.url} alt='#'/> : null}
                            {post.data.post_hint === 'hosted:video' ? <video controls width="300"><source src={post.data.media.reddit_video.fallback_url} type="video/mp4" muted></source></video> : null}
                            
                            <p>Subreddit: {post.data.subreddit_name_prefixed}</p>
                            <p>Score: {post.data.score} </p>
                            <p>{post.data.total_awards_received} Awards</p>
                            <p>{post.data.num_comments} Comments</p>
                        </section>

                     </div>
                     */