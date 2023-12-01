import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { shipmatchServer } from "../public/t/shipmatch-server.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

io.on("connect", (socket) => {
   console.log("user connected", socket.id);
   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
   socket.on('shipobject', (msg) => {
      console.log(`shipobject request received`);
      shipmatchServer.onRequest(socket, msg);
   });
});

app.use(express.static("public"));

httpServer.listen(port, () => {
   console.log(`App Listening on port ${port}`);
});
