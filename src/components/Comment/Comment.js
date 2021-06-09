import React from 'react';
import ReactMarkdown from 'react-markdown';

//could add button to add more comments
const Comment = (props) => {
    return (
        <div>
            <h2>Top 10 Comments</h2>
            {props.comments.map((comment, index) => {
                return index < 10 && (
                    <div>
                      <ReactMarkdown>{comment.data.body}</ReactMarkdown>
                    </div>
                  );
            })}
        </div>
    )
}

export default Comment;

//                return index < 10 && <ReactMarkdown source={markdown}/>
//                return index < 10 && <p>{comment.data.body}</p>
//# Hello, *world*!