import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { SocketService } from "./services/Socket";

const server = express();
server.use(fileUpload());
server.use(cors({ origin: "http://localhost:3000" }));

new SocketService(server);
