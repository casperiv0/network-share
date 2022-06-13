import type { Socket } from "socket.io";
import type { SocketService } from "../services/Socket.js";
import { Events } from "../types/Events.js";
import { Event } from "../structures/Event.js";

export default class FILE_UPLOAD extends Event {
  constructor(service: SocketService) {
    super(service, Events.FileUpload);
  }

  async handle(socket: Socket, data: any) {
    socket.broadcast.emit(Events.FileUpload, { files: data });
  }
}
