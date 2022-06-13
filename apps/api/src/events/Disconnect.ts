import type { Socket } from "socket.io";
import type { SocketService } from "../services/Socket.js";
import { Events } from "../types/Events.js";
import { Event } from "../structures/Event.js";

export default class DISCONNECT extends Event {
  constructor(service: SocketService) {
    super(service, Events.Disconnect);
  }

  async handle(socket: Socket) {
    this.service.users.delete(socket.id);

    this.service.io.emit(Events.UserJoin, this.service.users.size);

    if (this.service.users.size <= 0) {
      this.service.files.clear();
    }
  }
}
