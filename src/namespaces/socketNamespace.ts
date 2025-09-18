import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export function setupSocketNamespace(io: Server) {

    const socketNamespace = io.of("/socket");

    socketNamespace.on("connection", ( socket ) => {

        console.log(`[SocketNamespace1] Client connected: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`[SocketNamespace1] Client disconnected: ${socket.id}`);

        });

        socket.on("auth", async ( msg ) => {

            const decoded:any = jwt.verify(msg, 'a-string-secret-at-least-256-bits-long');

            console.log( `[SocketNamespace1] Received message: ${decoded.name}`);

        })

    });

    const namespace = io.of("/");

    namespace.on("connection", ( socket ) => {

        console.log(`[namespace3] Client connected: ${ socket.id }`);

        socket.on("disconnect", () => {

            console.log(`[namespace3] Client disconnected: ${ socket.id }`);

        });

    });

    
    return socketNamespace;

}