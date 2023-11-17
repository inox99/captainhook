const IDb = {
   save: function (obj) { throw new Error("not Implemented"); },
   load: function (Id) { throw new Error("not Implemented"); },
   list: function (player) { throw new Error("not Implemented"); }
}

export class CDb {
   constructor(Location) {
      this.location = Location;
   }
   async save(obj) {
      throw new Error("not Implemented");
   }
   async load(Id) {
      throw new Error("not Implemented");
   }
   async list(player) {
      throw new Error("not Implemented");
   }
}
//export default CDb
