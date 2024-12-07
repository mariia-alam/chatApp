import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login(){
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [passwordVisible , setPasswordVisible] = useState(false);
    function togglePasswordVisibility(){
        setPasswordVisible(!passwordVisible);
    }
    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const userInfo = Object.fromEntries(data.entries());
        console.log(userInfo);

 try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userInfo.email,
                password: userInfo.password,
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Login successful:", responseData);

            //LocalStorage
            localStorage.setItem("authToken", responseData.token);
            navigate("/rooms");


        } else {
            const errorData = await response.json();
            setError(errorData.errMsg || "Internal server error");
        }
    } catch (err) {
        console.error("Error during login:", err);
        setError("Internal server error");
    }

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
                name="email"
                placeholder="Enter Your Email"
                required />
                <div className="password">
                <input type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                required />
                <span className="loginpassword" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash></FaEyeSlash> : <FaEye/>}
                </span>
                </div>
                {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
                <button>Login</button>
            </form>
        </div>
    );
}