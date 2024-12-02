import  { useState, useEffect,useRef, useContext } from "react";
// import { useLocation } from "react-router-dom";
import pic from '../assets/pic1.jpg'
import send from "../assets/send.png";
import addEmoji from "../assets/add-emoji.png";
import backArrow from "../assets/back-arrow.png";
import roomSetting from "../assets/room-setting.png";
import { useNavigate } from "react-router-dom";
import { RoomsContext } from "../ContextStore/RoomsContext";
import Error from "../Component/Error";
import Success from '../Component/Success';
import NavBar from "../Component/NavBar";
// import { useParams } from "react-router-dom";

export default function Room() {
    // const location = useLocation();
        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");
        
        // const { roomId } = useParams();
        // const roomIdN=Number(roomId);
        const navigate = useNavigate()
        // const  userRole  = location.state || {};
        const {rooms, userRole } = useContext(RoomsContext);
        const [dropdownVisible, setDropdownVisible] = useState(false); // حالة القائمة المنسدلة
        const [newMessage, setNewMessage] = useState("");
        const messagesEndRef = useRef(null);
        const textAreaRef = useRef(null);
        const token = localStorage.getItem("authToken");

        const currentRoomIndex = rooms.find(room =>
        room.id === userRole.roomId);

        const [messages, setMessages] = useState([
        { id: 1, text: "Hello!", self: false, avatar: "../assets/pic1.jpg" },
        { id: 2, text: "Hi there!", self: true, avatar: "../assets/user2.png" },
        { id: 3, text: "How are you?", self: false, avatar: "../assets/user1.png" },
        { id: 4, text: "I'm good, thanks!", self: true, avatar: "../assets/user2.png" },
    ]);


        useEffect(() => {
            scrollToBottom();
        }, [messages]);



        useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);



    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        setMessages([
            ...messages,
            { id: messages.length + 1, text: newMessage, self: true, avatar: "../assets/user2.png" },
        ]);
        setNewMessage("");
    };

    const handleOpenSetting = () => {
        setDropdownVisible(true);
    };
    const handleCloseSetting = () => {
        setDropdownVisible(false);
    };

    function handleDelete(){
    setDropdownVisible(false);
    try {
        rooms.map(async (room) => {
            const response = await fetch(`http://localhost:3000/delete-room/${room.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                // setError(responseData.message);
                setSuccess(responseData.message)
                setTimeout(() => {
                    navigate('/rooms');
                }, 1500);
                console.log("delete room", responseData.message);
            } else {
                const errorData = await response.json();
                setError(errorData.message)
                console.error("Error:", errorData.message);
            }
        });
    } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Internal server error");
    }
    };

async function handleLeave() {
    setDropdownVisible(false);
    try {
        rooms.map(async (room) => {
            const response = await fetch(`http://localhost:3000/leave-room/${room.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                // setError(responseData.message)
                setSuccess(responseData.message)
    setTimeout(() => {
        navigate('/rooms'); // التنقل بعد وقت قصير
    }, 1500);
                console.log("rooms", responseData.message);
            } else {
                const errorData = await response.json();
                setError(errorData.message)
                console.error("Error:", errorData.message);
            }
        });
    } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Internal server error");
    }
}




    return (
        <div  className="chatting">
            <NavBar></NavBar>
            <header>
                <div className="left-header">
                    <img src={backArrow} onClick={()=>navigate('/rooms')} alt="Back" />
                    {/* <span id="chat-name">{currentRoomIndex.host.username}</span> */}
                    <span id="chat-name">Maria Alam</span>

                </div>
                <div onMouseLeave={handleCloseSetting} onMouseEnter={handleOpenSetting}>
                    <img  src={roomSetting} alt="Settings" />
                        {dropdownVisible && (
                        <div className="dropdown">
                                        {userRole.role ==="host" ? (
                                        <a style={{ color: "red" }} onClick={handleDelete}>
                                            Delete
                                        </a>
                                        ) : (
                                        <a onClick={handleLeave}>Leave</a>
                                        )}
                        </div>
                    )}
                </div>
            </header>
            <main>
                {/* <div className="scrollable-content"> */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-wrapper ${message.self ? "self" : ""}`}
                    >
                        {!message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                        <div className={`message ${message.self ? "self" : ""}`}>
                            {message.text}
                        </div>
                        {message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                    </div>
                ))}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-wrapper ${message.self ? "self" : ""}`}
                    >
                        {!message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                        <div className={`message ${message.self ? "self" : ""}`}>
                            {message.text}
                        </div>
                        {message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                    </div>
                ))}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-wrapper ${message.self ? "self" : ""}`}
                    >
                        {!message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                        <div className={`message ${message.self ? "self" : ""}`}>
                            {message.text}
                        </div>
                        {message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                    </div>
                ))}


                <div ref={messagesEndRef}></div>
                {/* </div> */}
            </main>
            <footer>
                <img src={addEmoji} alt="Emoji" />
                <textarea
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (e.shiftKey) {
                                return;
                            }
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                    ref={textAreaRef}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} // تحديث النص عند الكتابة
                ></textarea>
                <img src={send} alt="Send" onClick={sendMessage} style={{ cursor: "pointer" }} />
            </footer>
            {error && <Error message={error}/>}
            {success && <Success message={success}/>}
        </div>
    );
}
