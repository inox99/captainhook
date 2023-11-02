import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

io.on("connect", (socket) => {
  console.log("user connected", socket.id);
});

app.use(express.static("public"));

httpServer.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
