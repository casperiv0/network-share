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

    const files = [...this.service.files]
      .flatMap((v) => {
        return v[1];
      })
      .filter((v) => typeof v !== "string");

    socket.emit(Events.FILE_UPLOAD, { files });
  }
}
