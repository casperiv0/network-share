import { Socket } from "socket.io";
import { SocketService } from "src/services/Socket";
import { Events } from "types/Events";
import { Event } from "structures/Event";

export default class FILE_UPLOAD extends Event {
  constructor(service: SocketService) {
    super(service, Events.FILE_UPLOAD);
  }

  async handle(socket: Socket, data: any) {
    console.log(data);

    socket.broadcast.emit(Events.FILE_UPLOAD, { files: data });
  }
}
