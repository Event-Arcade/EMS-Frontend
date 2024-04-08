import React from 'react'
import './shopPageHeading.css'
import '../../components/TextStyle.css'

function ShopPageHeading() {
  return (
    <div className='sp-heading'>
      <p className="sd-page-headtopic">
        My Service Name
      </p>
      <p className='sd-page-subtopic'>Galle <span>|</span> Sri Lanka<span>|</span> +94 71 256 4875</p>
      
    </div>
  )
}

export default ShopPageHeading