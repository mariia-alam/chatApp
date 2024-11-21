import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from "./Pages/SignUp";
import GetStarted from './Pages/GetStarted';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<GetStarted/>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
    </Routes>
    </Router>
  )
}

export default App
