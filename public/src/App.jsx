import { Routes ,Route } from 'react-router-dom'
import WelcomePage from './pages/Home/home'
import Wallets from './pages/Wallets/wallets'
import Support from './pages/Support/support'
import AuthenticationPage from './pages/Authentification/Authentication'
import FormDisplay from './pages/Transaction/FormDisplay'
import TransactionDetailsPage from './pages/Download/Download'
import './App.css'


const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<AuthenticationPage/>}></Route>
      <Route path='home' element={<WelcomePage/>}></Route>
      <Route path='form-display' element={<FormDisplay/>}></Route>
      <Route path='generate' element={<TransactionDetailsPage/>}></Route>
      <Route path='wallets' element={<Wallets/>}></Route>
      <Route path='support' element={<Support/>}></Route>
    </Routes>
  )
}

export default App
