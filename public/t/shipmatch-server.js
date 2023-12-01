import { CDb as ICdb } from "./shipmatchIDb.js"
import { writeFile, writeFileSync, readFile, readFileSync } from "fs"

const shipmatchServer = {

    echo(socket, jo) {
        socket.emit("shipobject", jo);
    },
    onRequest(socket, msg) {
        //const jo = JSON.parse(msg);
        const jo = msg;
        if ((jo == null) || (typeof jo.func === "undefined")) {
            socket.emit("error", "shipmatchServer invalid request");
            console.error("shipmatchServer invalid request");
            return;
        }
        if (!jo.func) {
            socket.emit("error", "shipmatchServer invalid func");
            return;
        }
        console.log(jo.func);
        this[jo.func](socket); //socket.emit("shipobject", jo);
    }
}

export { shipmatchServer }