import PageTitle from './PageTitle'
import Panel from './Panel'
import './main.css'
import DashboardBanner from './DashboardBanner'

function Main() {
  return (
    <main id='main' className='main'>
      <PageTitle page="Dashboard"/>
      <DashboardBanner/>
      <Panel />

    </main>
  )
}

export default Main