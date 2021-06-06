import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostOverview } from './postOverviewSlice';

const PostOverview = () => {
    const posts = useSelector(selectPostOverview);
    console.log(posts)
    return (
        <section className='post-container'> 
            <h1>post overview goes here!!</h1>
            {posts.map((post) => {

                const date = new Date(post.data.created_utc * 1000);
                return (
                    <div className='post' key={post.data.id}>
                        <h2>{post.data.title}</h2>
                        {post.data.post_hint === 'link' ? <a href={post.data.url}>{post.data.url}</a> : null}
                        {post.data.post_hint === 'image' ? <img src={post.data.url} alt='#'/> : null}
                        {post.data.post_hint === 'hosted:video' ? <video controls width="300"><source src={post.data.media.reddit_video.fallback_url} type="video/mp4"></source></video> : null}
                        
                        <p>Posted by: {post.data.author} on {date.toUTCString()} </p>
                        <p>Subreddit: {post.data.subreddit_name_prefixed}</p>
                        <p>Score: {post.data.score} </p>
                        <p>{post.data.total_awards_received} Awards</p>
                        <p>{post.data.num_comments} Comments</p>
                    
                     </div>)})}
        </section>

    )

}

export default PostOverview;

//{post.data.post_hint === 'hosted:video' ? <video width="250"><source src={post.data.url}/></video> : null}
//                    {post.data.post_hint === 'hosted:video' ? <img src={post.data.media} alt='#'/> : null}
