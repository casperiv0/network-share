import type { Socket } from "socket.io";
import type { SocketService } from "../services/Socket.js";
import { Events } from "@network-share/types";
import { Event } from "../structures/Event.js";

export default class USER_JOIN extends Event {
  constructor(service: SocketService) {
    super(service, Events.UserJoin);
  }

  async handle(socket: Socket) {
    if (!this.service.users.has(socket.id)) {
      this.service.users.set(socket.id, { socketId: socket.id });
    }

    this.service.io.emit(Events.UserJoin, this.service.users.size);
    this.service.io.emit(Events.FileUpload);
  }
}
