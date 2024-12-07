// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import Error from '../Component/Error';
import NavBar from '../Component/NavBar';

export default function Landing() {
    const [error , setError] = useState("")
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();


    useEffect(() => {
        setError("");
    }, [error]);


    function handleGetStartedClick() {
        if (!token) {
            navigate('/get-started');
        } else {
            navigate('/rooms');
        }
    }

    return (<>
        <div className="landing">
                <NavBar></NavBar>
            {/* <header>
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
            </header> */}
            <main>
                <p>Connect, Chat, and<br/>Discover:<br/>Your New Friends<br/>Await</p>
                <button onClick={handleGetStartedClick} className='get-started'>Get Started</button>
            </main>
                        {error && <Error message={error}/>}
        </div>
        </>
    );
}
