import App from "./app";
import { SocketServer } from "./server";

// Start HTTP server
App.startHTTP(3000);

// Start Socket.IO server
const socketServer = new SocketServer( App);
socketServer.start( );