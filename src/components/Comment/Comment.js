import React from 'react';
import ReactMarkdown from 'react-markdown';

const Comment = (props) => {
    return (
        <div>
            <h2 className='comment-heading'>Top 10 Comments</h2>
            {props.comments.map((comment, index) => {
                return index < 10 && (
                    <div className='comment' key={comment.data.id}>
                      <ReactMarkdown>{comment.data.body}</ReactMarkdown>
                    </div>
                  );
            })}
        </div>
    )
}


export default Comment;