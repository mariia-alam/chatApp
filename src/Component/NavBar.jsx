import logo from '../assets/logo11.png'
import profile from '../assets/profile.png'
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function NavBar(){
        const [error , setError] = useState("");
        const navigate = useNavigate();
        const token = localStorage.getItem("authToken");


        function handleRoomsClick(){
        setError("");
        if (!token){
            setError("Please log in first")
        }else{
            navigate('/rooms')
        }
    }

        function handleProfileClick(){
        setError("");
        if (!token){
            setError("Please log in first")
        }else{
            navigate('/profile')
        }
    }

        useEffect(() => {
        setError("");
    }, [error]);


    return(
        <div className='nav-bar'>
            <img id='nav-logo' src={logo} alt="" />
            <a onClick={handleRoomsClick}>Rooms</a>
            <a onClick={handleProfileClick}>Profile</a>
            <a href="">My Room</a>
            <img  id='nav-profile' src={profile} alt="" />
            {error && <Error message={error}/>}
        </div>
    );
}