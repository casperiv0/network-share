import { createServer } from "node:http";
import { Server, ServerOptions } from "socket.io";
import { Event } from "structures/Event";
import { loadEvents } from "utils/loadEvents";

const SOCKET_OPTIONS: Partial<ServerOptions> = {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
};

export class SocketService {
  private events: Map<string, Event> = new Map();
  io: Server;
  users: Map<string, any> = new Map();

  constructor() {
    const server = createServer();
    const port = parseInt(process.env.API_PORT ?? "3030");

    this.io = new Server(
      server.listen(port, () => {
        console.log("Socket is running.");
      }),
      SOCKET_OPTIONS,
    );

    this.init();
  }

  async init() {
    this.events = await loadEvents(this);

    this.io.on("connection", (socket) => {
      this.events.forEach((event) => {
        socket.on(event.name, event.handle.bind(null, socket));
      });
    });
  }
}
