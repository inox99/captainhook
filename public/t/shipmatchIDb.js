
export class CDb {
   constructor(Location) {
      this.location = Location;
   }
   async save(obj) {
      throw new Error("CDb.save not Implemented");
   }
   async load(Id) {
      throw new Error("CDb.load not Implemented");
   }
   async list(player) {
      throw new Error("CDb.list not Implemented");
   }
}
//export default CDb
