import React from 'react';

const Comment = (props) => {
    return (
        <div>
            <h2>Comments</h2>
            {props.comments.map((comment, index) => {
                return index < 10 && <p>index: {index} {comment.data.body}</p>
            })}
        </div>
    )
}

export default Comment;

/*

            */