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
import io from "socket.io-client";
const socket = io("http://localhost:3000"); // عنوان السيرفر

import { useParams } from "react-router-dom";

export default function Room() {
    // const location = useLocation();
        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");
        
        const { roomId } = useParams();
        const roomIdN=Number(roomId);
        const navigate = useNavigate()
        // const  userRole  = location.state || {};
        const {rooms, userRole, setUserRole } = useContext(RoomsContext);
        const [dropdownVisible, setDropdownVisible] = useState(false); // حالة القائمة المنسدلة
        const [newMessage, setNewMessage] = useState("");
        const messagesEndRef = useRef(null);
        const textAreaRef = useRef(null);
        const token = localStorage.getItem("authToken");
        const currentRoomIndex = rooms.find(room =>
        room.id === userRole.roomId);

        const [messages, setMessages] = useState([
    //     { id: 1, text: "Hello!", self: false, avatar: "../assets/pic1.jpg" },
    //     { id: 2, text: "Hi there!", self: true, avatar: "../assets/user2.png" },
    //     { id: 3, text: "How are you?", self: false, avatar: "../assets/user1.png" },
    //     { id: 4, text: "I'm good, thanks!", self: true, avatar: "../assets/user2.png" },
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


    async function sendMessage (){
        console.log(newMessage);
        if (newMessage.trim() === "") return;
        try{
            const response = await fetch(`http://localhost:3000/message/${userRole.roomId}` ,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({ message: newMessage }),
            });
            if(response.ok){
                const data = await response.json();
                console.log("Message sent via rest", data);


            // إرسال الرسالة عبر Socket.io
                socket.emit("message", {
                    roomid: currentRoomIndex.id,
                    userid: userRole.userId,
                    message: newMessage,
                });
            //     setMessages((prevMessages) => [
            //     ...prevMessages,
            //     { id: data.data.id, text: newMessage, self: true, avatar: pic }
            // ]);
                            setNewMessage("");

            }else{
                const errorData = await response.json();
                console.error("Error sending message via REST:", errorData);
                setError(errorData.errMsg)
            }
        }catch (err) {
        console.error("Error:", err.errMsg);

        setError(err.errMsg);
        }

    };

    useEffect(() => {
    socket.on("message", (data) => {
            console.log("Message received: ", data);
                    // التحقق من أن الرسالة تخص الغرفة الحالية
        if (data.message.roomId === roomId) {
            const isSelf = data.message.senderId === userRole.userId;

            setMessages((prevMessages) => [
                ...prevMessages,
                { id: data.message.id, text: data.message.message, self: isSelf, avatar: pic },
            ]);
        }
        //             const isSelf = data.message.senderId === userRole.userId;
        //             console.log(messages)

        // setMessages((prevMessages) => [
        //     ...prevMessages,
        //         { id: data.message.id, text: data.message.message, self: isSelf, avatar: pic }
        // ]);
                console.log(messages)

        });
    return () => {
        socket.off("message");
    };
}, [userRole.userId]);


useEffect(() => {
    const fetchMessages = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/messages/${userRole.roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data)
//  const formattedMessages = data.messages.map((msg) => ({
//                     ...msg,
//                     self: msg.senderId === userRole.userId,
//                 }));
const formattedMessages = data.messages.map((msg) => ({
    id: msg.id,
    text: msg.message,
    senderId: msg.senderId,
    self: msg.senderId === userRole.userId,
})).sort((a, b) => a.id - b.id);
                setMessages(formattedMessages);
                console.log(formattedMessages);
            } else {
                const errorData = await response.json();
                console.error("Error fetching messages:", errorData.errMsg);
                setError(errorData.errMsg)
            }
        } catch (error) {
            console.error("Error:", error.errMsg);
            setError("Fetching messages failed")

        }
    };

    fetchMessages();
}, [userRole.roomId,token,userRole.userId]);





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
                    <span id="chat-name">{currentRoomIndex.host.username}</span>
                    {/* <span id="chat-name">Maria Alam</span> */}

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
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-wrapper ${message.self ? "self" : ""}`}>
                        {message.self && (<>
                                <img src={pic} alt="User Avatar" className="avatar" />
                                <div className="message self">
                                {message.text}
                                </div>
                                </>
                        )}
                        {!message.self && (<>
                                <img src={pic} alt="User Avatar" className="avatar" />
                                <div className="message rec">
                                {message.text}
                                </div>
                                </>
                        )}
                        {/* {!message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )}
                        <div className={`message ${message.self ? "self" : ""}`}>
                            {message.text}
                        </div>
                        {message.self && (
                            <img src={pic} alt="User Avatar" className="avatar" />
                        )} */}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
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
