import './App.css'
import './UserPages/userPages.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from "./Pages/SignUp";
import GetStarted from './Pages/GetStarted';
import Landing from './Pages/Landing';
import Rooms from './UserPages/Rooms';
import Profile from './UserPages/Profile';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing></Landing>}></Route>
      <Route path="/get-started" element={<GetStarted/>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/rooms" element={<Rooms></Rooms>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
    </Routes>
    </Router>
  )
}

export default App
