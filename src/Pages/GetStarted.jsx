import { useNavigate } from 'react-router-dom';
export default function GetStarted(){
    const navigate = useNavigate();
    return (
        <div className='home'>
            <h1>Welcome!</h1>
            <p>Have an accout ?</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <p>Don&apos;t have an account ? Let&apos;s Create a new one.</p>
            <button onClick={() => navigate('/signup')}>SignUp</button>
        </div>
    );
}