import { Routes ,Route } from 'react-router-dom'
import WelcomePage from './pages/Home/home'
import Wallets from './pages/Wallets/wallets'
import Support from './pages/Support/support'
import AuthenticationPage from './pages/Authentification/Authentication'
import FormDisplay from './pages/Transaction/FormDisplay'
import AddTokenPage from './pages/Transaction/Form3/addToken'
import TransactionDetailsPage from './pages/Download/Download'
import DownloadPage from './components/Table/DownP'
import './App.css'



const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<AuthenticationPage/>}></Route>
      <Route path='home' element={<WelcomePage/>}></Route>
      <Route path='form-display' element={<FormDisplay/>}></Route>
      <Route path="/add-token" element={<AddTokenPage onDone={() => navigate('/form3')} />} />
      <Route path='generate' element={<TransactionDetailsPage/>}></Route>
    { /* <Route path='download/:index' element={<TransactionDetailsPage />} />*/}
      <Route path='wallets' element={<Wallets/>}></Route>
      <Route path='download/:index' element={<DownloadPage/>}></Route>
      <Route path='support' element={<Support/>}></Route>
    </Routes>
  )
}

export default App
