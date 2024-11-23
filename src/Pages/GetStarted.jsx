import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo11.png'
export default function GetStarted(){
    const navigate = useNavigate();
    return (
        <div className='home'>
            <div className='logo'></div>
            <p>Have an accout ?</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <p>Don&apos;t have an account ? Let&apos;s Create a new one.</p>
            <button onClick={() => navigate('/signup')}>SignUp</button>
        </div>
    );
}