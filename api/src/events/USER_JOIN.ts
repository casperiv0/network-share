import { Socket } from "socket.io";
import { SocketService } from "src/services/Socket";
import { Events } from "types/Events";
import { Event } from "structures/Event";

export default class USER_JOIN extends Event {
  constructor(service: SocketService) {
    super(service, Events.USER_JOIN);
  }

  async handle(socket: Socket) {
    if (!this.service.users.has(socket.id)) {
      this.service.users.set(socket.id, { socketId: socket.id });
    }

    this.service.io.emit(Events.USER_JOIN, this.service.users.size);
  }
}
