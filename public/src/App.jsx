import { Routes ,Route } from 'react-router-dom'
import WelcomePage from './pages/Home/home'
import Wallets from './pages/Wallets/wallets'
import Support from './pages/Support/support'
import FormDisplay from './pages/Transaction/FormDisplay'
import TransactionDetailsPage from './pages/Download/Download'
import DownloadPage from './components/Table/DownP'
import './App.css'
import LoginForm from './pages/Authentification/page'



const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<LoginForm/>}></Route>
      <Route path='home' element={<WelcomePage/>}></Route>
      <Route path='form-display' element={<FormDisplay/>}></Route>
      <Route path='generate' element={<TransactionDetailsPage/>}></Route>
    { /* <Route path='download/:index' element={<TransactionDetailsPage />} />*/}
      <Route path='wallets' element={<Wallets/>}></Route>
      <Route path='download/:index' element={<DownloadPage/>}></Route>
      <Route path='support' element={<Support/>}></Route>
    </Routes>
  )
}

export default App
