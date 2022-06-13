import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { SocketService } from "./services/Socket.js";
import { CLIENT_URL } from "./utils/constants.js";

const server = express();
server
  .use(
    fileUpload({
      // max 6 gigs
      limits: { fileSize: 6000000000 },
      abortOnLimit: true,
      responseOnLimit: "File size too large.",
    }),
  )
  .use(cors({ origin: CLIENT_URL }));

new SocketService(server);
