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

export default function Rooms(){
    const [error, setError] = useState("");
    const [rooms, setRooms] = useState([]);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

async function handleCreate(){
      setError("");
const result= await Swal.fire({
    title: 'Do you want to create a room?',
    // icon: 'question', //success, error, warning, info, question
    confirmButtonText: 'Create',
    confirmButtonColor: '#9759C7',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#d33',
    width: '400px',
    customClass: {
        popup: 'custom-alert-position',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
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

    const handleFetchRooms = useCallback(async()=>{
        try{
            const response = await fetch("http://localhost:3000/rooms",{
                method: "GET",
                headers: {
                "Authorization": `Bearer ${token}`,
                },
            });
                if (response.ok) {
                const responseData = await response.json();
                console.log("rooms", responseData.rooms);
                setRooms(responseData.rooms);
                } else {
                const errorData = await response.json();
                setError(errorData.errMsg || "Internal server error");
                }
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setError("Internal server error");
        }
    },[token])

    useEffect(() => {
    handleFetchRooms();
}, [handleFetchRooms]);


useEffect(() => {
    setError("");  // إعادة تعيين الخطأ عند تحميل الصفحة
    const currentTime = Date.now() / 1000; // الوقت الحالي بالثواني
    if (token) {
        const tokenData = JSON.parse(atob(token.split('.')[1])); // فك التوكن واستخراج البيانات
        if (tokenData.exp < currentTime) { // تحقق من انتهاء صلاحية التوكن
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
            <header className="header">
            <img id="logo" src={logo} alt="" />
            <img id="profile" src={profile} alt="" />
            {/* <svg width="62" height="60" viewBox="0 0 62 60" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M43.6577 18C43.6577 11.382 37.9807 5.99996 31 5.99996C24.0193 5.99996 18.3423 11.382 18.3423 18C18.3423 24.618 24.0193 30 31 30C37.9807 30 43.6577 24.618 43.6577 18ZM55.6319 60H49.9865C48.2398 60 46.8221 58.656 46.8221 57C46.8221 55.344 48.2398 54 49.9865 54H51.344C53.5338 54 55.1509 51.909 54.3218 49.986C50.4897 41.0939 41.49 36 31 36C20.51 36 11.5103 41.0939 7.67823 49.986C6.84915 51.909 8.46622 54 10.656 54H12.0135C13.7602 54 15.1779 55.344 15.1779 57C15.1779 58.656 13.7602 60 12.0135 60H6.36814C2.41262 60 -0.701163 56.571 0.137407 52.908C2.4411 42.8309 9.63387 35.3939 19.1081 32.0189C14.7855 28.7219 12.0135 23.67 12.0135 18C12.0135 7.34696 21.7726 -1.14307 33.2752 0.125931C41.6103 1.04393 48.515 7.3408 49.765 15.2098C50.8409 21.9928 47.9138 28.1879 42.8919 32.0189C52.3661 35.3939 59.5589 42.8309 61.8626 52.908C62.7012 56.571 59.5874 60 55.6319 60ZM40.8761 46.392C42.1134 47.565 42.1134 49.4641 40.8761 50.6371L31 60L24.2883 53.6371C23.051 52.4641 23.051 50.565 24.2883 49.392C25.5224 48.222 27.5255 48.222 28.7628 49.392L31 51.516L36.4016 46.392C37.6389 45.222 39.642 45.222 40.8761 46.392Z" fill="white"/>
            </svg> */}
            </header>

            <nav className="nav">
                <div className="nav-left">
                    <p>Rooms</p>
                </div>
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
                {rooms.length === 0 && <p id='note'>No rooms created</p>}
                {rooms.map((room) => (<CreateRoom name={room.host.username} date={room.updatedAt} key={room.id}></CreateRoom>
                ))}
                {rooms.map((room) => (<CreateRoom name={room.host.username} date={room.updatedAt} key={room.id}></CreateRoom>
                ))}

            </main>
            {error && <Error message={error}/>}

        </div>
    );
}
