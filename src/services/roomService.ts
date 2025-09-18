import { Socket, Server } from "socket.io";

/**
 * RoomService logs when started for a socket.
 */
export class RoomService {
    private socket: Socket;
    private io: Server;

    constructor(socket: Socket, io: Server) {
        this.socket = socket;
        this.io = io;
    }

    public setup(): void {
        console.log(`[RoomService] started for ${this.socket.id}`);
        this.socket.on("room:join", (room: string) => {
            this.socket.join(room);
            console.log(`[RoomService] Socket ${this.socket.id} joined room ${room}`);
            this.io.to(room).emit("message", `User ${this.socket.id} has joined room ${room}`);
        });

        this.socket.on("room:leave", (room: string) => {
            this.socket.leave(room);
            console.log(`[RoomService] Socket ${this.socket.id} left room ${room}`);
        });
    }
}