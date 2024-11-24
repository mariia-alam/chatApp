import Swal from 'sweetalert2';
import logo from '../assets/logo11.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Landing() {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        setToken(savedToken);
    }, []);

    function handleRoomsClick(){
        if (!token) {
            Swal.fire({
                    title: 'Please',
                    text: 'Log in first',
                    // icon: 'error', //success, error, warning, info, question
                    confirmButtonText: 'Ok',
                    width: '400px',
                    confirmButtonColor: '#9759C7',
                    });
        }else{
            navigate('/rooms')
        }
    }

    function handleGetStartedClick() {
        if (!token) {
            navigate('/get-started');
        } else {
            navigate('/rooms');
        }
    }

    return (
        <div className="landing">
            <header>
                <div className="header-left">
                    <img src={logo} alt="Logo" />
                    <a onClick={handleRoomsClick}>rooms</a>
                </div>
                <div className="header-right">
                    {token ? (
                        <a onClick={() => navigate('/profile')}>Profile</a>
                    ) : (
                        <a onClick={() => navigate('/login')}>Login</a>
                    )}
                </div>
            </header>
            <main>
                <p>Connect, Chat, and<br/>Discover:<br/>Your New Friends<br/>Await</p>
                <button onClick={handleGetStartedClick} className='get-started'>Get Started</button>
            </main>
        </div>
    );
}
