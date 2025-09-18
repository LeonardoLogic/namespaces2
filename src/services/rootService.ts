import { Socket } from "socket.io";
import { RoomService } from "./roomService";

/**
 * RootService initializes sub-services for a socket.
 */
export class RootService {
    private roomService: RoomService;

    constructor( private socket: Socket ) {
        this.roomService = new RoomService(socket);
    }

    public setup(): void {
        console.log( `[RootService] started for ${this.socket.id}`);
        this.roomService.setup( );
    }
}