import { Socket } from "socket.io";

/**
 * RoomService logs when started for a socket.
 */
export class RoomService {
    constructor(private socket: Socket) {}

    public setup( ): void {
        console.log( `[RoomService] started for ${this.socket.id}`);
    }
}