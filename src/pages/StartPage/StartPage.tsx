import Header from '../../components/header/Header'
import SideBar from '../../components/sideBar/SideBar'
import MainContainer from './MainContainer'
import Footer from '../../components/Footer/Footer'

function StartPage() {
  return (
    <>
    <Header toggleSideBar={function (): void {
        throw new Error('Function not implemented.')
      } } />
    <SideBar isVisible={false}/>
    <MainContainer/>
    <Footer/>
    </>
  )
}

export default StartPage