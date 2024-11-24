import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Rooms(){
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in first!");
            navigate("/login");
        }
    }, [navigate]);
    return(
        <div>rooms</div>
    );
}