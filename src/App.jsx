import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from "./Pages/SignUp";
import GetStarted from './Pages/GetStarted';
import Landing from './Pages/Landing';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/get-started" element={<GetStarted/>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/" element={<Landing></Landing>}></Route>
    </Routes>
    </Router>
  )
}

export default App
