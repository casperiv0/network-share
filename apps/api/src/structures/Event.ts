import type { Socket } from "socket.io";
import type { SocketService } from "../services/Socket.js";

export abstract class Event {
  service: SocketService;
  name: string;

  constructor(service: SocketService, name: string) {
    this.service = service;
    this.name = name;

    this.handle = this.handle.bind(this);
  }

  abstract handle(socket: Socket, ...args: any[]): Promise<unknown>;
}
