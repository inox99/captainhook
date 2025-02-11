// import { CDb as ICdb } from "./shipmatchIDb.js"
// import { writeFile, writeFileSync, readFile, readFileSync } from "fs"

const shipmatchServer = {

    test(jo) {
        return jo;
    },
    echo(jo) {
        return jo;
    },
    list(jo) {
        return jo;
    },
    onRequest(jo) {
        //const jo = JSON.parse(msg);
        //const jo = msg;
        if ((jo == null) || (typeof jo.func === "undefined")) {
            //socket.emit("error", "shipmatchServer invalid request");
            console.error("shipmatchServer invalid request");
            return { status: "error" };
        }
        if (!jo.func) {
            console.error("shipmatchServer invalid request");
            //socket.emit("error", "shipmatchServer invalid func");
            return { status: "error" };
        }
        //console.log(jo.func);
        // const d = this[jo.func](socket, jo);
        // console.log(d);
        return this[jo.func](jo);
    }
}

export { shipmatchServer }