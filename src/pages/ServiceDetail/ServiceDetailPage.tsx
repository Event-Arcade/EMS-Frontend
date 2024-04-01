import React from 'react'
import './serviceDetailPage.css'
import Header from '../Dashboard/Header'
import { red } from '@mui/material/colors'

function ServiceDetailPage() {
  return (
    <>
    <Header/>
    <div className="row">
      <div className="col-lg-9" style={{height:100,background:"red"}}></div>
    </div>
    </>
  )
}

export default ServiceDetailPage