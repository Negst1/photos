import axios from "axios";


// Получение списка фотографий
export const getPhotos = async () => {
    const response = await axios.get("http://test-backend.itdelta.agency/api/images");
    return response.data;
};

// Получение информации об изображении и комментария
export const getImageDetails = async (imageId) => {
    const response = await axios.get(`http://test-backend.itdelta.agency/api/image/${imageId}`);
    return response.data;
};

// Добавление комментария
export const addComment = async (imageId, newComment) => {
    try {
        // Формируем данные для отправки в нужном формате
        const commentData = { comment: newComment };

        const response = await axios.post(
            `http://test-backend.itdelta.agency/api/image/${imageId}/comments`,
            commentData
        );

        
        console.log('Response from server:', response.data);
        
        return response.data; 
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error; 
    }
};
