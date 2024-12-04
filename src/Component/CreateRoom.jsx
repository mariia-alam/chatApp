// flex
import { useNavigate } from 'react-router-dom';
import pic from '../assets/pic1.jpg';
import {useState } from 'react';
import Error from './Error';
import Success from '../Component/Success'
import { RoomsContext } from '../ContextStore/RoomsContext';
import { useContext } from 'react';
export default function CreateRoom({ name, date, roomId }) {
    const {setUserRole} = useContext(RoomsContext);
        const [success, setSuccess] = useState("");

    const [error,setError] = useState("")
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate()
    const datee = new Date(date);
    const day = datee.getDate();
    const month = datee.toLocaleString('en-US', { month: 'short' });
    const year = datee.getFullYear();

    async function handleJoin(event) {
            event.stopPropagation();

        setError("");
        try {
            const response = await fetch('http://localhost:3000/join-room', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({
                    roomid: roomId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error joining room:", errorData.message);
                setError(errorData.message);
            }else{

            const data = await response.json();
            console.log("Joined room:", data);

            // navigate(`/room/${roomId}`);
            setSuccess(data.message)
            setTimeout(() => {
                    handleGetRoom();
                    }, 1500);
            }

        } catch (error) {
            console.error("Error:", error);
            setError(error);
        }
    }
    
     async function handleGetRoom() {
        setError("");
        try {
            const response = await fetch(`http://localhost:3000/room/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error get room:", errorData.errMsg);
                setError(errorData.errMsg);
                return;
            }else{

            const data = await response.json();
            console.log("get room:", data);
            setUserRole(data.userRole)
            navigate(`/room/${roomId}`);
            }

        } catch (error) {
            console.error("Error:", error.errMsg);
            setError(error.errMsg);
        }
    }


    return (
    <div onClick={handleGetRoom}  className="room">
        <span id="name">{name}</span>
        <img src={pic} alt="Profile" />
        <span className="date">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
            <span className="year">{year}</span>
        </span>
        <button onClick={handleJoin} >Join</button>
        {error && <Error message={error}/>}
        {success && <Success message={success}/>}

    </div>
);
}