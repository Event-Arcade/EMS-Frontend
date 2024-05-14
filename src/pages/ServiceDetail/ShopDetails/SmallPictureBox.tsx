import React from 'react'
import './smallPictureBox.css'
import SlidingPic3 from '../../../assets/SlidingPic3.jpg'
import SlidingPic2 from '../../../assets/SlidingPic2.jpg'
import SlidingPic1 from '../../../assets/SlidingPic1.jpg'

function SmallPictureBox() {
  return (
    <div className='pictureBox'>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={SlidingPic2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={SlidingPic1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={SlidingPic3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default SmallPictureBox