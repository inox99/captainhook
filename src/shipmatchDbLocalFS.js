import { CDb as ICdb } from "./shipmatchIDb.js"
import { writeFile, writeFileSync, readFile, readFileSync } from "fs"

export class CDb extends ICdb {
   constructor() {
      super("assets/docs");
   }
   async save(obj) {
      if (obj.id) {
         const fn = `${this.location}/${obj.id}.json`;
         writeFileSync(fn, JSON.stringify(obj));
      }
      else {
         throw new Error(`could not save shipmatchobject, id is not defined`);
      }
   }
   async load(id) {
      const fn = `${this.location}/${id}.json`;
      // const f = await readFile(fn, { encoding: 'utf8' });
      // return f;
      const f = readFileSync(fn, { encoding: 'utf8' });
      return f;
   }
   async list(player) {
      throw new Error("not Implemented");
   }
}
