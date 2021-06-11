import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostOverview, selectFailedToLoadTitles, selectIsLoadingTitles, selectPostTitles } from './postsSlice';
import PostTitle from '../PostTitle/PostTitle';


const PostOverview = () => {
    const dispatch = useDispatch();   

    const postTitles = useSelector(selectPostTitles);
    const isLoadingTitles = useSelector(selectIsLoadingTitles);
    const failedToLoadTitles = useSelector(selectFailedToLoadTitles);
     
    useEffect(() => {
        dispatch(loadPostOverview());
    }, [dispatch]);

    if (isLoadingTitles) {
        return <div className='loading'>Loading posts...</div>
    }

    if (failedToLoadTitles) {
        return <div>Network error while loading data. Please try again.</div>
    } 

    return (
        <section className='post-container'> 
            {postTitles.map((post) => {               
                return (
                    <div className='post' key={post.data.id}>
                        <PostTitle post={post.data} />
                    </div>)})}
        </section>
    )
}

export default PostOverview;