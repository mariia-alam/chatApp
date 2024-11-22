import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login(){
    const [passwordVisible , setPasswordVisible] = useState(false);
    function togglePasswordVisibility(){
        setPasswordVisible(!passwordVisible);
    }
    function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const userInfo = Object.fromEntries(data.entries());
        console.log(userInfo);
    }
    return(
        <div className="common">
                <p className="left"></p>
                <p className="right"></p>
                <p className="bottom"></p>
            <h2>Login</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="email"
                name="name"
                placeholder="Enter Your Email"
                required />
                <input type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required />
                <span className="loginpassword" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash></FaEyeSlash> : <FaEye/>}
                </span>
                <button>Login</button>
            </form>
        </div>
    );
}