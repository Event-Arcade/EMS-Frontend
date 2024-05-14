import React, { useState } from "react";
import "./vendorServices.css";

const AboutSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutContent, setAboutContent] = useState(
    "Insert your about content here"
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    console.log("About content saved:", aboutContent);
  };

  return (
    <div className="about-section">
      <h2 className="about-heading">About Us</h2>
      {isEditing ? (
        <textarea
          className="edit-textarea"
          value={aboutContent}
          onChange={(e) => setAboutContent(e.target.value)}
        />
      ) : (
        <p className="about-text">{aboutContent}</p>
      )}
      {isEditing ? (
        <button className="save-btn" onClick={handleSaveClick}>
          Save
        </button>
      ) : (
        <button className="edit-btn" onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default AboutSection;
