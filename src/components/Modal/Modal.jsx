import React, { useState, useEffect } from "react";
import { getImageDetails, addComment } from "../../helpers/api";
import CommentForm from "../CommentForm/CommentForm";
import "./style.css";

const Modal = ({ imageId, onClose, userName }) => {
    const [image, setImage] = useState(null);
    const [comments, setComments] = useState([]);

    // Загрузка данных изображения и комментариев
    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const data = await getImageDetails(imageId);
                console.log("Fetched Image Data:", data); // Логируем, что приходит с сервера
                setImage(data.largeImage); // Используем largeImage для модального окна
                setComments(data.comments); // Комментарии
            } catch (error) {
                console.error("Error fetching image details:", error);
            }
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
                { author: userName, text: newCommentText }, // Добавляем новый комментарий с именем пользователя
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
                {image && (
                    <img 
                        src={image} 
                        alt="Большое изображение" 
                        className="modal-image" 
                    />
                )}
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
