import { CDb as ICdb } from "./shipmatchIDb.js"
import { writeFile, writeFileSync, readFile, readFileSync } from "fs"

const _window = {
   localStorage: {
      setItem(Id, js) {
         const fn = `${this.location}/${Id}.json`;
         writeFileSync(fn, js);
      },
      getItem(Id) {
         const fn = `${this.location}/${Id}.json`;
         const f = readFileSync(fn, { encoding: 'utf8' });
         return f;
      }
   }
}

export class CDb extends ICdb {
   //export class CDb  {
   window;
   constructor() {
      if (typeof window === 'undefined') {
         super("./assets/docs");
         this.window = _window;
      }
      else {
         super("");
         this.window = window;
      }
   }
   async save(obj) {
      if (obj.id) {
         //const fn = `${this.location}${obj.id}.json`;
         //writeFileSync(fn, JSON.stringify(obj));
         this.window.localStorage.setItem(obj.id, JSON.stringify(obj));
      }
      // else {
      //    throw new Error(`could not save shipmatchobject, id is not defined`);
      // }
   }
   async load(id) {
      //const fn = `${this.location}${id}.json`;
      const f = this.window.localStorage.getItem(id);
      if (f == null)
         throw new Error(`could not load shipmatchobject ${id}`);
      // const f = readFileSync(fn, { encoding: 'utf8' });
      return JSON.parse(f);
   }
   async list(player) {
      throw new Error("not Implemented");
   }
}
