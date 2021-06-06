import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostOverview, selectPostOverview } from './postOverviewSlice';
import Comments from '../Comments/Comments';
import Post from '../Post/Post';

const PostOverview = () => {
    const posts = useSelector(selectPostOverview);
    //console.log(posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPostOverview());
    }, [dispatch]);



    return (
        <section className='post-container'> 
            <h1>Recent posts</h1>
            {posts.map((post) => {

                const date = new Date(post.data.created_utc * 1000);
                return (
                    <div className='post' key={post.data.id}>
                        <section className='post'>
                            <h2>{post.data.title}</h2>
                            {post.data.post_hint === 'link' ? <a href={post.data.url}>{post.data.url}</a> : null}
                            {post.data.post_hint === 'image' ? <img src={post.data.url} alt='#'/> : null}
                            {post.data.post_hint === 'hosted:video' ? <video controls width="300"><source src={post.data.media.reddit_video.fallback_url} type="video/mp4" muted></source></video> : null}
                            
                            <p>Posted by: {post.data.author} on {date.toUTCString()} </p>
                            <p>Subreddit: {post.data.subreddit_name_prefixed}</p>
                            <p>Score: {post.data.score} </p>
                            <p>{post.data.total_awards_received} Awards</p>
                            <p>{post.data.num_comments} Comments</p>
                        </section>

                        <Post url={post.data.permalink} id={post.data.id}/>
                        <Comments />
                     </div>)})}
        </section>
    )
}

export default PostOverview;

//{post.data.post_hint === 'hosted:video' ? <video width="250"><source src={post.data.url}/></video> : null}
//                    {post.data.post_hint === 'hosted:video' ? <img src={post.data.media} alt='#'/> : null}
