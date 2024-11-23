import logo from '../assets/logo11.png';
import { useNavigate } from 'react-router-dom';
export default function Landing() {
        const navigate = useNavigate();
    return (
        <div className="landing">
            <header>
                <div className="header-left">
                    <img src={logo} alt="Logo" />
                    <a>rooms</a>
                </div>
                <div className="header-right">
                    <a onClick={() => navigate('/login')}>Login</a>
                </div>
            </header>
            <main>
                <p>Connect, Chat, and<br/>Discover:<br/>Your New Friends<br/>Await</p>
                <button onClick={() => navigate('/get-started')} className='get-started'>Get Started</button>
            </main>
        </div>
    );
}
