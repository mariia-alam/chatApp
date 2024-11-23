import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function SignUp(){
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }


     async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const userInfo = Object.fromEntries(data.entries());
                if (!validatePassword(userInfo.password)) {
            setPasswordError(
                "Password must be at least 8 characters long, contain uppercase, lowercase, numbers, and symbols."
            );
            return;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        setPasswordError("");
        console.log(userInfo);

        try{
            const response = await fetch("http://localhost:3000/signup",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    username: userInfo.name,
                    password: userInfo.password,
                    repassword: userInfo.confirmPassword
                }),
            });
                if (response.ok) {
                const responseData = await response.json();
                console.log("User created successfully:", responseData);

                } else {
                const errorData = await response.json();
                setError(errorData.errMsg || "Internal server error");
                }
        } catch (err) {
            console.error("Error during signup:", err);
            setError("Internal server error");
        }
}
    return(
        <div className="signup common">
                <p className="left"></p>
                <p className="right"></p>
                <p className="bottom"></p>
            <h2>SignUp</h2>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                required />
                <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                required />
                <div className="password">

<input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required />
                <span className="signuppassword" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
                </div>
                
                <input
                id="confirmPassword"
                name="confirmPassword"
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                required/>

                {passwordError && (
                    <p style={{ color: "red" ,fontSize: "12px" }}>{passwordError}</p>
                )}

                {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
                <button>SignUp</button>
            </form>
        </div>
    );
}