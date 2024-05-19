import React from 'react'
import './dashboardBanner.css'
import { useNavigate } from "react-router-dom";
import bannerImg4 from '../../components/Banner/bannerImg4.png'

function DashboardBanner() {
  const navigate = useNavigate();
  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate("/startpage");
  };

  return (
    <div className='dbanner-body'>
      <div className="dbanner-left">
        <div className="dbanner-text">
          <h1 className='banner-text-heading'>Create Your Own Plan</h1>
          <p className='banner-text-paragraph'>Create memories that last a lifetime.Unveil the magic of unforgettable moments with Event Arcade.  From intimate gatherings to grand celebrations, we turn your dreams into reality. Your journey to extraordinary events starts here.</p>
          {/* <hr style={{paddingBottom:"20px"}}/> */}

          <button className="custom-dbanner-button" onClick={handleStart}>Create New Plan</button>
          
        </div>
      </div>
      <div className="dbanner-right">
        <img style={{width:'100%',height:'80%' ,marginTop:90,marginLeft:40}} src={bannerImg4} alt="dbanner" />
      </div>
    </div>
  )
}

export default DashboardBanner