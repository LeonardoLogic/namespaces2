import { Server as SocketIOServer, Socket } from "socket.io";
import App from "./app";
import { RootService } from "./services/rootService";
import apiRouter  from "./namespaces/APInamespace";
import { setupSocketNamespace } from "./namespaces/socketNamespace";

/**
 * SocketServer manages Socket.IO connections.
 */
export class SocketServer {
    private io: SocketIOServer;

    constructor(private app: typeof App) {
        this.io = new SocketIOServer( this.app.httpServer, {
            cors: { origin: "*" }
        });
    }

    public start( ): void {
        // Default namespace
        this.io.on("connection", (socket: Socket) => {
            new RootService(socket).setup();
        });

        // Setup /api and /socket namespaces
        this.app.app.use("/", apiRouter);
        setupSocketNamespace(this.io);

        console.log("[SocketServer] Socket.IO server started");
    }
}