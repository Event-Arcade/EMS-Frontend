import { useState } from "react";
import videoPic1 from "../../assets/videoPic/videoPic1.png";
import videoPic2 from "../../assets/videoPic/videoPic2.png";
import videoPic3 from "../../assets/videoPic/videoPic3.png";
import videoPic4 from "../../assets/videoPic/videoPic4.png";
import videoPic5 from "../../assets/videoPic/videoPic5.png";
import video1 from "../../assets/videos/video1.mp4";
import video2 from "../../assets/videos/video2.mp4";
import video3 from "../../assets/videos/video3.mp4";
import video4 from "../../assets/videos/video4.mp4";
import video5 from "../../assets/videos/video5.mp4";
import profileImg from "../../assets/img/profileImg.jpg";
import "./VideoGallery.css";

const VideoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 5;
  const data = [
    { id: 1, poster: videoPic1, videoUrl: video1 },
    { id: 2, poster: videoPic2, videoUrl: video2 },
    { id: 3, poster: videoPic3, videoUrl: video3 },
    { id: 4, poster: videoPic4, videoUrl: video4 },
    { id: 5, poster: videoPic5, videoUrl: video5 },
    { id: 6, poster: videoPic5, videoUrl: video5 },

  ];

  const totalPages = Math.ceil(data.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = data.slice(startIndex, startIndex + videosPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="gallery" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
        {currentVideos.map((item, index) => (
          <div className="video" key={index}>
            <div className="video-container">
              <video
                style={{ width: "100%" }}
                controls
                poster={item.poster}
              >
                <source src={item.videoUrl} type="video/mp4" />
              </video>
              <div className="video-description">
                <div className="video-title">
                  <img src={profileImg} alt="" className="video-owner" />
                  <p>HHHHHh</p>
                </div>
                <div className="static-container">
                  <p className="view-count">14k |</p>
                  <p className="time-period">3hr ago</p>
                  <i className="bi bi-hand-thumbs-up-fill" style={{ color: '#e78309', paddingLeft: '40px' }}></i>
                  <i className="bi bi-hand-thumbs-down-fill" style={{ paddingLeft: '10px' }}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default VideoGallery;
