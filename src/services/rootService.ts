import { Socket, Server } from "socket.io";
import { RoomService } from "./roomService";

/**
 * RootService initializes sub-services for a socket.
 */
export class RootService {
    private roomService: RoomService;

    constructor( private socket: Socket, private io: Server ) {
        this.roomService = new RoomService(socket, io);
    }

    public setup(): void {
        console.log(`[RootService] started for ${this.socket.id}`);
        this.roomService.setup();
    }
}