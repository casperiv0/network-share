import express from "express";
import fileUpload from "express-fileupload";
import { SocketService } from "./services/Socket";

const server = express();
server.use(fileUpload());

new SocketService(server);
