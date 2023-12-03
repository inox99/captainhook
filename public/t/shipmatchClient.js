import { io } from "socket.io-client";
/*
https://socket.io/docs/v4/client-initialization/
*/

const shipmatchClient = {
    socket_: null,
    url_: null,
    // socket.timeout(5000).emit("my-event", (err) => {
    //    shipmatchClient.test();
    // });

    test() {
        if ((this.socket_ == null) || (!this.socket_.connected)) {
            return { "error": "invalid connection" };
        }
        this.socket_.emit("shipobject", { func: "echo" }, (response) => {
            //console.log(response); // "got it"
        });
    },
    connect(url) {
        this.url_ = typeof url !== "undefined" ? url : "http://localhost:3000";
        this.socket_ = io(this.url_);
        this.socket_.on("connect", () => {
            console.debug(`shipmatch-client.connect ${this.socket_.id}`);
        });
        this.socket_.on("shipobject", () => {
            //console.debug(`shipmatch-client shipobject received`);
        });

        return this.socket_;
    }
}

export { shipmatchClient }