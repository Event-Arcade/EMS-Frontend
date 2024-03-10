import React from 'react'
import Header from './Dashboard/Header'
import SideBar from './Dashboard/SideBar'
import MainContainer from './StartPage/MainContainer'
import Footer from './Dashboard/Footer'

function StartPage() {
  return (
    <>
    <Header />
    <SideBar/>
    <MainContainer/>
    <Footer/>
    </>
  )
}

export default StartPage