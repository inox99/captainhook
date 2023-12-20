// import { CDb as ICdb } from "./shipmatchIDb.js"
// import { writeFile, writeFileSync, readFile, readFileSync } from "fs"
import { shipMatch } from "./shipmatch.js"
import { CDb } from "./shipmatchDbLocalFS.js"

const shipmatchServerTest = {
    test(jo) {
        return jo;
    },
    echo(jo) {
        return jo;
    },
    async list(jo) {
        shipMatch.assignDb(new CDb());
        const l = await shipMatch.list();
        jo.d = l;
        console.debug(jo);
        return jo;
    },
    onRequest(jo) {
        //const jo = JSON.parse(msg);
        //const jo = msg;
        if ((jo == null) || (typeof jo.func === "undefined")) {
            //socket.emit("error", "shipmatchServer invalid request");
            console.error("shipmatchServerTest invalid request");
            return { status: "error" };
        }
        if (!jo.func) {
            console.error("shipmatchServerTest.func invalid request");
            //socket.emit("error", "shipmatchServer invalid func");
            return { status: "error" };
        }
        //console.log(jo.func);
        // const d = this[jo.func](socket, jo);
        // console.log(d);
        return this[jo.func](jo, callback);
    }
}

export { shipmatchServerTest }