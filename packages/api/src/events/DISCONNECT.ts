import { Socket } from "socket.io";
import { SocketService } from "src/services/Socket";
import { Events } from "types/Events";
import { Event } from "structures/Event";

export default class DISCONNECT extends Event {
  constructor(service: SocketService) {
    super(service, Events.DISCONNECT);
  }

  async handle(socket: Socket) {
    this.service.users.delete(socket.id);

    this.service.io.emit(Events.USER_JOIN, this.service.users.size);

    if (this.service.users.size <= 0) {
      this.service.files.clear();
    }
  }
}
