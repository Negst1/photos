import React, { useState, useEffect } from "react";
import { getImageDetails, addComment } from "../../helpers/api";
import CommentForm from "../CommentForm/CommentForm";
import "./style.css";

const Modal = ({ imageId, onClose }) => {
    const [image, setImage] = useState(null);
    const [comments, setComments] = useState([]);

    // Загрузка данных изображения и комментариев
    useEffect(() => {
        const fetchImageDetails = async () => {
            const data = await getImageDetails(imageId);
            setImage(data.imageUrl);
            setComments(data.comments);
            console.log(data.comments);
        };

        if (imageId) {
            fetchImageDetails();
        }
    }, [imageId]);

    // Добавление комментария
    const handleAddComment = async (newCommentText) => {
        try {
            
            await addComment(imageId, newCommentText);

            
            setComments((prev) => [
                ...prev,
                { author: "Михаил", text: newCommentText },
            ]);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>
                    &times;
                </span>
                {image && <img src={image} alt="Большое изображение" className="modal-image" />}
                <div className="comments-section">
                    <h3>Комментарии</h3>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>
                                <strong>{comment.author}:</strong> {comment.text}
                            </li>
                        ))}
                    </ul>
                    <CommentForm onSubmit={handleAddComment} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
