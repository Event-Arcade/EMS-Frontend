import PageTitle from './PageTitle'
import Panel from './Panel'
import './main.css'
import DashboardBanner from './DashboardBanner'

interface MainProps {
  isSidebarVisible: boolean;
}

function Main({isSidebarVisible} : MainProps) {
  
  return (
    <main id='main' className={`main ${isSidebarVisible ? '' : 'main-centered'}`}>
      <PageTitle page="Dashboard"/>
      <DashboardBanner/>
      <Panel />
    </main>
  )
}

export default Main