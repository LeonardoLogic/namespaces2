import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

const sockets: any = io( "http://localhost:3000/" );

const namespace = io( "http://localhost:3000/socket ");

function createJWT(payload: object, secret: string) {
    return jwt.sign(payload, secret);
}

namespace.on("connect", () => {
    console.log(`[Client] Connected to /socket namespace with id: ${namespace.id}`);
    const secret = "a-string-secret-at-least-256-bits-long";

    for (let i = 0; i < 10; i++) {
        const token = createJWT({ id: i, name: `User${i}` }, secret);
        namespace.emit( "auth" , token);
    }
    
    namespace.disconnect();
});

sockets.on( "connect" , () => {
    console.log(`[Client] Connected with id: ${sockets.id}`);
    sockets.disconnect();
});

sockets.on( "disconnect" , () => {
    console.log("[Client] Disconnected from default namespace");
});

namespace.on( "disconnect" , () => {
    console.log("[Client] Disconnected from /socket namespace");
});

// You can emit or listen to custom events here as needed
