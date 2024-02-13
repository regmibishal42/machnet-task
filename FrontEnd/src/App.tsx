import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NotFoundPage from './components/NotFound';
import Transactions from './pages/Transactions';


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
