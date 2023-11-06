import './App.css'
import { Routes ,Route } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Footer from './components/Footer/footer'
import WelcomePage from './pages/Home/home'
import Wallets from './pages/Wallets/wallets'
import Support from './pages/Support/support'
import AuthenticationPage from './pages/Authentification/Authentication'
import FormDisplay from './pages/Transaction/FormDisplay'


const App = () => {
  return (

    <Routes>
      <Route path='auth' element={<AuthenticationPage/>}></Route>
      <Route path='/' element={<WelcomePage/>}></Route>
      <Route path='form-display' element={<FormDisplay/>}></Route>
      <Route path='wallets' element={<Wallets/>}></Route>
      <Route path='support' element={<Support/>}></Route>
    </Routes>
  )
}

export default App
