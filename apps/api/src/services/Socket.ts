import type { Application, Request, Response } from "express";
import type { Event } from "../structures/Event.js";
import { Server, ServerOptions } from "socket.io";
import { Events } from "../types/Events.js";
import { loadEvents } from "../utils/loadEvents.js";
import { CLIENT_URL } from "../utils/constants.js";

import DISCONNECT from "../events/Disconnect.js";

const SOCKET_OPTIONS: Partial<ServerOptions> = {
  cors: {
    origin: CLIENT_URL,
  },
};

export class SocketService {
  private server: Application;
  private events: Map<string, Event> = new Map();
  io: Server;

  files: Map<string, any> = new Map();
  users: Map<string, any> = new Map();

  constructor(expressServer: Application) {
    const port = parseInt(process.env.API_PORT ?? "3030");
    this.server = expressServer;

    this.io = new Server(
      expressServer.listen(port, () => {
        console.log("Server & socket is running.");
      }),
      SOCKET_OPTIONS,
    );

    this.server.get("/files", (_req: Request, res: Response) => {
      res.json({ files: Array.from(this.files.entries()) });
    });

    this.init();
  }

  async init() {
    this.events = await loadEvents(this);

    this.io.on("connection", (socket) => {
      socket.on("disconnect", () => new DISCONNECT(this).handle(socket));

      this.events.forEach((event) => {
        socket.on(event.name, (...args: any[]) => {
          event.handle(socket, ...args);
        });
      });
    });

    this.server.post("/upload", this.handleFileUpload.bind(this));
  }

  async handleFileUpload(req: Request, res: Response) {
    if (!req.files) {
      return res.status(400).send();
    }

    for (const f in req.files) {
      this.files.set(f, req.files[f]!);
    }

    this.io.sockets.emit(Events.FileUpload);
    return res.status(204).send();
  }
}
