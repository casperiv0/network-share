import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { SocketService } from "./services/Socket";
import { CLIENT_URL } from "utils/constants";

const server = express();
server.use(fileUpload());
server.use(cors({ origin: CLIENT_URL }));

new SocketService(server);
