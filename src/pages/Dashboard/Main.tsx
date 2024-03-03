import React from 'react'
import PageTitle from './PageTitle'
import Panel from './Panel'
import './main.css'

function Main() {
  return (
    <main id='main' className='main'>
      <PageTitle page="Dashboard"/>
      <Panel />

    </main>
  )
}

export default Main