import express, { Express } from "express";
import http, { Server as HTTPServer } from "http";

/**
 * Singleton App class to manage Express and HTTP server.
 */
class App {
    private static instance: App;
    public readonly app: Express;
    public readonly httpServer: HTTPServer;

    private constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
    }

    public static getInstance(): App {
        if (!App.instance) App.instance = new App();
        return App.instance;
    }

    public startHTTP( port: number ): void {
        this.httpServer.listen(port, () => {
            console.log(`[APP] HTTP server running on http://localhost:${port}`);
        });
    }
}

export default App.getInstance();