import { Routes ,Route } from 'react-router-dom'
import WelcomePage from './pages/Home/home'
import FormDisplay from './pages/Transaction/FormDisplay'
import TransactionDetailsPage from './pages/Download/Download'
import DownloadPage from './components/Table/DownP'
import  AddRecipientForm from './pages/testss/page'
import './App.css'
import LoginForm from './pages/Authentification/page'



const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginForm/>}></Route>
      <Route path='home' element={<WelcomePage/>}></Route>
      <Route path='form-display' element={<FormDisplay/>}></Route>
      <Route path='generate' element={<TransactionDetailsPage/>}></Route>
     <Route path='test' element={<AddRecipientForm />} />
      <Route path='download/:index' element={<DownloadPage/>}></Route>
    </Routes> 
    </>

  )
}

export default App
