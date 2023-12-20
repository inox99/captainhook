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

    test_(testObject) {
        if ((this.socket_ == null) || (!this.socket_.connected)) {
            return { "error": "invalid connection" };
        }
        this.socket_.emitWithAck("shipmatchtest", testObject, (response) => {
            console.log(`test_, shipmatchtest${response}`); // "got it"
        });
    },
    async test(testObject) {
        if ((this.socket_ == null) || (!this.socket_.connected)) {
            return { "error": "invalid connection" };
        }
        // this.socket_.emitWithAck("shipmatchtest", testObject, (response) => {
        //     console.log(response); // "got it"
        // });
        const response = await this.socket_.emitWithAck("shipmatchtest", testObject);
        return response;
    },
    echo() {
        this.socket_.emit("shipobject", { func: "echo" }, (response) => {
            //console.log(response); // "got it"
        });
    },
    connect(connectCallback, url) {
        this.url_ = typeof url !== "undefined" ? url : "http://localhost:3000";
        this.socket_ = io(this.url_);
        this.socket_.on("connect", () => {
            console.debug(`shipmatch-client.connect ${this.socket_.id}`);
            if (connectCallback)
                connectCallback(this.socket_);
        });
        this.socket_.on("shipobject", () => {
            //console.debug(`shipmatch-client shipobject received`);
        });

        return this.socket_;
    }
}

export { shipmatchClient }