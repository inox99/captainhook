import { CDb as ICdb } from "./shipmatchIDb.js"

export class CDb extends ICdb {
   //export class CDb  {
   constructor() {
      super("");
   }
   async save(obj) {
      if (obj.id) {
         //const fn = `${this.location}${obj.id}.json`;
         //writeFileSync(fn, JSON.stringify(obj));
         window.localStorage.setItem(obj.id, JSON.stringify(obj));
      }
      // else {
      //    throw new Error(`could not save shipmatchobject, id is not defined`);
      // }
   }
   async load(id) {
      //const fn = `${this.location}${id}.json`;
      const f = window.localStorage.getItem(id);
      if (f == null)
         throw new Error(`could not load shipmatchobject ${id}`);
      // const f = readFileSync(fn, { encoding: 'utf8' });
      return JSON.parse(f);
   }
   async list(player) {
      throw new Error("not Implemented");
   }
}
