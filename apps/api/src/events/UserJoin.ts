import type { Socket } from "socket.io";
import type { SocketService } from "../services/Socket.js";
import { Events } from "../types/Events.js";
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

    const files = [...this.service.files]
      .flatMap((v) => {
        return v[1];
      })
      .filter((v) => typeof v !== "string");

    socket.emit(Events.FileUpload, { files });
  }
}
