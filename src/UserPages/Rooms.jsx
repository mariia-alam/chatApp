import { useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Error from "../Component/Error";
import logo from '../assets/logo11.png';
import profile from '../assets/profile.png';
import search from '../assets/search.png'
import { useState } from 'react';
import CreateRoom from "../Component/CreateRoom";
import { useNavigate } from "react-router-dom";
import { RoomsContext } from "../ContextStore/RoomsContext";
import { useContext } from "react";
import NavBar from "../Component/NavBar";

export default function Rooms(){
  const { rooms , setRooms } = useContext(RoomsContext); // استخدام useContext للوصول إلى بيانات الغرف

    const [error, setError] = useState("");
    // const [rooms, setRooms] = useState([]);
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
                await handleFetchRooms();

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
            {/* <header className="header">
            <img id="logo" src={logo} alt="" />
            <img id="profile" src={profile} alt="" />
            </header> */}

            <nav className="nav">
                {/* <div className="nav-left"> */}
                    <p>Available Rooms</p>
                {/* </div> */}
                <div className="nav-right">
                    <button onClick={handleCreate}>Create Room</button>
                    <img id="search" src={search} alt="" />
                    {/* <svg width="80" height="82" viewBox="0 0 80 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.9 62.525C30.9357 62.525 26.0829 61.0162 21.9552 58.1892C17.8275 55.3623 14.6104 51.3439 12.7106 46.643C10.8109 41.942 10.3138 36.7688 11.2823 31.7783C12.2508 26.7876 14.6413 22.2034 18.1516 18.6054C21.6619 15.0073 26.1343 12.557 31.0032 11.5643C35.872 10.5716 40.919 11.0811 45.5054 13.0284C50.0917 14.9756 54.012 18.2732 56.77 22.504C59.528 26.7349 61 31.709 61 36.7975C61 40.1759 60.3507 43.5215 59.0894 46.643C57.828 49.7644 55.979 52.6006 53.6484 54.9895C51.3177 57.3785 48.5507 59.2737 45.5054 60.5666C42.46 61.8594 39.196 62.525 35.9 62.525ZM35.9 16.2291C31.9444 16.2291 28.0776 17.4314 24.7886 19.684C21.4996 21.9366 18.9362 25.1382 17.4224 28.8841C15.9087 32.63 15.5126 36.7517 16.2843 40.7284C17.056 44.705 18.9608 48.3578 21.7579 51.2247C24.5549 54.0916 28.1186 56.0443 31.9982 56.8352C35.8777 57.6262 39.899 57.2203 43.5537 55.6688C47.208 54.1169 50.3317 51.4895 52.5294 48.1183C54.727 44.747 55.9 40.7837 55.9 36.7292C55.9 31.2922 53.793 26.0779 50.042 22.2334C46.2914 18.3889 41.2044 16.2291 35.9 16.2291Z" fill="white"/>
                    <path d="M66.6667 70.8959C66.3383 70.8972 66.0127 70.8316 65.7093 70.7025C65.406 70.5737 65.1307 70.3837 64.9 70.1442L51.1333 56.0334C50.6917 55.5475 50.4513 54.9048 50.4627 54.241C50.474 53.5771 50.7367 52.944 51.1947 52.4742C51.6527 52.0048 52.2707 51.7359 52.9183 51.7243C53.566 51.7127 54.1927 51.959 54.6667 52.4117L68.4333 66.5225C68.9013 67.0029 69.1643 67.6541 69.1643 68.3334C69.1643 69.0123 68.9013 69.6635 68.4333 70.1442C68.2027 70.3837 67.9273 70.5737 67.624 70.7025C67.3207 70.8316 66.995 70.8972 66.6667 70.8959Z" fill="white"/>
                    <path d="M35.8334 47.8333C35.173 47.8245 34.542 47.5518 34.075 47.0731C33.608 46.5945 33.342 45.9477 33.3334 45.2708V28.1875C33.3334 27.5079 33.5967 26.8561 34.0657 26.3755C34.5344 25.895 35.1704 25.625 35.8334 25.625C36.4964 25.625 37.1324 25.895 37.601 26.3755C38.07 26.8561 38.3334 27.5079 38.3334 28.1875V45.2708C38.3247 45.9477 38.0587 46.5945 37.5917 47.0731C37.1247 47.5518 36.4937 47.8245 35.8334 47.8333Z" fill="white"/>
                    <path d="M44.1667 39.2916H27.5C26.837 39.2916 26.2011 39.0217 25.7
                    322 38.541C25.2634 38.0606 25 37.4087 25 36.7291C25 36.0496 25.2634 35.3977 25.7322 34.9173C26.2011 34.4365 26.837 34.1666 27.5 34.1666H44.1667C44.8297 34.1666 45.4657 34.4365 45.9343 34.9173C46.4033 35.3977 46.6667 36.0496 46.6667 36.7291C46.6667 37.4087 46.4033 38.0606 45.9343 38.541C45.4657 39.0217 44.8297 39.2916 44.1667 39.2916Z" fill="white"/>
                    </svg> */}
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
        </div>
    );
}
