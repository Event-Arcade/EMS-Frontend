import React from 'react'
import './serviceDetailPage.css'
import Header from '../Dashboard/Header'
import { red } from '@mui/material/colors'
import SmallPictureBox from './SmallPictureBox'
import ShopPageHeading from './ShopPageHeading'
import ShopDetailForm from './ShopDetailForm'
import Footer from '../../components/Footer/Footer'
import FeedbackSection from './FeedbackSection'

function ServiceDetailPage() {
  return (
    <>
    <Header/>
    <div className="sd-page">
      {/* <div className="row">
      <div className="col-lg-3" style={{background:"red"}}>
        <SmallPictureBox/>
      </div>
      <div className="col-lg-4" style={{background:"blue"}}></div>
      <div className="col-lg-5" style={{background:"green"}}></div>
      </div> */}
      <ShopPageHeading/>
      <ShopDetailForm/>
      <FeedbackSection/>
      <Footer/>
    </div>
    </>
  )
}

export default ServiceDetailPage