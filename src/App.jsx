import './App.css'
import './UserPages/userPages.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from "./Pages/SignUp";
import GetStarted from './Pages/GetStarted';
import Landing from './Pages/Landing';
import Rooms from './UserPages/Rooms';
import Profile from './UserPages/Profile';
import Room from './UserPages/Room';
import  RoomsProvider  from './ContextStore/RoomsContext';


function App() {
  return (
    <RoomsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/get-started" element={<GetStarted/>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/rooms" element={<Rooms></Rooms>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/room/:roomId" element={<Room ></Room>}></Route>
        </Routes>
      </Router>
    </RoomsProvider>

  )
}

export default App
