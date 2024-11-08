import React, { useState, useEffect } from "react";
import { getPhotos } from "./../../helpers/api";
import Modal from "./../Modal/Modal";
import "./style.css";

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            const data = await getPhotos();
            setPhotos(data);
        };

        fetchPhotos();
    }, []);

    const openModal = (id) => {
        setSelectedImageId(id);
    };

    const closeModal = () => {
        setSelectedImageId(null);
    };

    return (
        <main className="main-area">
            <div className="container">
                <div className="photo-gallery">
                    {photos.map((photo) => (
                        <div key={photo.id} className="photo-item" onClick={() => openModal(photo.id)}>
                            <img className="photo-image" src={photo.image} alt={photo.title} />
                            <div className="photo-id">ID: {photo.id}</div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedImageId && <Modal imageId={selectedImageId} onClose={closeModal} />}
        </main>
    );
};

export default PhotoGallery;
