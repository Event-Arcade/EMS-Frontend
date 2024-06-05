import SideBar from '../../components/sideBar/SideBar'
import MainContainer from './MainContainer'
import Footer from '../../components/Footer/Footer'

function StartPage() {
  return (
    <>
    <SideBar isVisible={false}/>
    <MainContainer/>
    </>
  )
}

export default StartPage