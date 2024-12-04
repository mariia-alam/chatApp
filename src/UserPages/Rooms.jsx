import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Error from "../Component/Error";
import search from '../assets/search.png'
import { useState } from 'react';
import CreateRoom from "../Component/CreateRoom";
import { useNavigate } from "react-router-dom";
import { RoomsContext } from "../ContextStore/RoomsContext";
import { useContext } from "react";
import NavBar from "../Component/NavBar";
import Success from '../Component/Success'

export default function Rooms(){
    const { rooms , setRooms } = useContext(RoomsContext);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    async function handleCreate(){
    setError("");
        const result= await Swal.fire({
        title: 'Do you want to create a room?',
        //= icon: 'question', //success, error, warning, info, question
        confirmButtonText: 'Create',
        confirmButtonColor: '#9759C7',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#d33',
        width: '400px',
        customClass: {
            title:'title',
            popup: 'question-popup',
        },
        position: 'center',
    });
    if (result.isConfirmed) {
        Swal.close();
        try{
            const response = await fetch("http://localhost:3000/create-room",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
            });
                if (response.ok) {
                const responseData = await response.json();
                console.log("room created successfully:", responseData);
                setSuccess(responseData.message)
                await handleFetchRooms();
                setTimeout(async() => {
                        await handleFetchRooms();
                    }, 1500);
                } else {
                const errorData = await response.json();
                setError(errorData.errMsg || "Internal server error");
                Swal.close();
                }
        }catch(err){
            console.error("Error during create a room:", err);
            setError("Internal server error");
        }
    } else if (result.isDismissed) {
        console.log('User clicked Cancel');
        Swal.close();
    }
}


    async function handleFetchRooms(){
        try {
            const response = await fetch("http://localhost:3000/rooms", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                setRooms(responseData.rooms);
                console.log(responseData.rooms)
            } else {
                const errorData = await response.json();
                setError(errorData.errMsg || "Internal server error");
            }
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setError("Internal server error");
        }
    }

    useEffect(() => {
        console.log("hihi")
    handleFetchRooms();
}, []);


useEffect(() => {
    setError("");
    const currentTime = Date.now() / 1000;
    if (token) {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.exp < currentTime) {
            setError("Please log in again to continue")
            navigate("/login");
            localStorage.removeItem("authToken");
        }
    }else{
        setError("Please log in again to continue")
        navigate('/login')
    }
}, [token, navigate]);

    return(
        <div className="rooms">
            <NavBar></NavBar>
            <nav className="nav">
                    <p>Available Rooms</p>
                <div className="nav-right">
                    <button onClick={handleCreate}>Create Room</button>
                    <img id="search" src={search} alt="" />
                </div>
            </nav>
            <main>
                <div className="scrollable-content">
                {rooms.length === 0 && <p id='note'>No rooms created</p>}
                {rooms.map((room) => (<CreateRoom name={room.host.username} date={room.updatedAt} roomId={room.id} key={room.id}></CreateRoom>
                ))}
                </div>
            </main>
            {error && <Error message={error}/>}
                    {success && <Success message={success}/>}
        </div>
    );
}
