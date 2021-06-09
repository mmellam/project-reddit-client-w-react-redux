import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostOverview, selectFailedToLoad, selectIsLoadingOverview, selectPostOverview } from './postOverviewSlice';
import Post from '../Post/Post';

const PostOverview = () => {
    const posts = useSelector(selectPostOverview);
    const isLoadingOverview = useSelector(selectIsLoadingOverview);
    const failedToLoad = useSelector(selectFailedToLoad);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPostOverview());
    }, [dispatch]);

    if (isLoadingOverview) {
        return <div className=''>'Loading posts...'</div>
    }
    if (failedToLoad) {
        return <p>Network error while loading data. Please try again.</p>
    }

    return (
        <section className='post-container'> 
            
            {posts.map((post) => {

                const date = new Date(post.data.created_utc * 1000);
                return (
                    <div className='post' key={post.data.id}>
                        <section className='post'>
                            <h2>{post.data.title}</h2>
                            {post.data.post_hint === 'link' ? <a href={post.data.url}>{post.data.url}</a> : null}
                            {post.data.post_hint === 'image' ? <img src={post.data.url} alt='#'/> : null}
                            {post.data.post_hint === 'hosted:video' ? <video controls width="300"><source src={post.data.media.reddit_video.fallback_url} type="video/mp4" muted></source></video> : null}
                            {post.data.post_hint === undefined && post.data.url_overridden_by_dest !== undefined ? <a href={post.data.url_overridden_by_dest}>{post.data.url_overridden_by_dest}</a> : null}
                            
                            <p>Posted by: {post.data.author} on {date.toUTCString()} </p>
                            <p>Subreddit: {post.data.subreddit_name_prefixed}</p>
                            <p>Score: {post.data.score} </p>
                            <p>{post.data.total_awards_received} Awards</p>
                            <p>{post.data.num_comments} Comments</p>
                        </section>

                        <Post url={post.data.permalink} id={post.data.id}/>
                     </div>)})}
        </section>
    )
}

export default PostOverview;