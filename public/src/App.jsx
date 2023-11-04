import './App.css'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import AuthenticationPage from './pages/Authentification/Authentication'
const App = () => {
  return (
    <div>
      <Navbar/>
      <AuthenticationPage/>
      <Footer/>
    </div>
  )
}

export default App
