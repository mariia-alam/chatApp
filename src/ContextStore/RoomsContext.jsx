import { createContext, useEffect, useState } from 'react';

const RoomsContext = createContext();



export default function RoomsProvider({ children }) {
    const [rooms, setRooms] = useState([]);
    const [userRole, setUserRole] = useState([]);

    const [error, setError] = useState("");
    const token = localStorage.getItem("authToken");



    // async function handleFetchRooms(){
    //     try {
    //         const response = await fetch("http://localhost:3000/rooms", {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         if (response.ok) {
    //             const responseData = await response.json();
    //             setRooms(responseData.rooms);
    //             console.log(responseData.rooms)
    //         } else {
    //             const errorData = await response.json();
    //             setError(errorData.errMsg || "Internal server error");
    //         }
    //     } catch (err) {
    //         console.error("Error fetching rooms:", err);
    //         setError("Internal server error");
    //     }
    // }

    return (
        <RoomsContext.Provider value={{ userRole, setUserRole ,rooms, setRooms, error, setError }}>
            {children}
        </RoomsContext.Provider>
    );
}
export {RoomsContext};

