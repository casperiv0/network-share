import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { SocketService } from "./services/Socket";
import { CLIENT_URL } from "utils/constants";

const server = express();
server.use(
  fileUpload({
    // max 6 gigs
    limits: { fileSize: 6 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "File size too large.",
  }),
);
server.use(cors({ origin: CLIENT_URL }));

new SocketService(server);
