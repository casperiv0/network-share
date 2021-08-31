import { Socket } from "socket.io";
import { SocketService } from "src/services/Socket";
import { Events } from "types/Events";
import { Event } from "structures/Event";

export default class DISCONNECT extends Event {
  constructor(service: SocketService) {
    super(service, Events.DISCONNECT);
  }

  async handle(socket: Socket) {
    socket.broadcast.emit(Events.DISCONNECT, this.service.users.get(socket.id));

    this.service.users.delete(socket.id);
  }
}
