import React from 'react';

//could add button to add more comments
const Comment = (props) => {
    return (
        <div>
            <h2>Top 10 Comments</h2>
            {props.comments.map((comment, index) => {
                return index < 10 && <p>index: {index} {comment.data.body}</p>
            })}
        </div>
    )
}

export default Comment;