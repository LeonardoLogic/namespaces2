import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export function setupSocketNamespace(io: Server) {

    const socketNamespace = io.of("/socket");

    socketNamespace.on("connection", ( socket ) => {

        console.log(`[SocketNamespace] Client connected: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`[SocketNamespace] Client disconnected: ${socket.id}`);

        });

        socket.on("auth", async ( msg ) => {

            const decoded:any = jwt.verify(msg, 'a-string-secret-at-least-256-bits-long');

            console.log(`[SocketNamespace] Received message: ${decoded.name}`);

            socket.emit("message", `Hello ${decoded.name}, you are authenticated!`);

        })
        

    });

    const namespace = io.of("/");

    namespace.on("connection", ( socket ) => {

        console.log(`[SocketNamespace] Client connected: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`[SocketNamespace] Client disconnected: ${socket.id}`);

        });

        socket.on("auth", async ( msg ) => {

            const decoded:any = jwt.verify(msg, 'a-string-secret-at-least-256-bits-long');

            console.log(`[SocketNamespace] Received message: ${decoded.name}`);

            socket.emit("message", `Hello ${decoded.name}, you are authenticated!`);

        })

    });

    
    return socketNamespace;

}