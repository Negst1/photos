import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
    const [commentText, setCommentText] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            onSubmit(commentText);
            setCommentText(""); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
            />
            <button type="submit">Добавить комментарий</button>
        </form>
    );
};

export default CommentForm;
