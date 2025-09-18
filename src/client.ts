import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

const secret = "a-string-secret-at-least-256-bits-long";
const sockets = io("http://localhost:3000/");

sockets.on("connect", () => {
    console.log(`[Client] Connected with id: ${sockets.id}`);
    // Join room1
    sockets.emit("room:join", "room1");

    // Optionally, emit auth with a JWT
    const token = jwt.sign({ id: sockets.id, name: `User_${sockets.id}` }, secret);
    sockets.emit("auth", token);

    console.log(`[Client] Emitted auth with token: ${token}`);

    if(token) {
        console.log(`[Client] Auth token is valid: ${token}`);
        
    }else {
        console.log(`[Client] Auth token is invalid`);
    }

    //sockets.emit("room:leave", "room1");
});

sockets.on("message", (msg: string) => {
    console.log(`[Client] Received message: ${msg}`);
});

sockets.on("disconnect", () => {
    console.log("[Client] Disconnected from default namespace");
});

// Uncomment to leave the room after 5 seconds
setTimeout(() => {
    sockets.emit("room:leave", "room1");
}, 5000);
