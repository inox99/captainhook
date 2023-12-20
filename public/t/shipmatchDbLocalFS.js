import { CDb as ICdb } from "./shipmatchIDb.js"
import { writeFile, writeFileSync, readFile, readFileSync, promises } from "fs"

// const _window = {
//    localStorage: {
//       setItem(Id, js) {
//          const fn = `${this.location}/${Id}.json`;
//          writeFileSync(fn, js);
//       },
//       getItem(Id) {
//          const fn = `${this.location}/${Id}.json`;
//          const f = readFileSync(fn, { encoding: 'utf8' });
//          return f;
//       }
//    }
// }

export class CDb extends ICdb {
   //export class CDb  {
   //window;
   constructor() {
      super("./assets/docs");
      // if (typeof window === 'undefined') {
      //    super("./assets/docs");
      //    this.window = _window;
      // }
      // else {
      //    super("");
      //    this.window = window;
      // }
   }
   async save(obj) {
      if (obj.id) {
         const fn = `${this.location}${obj.id}.json`;
         writeFileSync(fn, JSON.stringify(obj));
         // this.window.localStorage.setItem(obj.id, JSON.stringify(obj));
      }
      else {
         throw new Error(`could not save shipmatchobject, id is not defined`);
      }
   }
   async load(id) {
      const fn = `${this.location}${id}.json`;
      const f = readFileSync(fn, { encoding: 'utf8' });
      //const f = this.window.localStorage.getItem(id);
      if (f == null)
         throw new Error(`could not load shipmatchobject ${id}`);
      return JSON.parse(f);
   }
   async list(player) {
      //return promises.readdir(this.location);

      const ff = await promises.readdir(this.location);
      return ff.map(fileName => {
         const f = fileName.split(".")[0];
         return f;
      });
   }
}
