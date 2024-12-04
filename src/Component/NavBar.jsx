import logo from '../assets/logo11.png'
import profile from '../assets/profile.png'
import Error from './Error';
import mobileDropDown from '../assets/bars-solid.svg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar(){
        const [error , setError] = useState("");
        const navigate = useNavigate();
        const token = localStorage.getItem("authToken");
        const [dropdownVisible, setDropdownVisible] = useState(false); // حالة القائمة المنسدلة

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

    function handleOpenDropDown(){
        setDropdownVisible(!dropdownVisible);
    }


    return(
        <div className='nav-bar'>
            <img id='nav-logo' src={logo} alt="" />
            <img onClick={handleOpenDropDown} id='mobileDropDown' src={mobileDropDown} alt="" />
                {dropdownVisible && (
                        <div className="mobile-drop-down">
                                        <li onClick={handleRoomsClick}>Rooms</li>
                                        <li onClick={handleProfileClick} id='middle'>Profile</li>
                                        <li>My Room</li>
                        </div>)
                }
            <a onClick={handleRoomsClick}>Rooms</a>
            <a onClick={handleProfileClick}>Profile</a>
            <a href="">My Room</a>
            <img  id='nav-profile' src={profile} alt="" />
            {error && <Error message={error}/>}
        </div>
    );
}