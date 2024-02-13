import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import NotFoundPage from './components/NotFound';
import Transactions from './pages/Transactions';
import Layout from './pages/Layout';


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Transactions/>} />
          <Route path="/home" element={<Transactions/>} />
          <Route path="/transactions" element={<Transactions/>} />
        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
