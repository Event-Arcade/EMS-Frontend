import React, { useState } from 'react';
import './gallerySection.css';
import { PlusCircle } from 'react-bootstrap-icons';

interface Photo {
  id: number;
  name: string;
  url: string;
}

interface Video {
  id: number;
  name: string;
  url: string;
}

function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newPhotoName, setNewPhotoName] = useState('');
  const [newVideoName, setNewVideoName] = useState('');
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);

  const handleAddPhoto = () => setShowPhotoForm(true);
  const handleAddVideo = () => setShowVideoForm(true);

  const handlePhotoSubmit = () => {
    if (newPhotoFile && newPhotoName) {
      const newPhoto: Photo = {
        id: photos.length + 1,
        name: newPhotoName,
        url: URL.createObjectURL(newPhotoFile),
      };
      setPhotos([...photos, newPhoto]);
    }
    setShowPhotoForm(false);
    setNewPhotoName('');
    setNewPhotoFile(null);
  };

  const handleVideoSubmit = () => {
    if (newVideoFile && newVideoName) {
      const newVideo: Video = {
        id: videos.length + 1,
        name: newVideoName,
        url: URL.createObjectURL(newVideoFile),
      };
      setVideos([...videos, newVideo]);
    }
    setShowVideoForm(false);
    setNewVideoName('');
    setNewVideoFile(null);
  };

  return (
    <div className="gallery-section">
      <h2>My Gallery</h2>
      <hr/>
      
      {/* Photo Section */}
      <div className="photo-section" style={{marginTop:"60px"}}>
        <h3>Photo Collection</h3>
        <div className="media-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="media-box">
              <img src={photo.url} alt={photo.name} />
              <p>{photo.name}</p>
            </div>
          ))}
          {/* Add photo button */}
          <div className="media-box add-media-box" onClick={handleAddPhoto}>
            <PlusCircle size={48} className="plus-icon" />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <h3>Video Collection</h3>
        <div className="media-grid">
          {videos.map((video) => (
            <div key={video.id} className="media-box">
              <video src={video.url} controls />
              <p>{video.name}</p>
            </div>
          ))}
          {/* Add video button */}
          <div className="media-box add-media-box" onClick={handleAddVideo}>
            <PlusCircle size={48} className="plus-icon" />
          </div>
        </div>
      </div>

      {/* Photo Form */}
      {showPhotoForm && (
        <div className="form-popup">
          <div className="form-content">
            <h3>Add New Photo</h3>
            <label>
              Photo Name:
              <input
                type="text"
                value={newPhotoName}
                onChange={(e) => setNewPhotoName(e.target.value)}
              />
            </label>
            <label>
              Upload Photo:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhotoFile(e.target.files ? e.target.files[0] : null)}
              />
            </label>
            <div className="form-buttons">
              <button onClick={handlePhotoSubmit}>Submit</button>
              <button onClick={() => setShowPhotoForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Form */}
      {showVideoForm && (
        <div className="form-popup">
          <div className="form-content">
            <h3>Add New Video</h3>
            <label>
              Video Name:
              <input
                type="text"
                value={newVideoName}
                onChange={(e) => setNewVideoName(e.target.value)}
              />
            </label>
            <label>
              Upload Video:
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setNewVideoFile(e.target.files ? e.target.files[0] : null)}
              />
            </label>
            <div className="form-buttons">
              <button onClick={handleVideoSubmit}>Submit</button>
              <button onClick={() => setShowVideoForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GallerySection;
