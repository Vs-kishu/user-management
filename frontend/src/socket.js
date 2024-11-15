import { io } from "socket.io-client";

// Retrieve the user ID from localStorage or elsewhere
const userId = JSON.parse(localStorage.getItem("userToken"))?.userId; 

const socket = io("http://localhost:5000", {
  query: { userId: userId }, // Send the userId as a query parameter
});

export default socket;
