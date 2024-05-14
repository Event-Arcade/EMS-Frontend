import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import './vendorServices.css'; // Import your custom CSS

const EditableImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const [imageSrc, setImageSrc] = useState(imageUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="editable-image">
            <img
                src={imageSrc}
                alt="User"
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />

            <div className="icon-container">
                <Button
                    variant="outline-primary"
                    onClick={handleIconClick}
                    className="icon-button"
                >
                    <i className="bi bi-pencil-square"></i>
                </Button>
            </div>
        </div>
    );
};

export default EditableImage;
