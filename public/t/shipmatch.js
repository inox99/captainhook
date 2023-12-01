//import { CDb } from "./shipmatchDbLocalFS.js"
//import { CDb } from "./shipmatchDbFirebase.js"
import { CDb } from "./shipmatchDbLocalStorage.js"

const ShipMatchState = {
   init: 0,
   waitforready: 1,
   running: 2,
   canceled: -1,
   finished: 3
}

const ShipMatchDv1 = {
   "id": undefined,
   "created": "",
   "state": 0,
   "shotcounter": 0,
   "turn1": true,
   "dim": 10,
   //"ships": [[4, 1], [3, 2], [2, 3], [1, 4]],
   "ships": {
      "4": 1,
      "3": 2,
      "2": 3,
      "1": 4,
   },
   "player1": "",
   "battlefield1": [],
   "player2": "",
   "battlefield2": [],
}

class Player {
   name;
   dim;
   ownField;
   oppField;
   shipMatch;
   constructor(Id, ShipMatch) {
      this.shipMatch = ShipMatch;
      this.dim = ShipMatch.d.dim;
      if (Id == 1) {
         this.name = ShipMatch.d.player1;
         this.ownField = ShipMatch.d.battlefield1;
         this.oppField = ShipMatch.d.battlefield2;
      }
      else if (Id == 2) {
         this.name = ShipMatch.d.player2;
         this.ownField = ShipMatch.d.battlefield2;
         this.oppField = ShipMatch.d.battlefield1;
      }
   }
   shoot(y, x) {
      if (x < 0 || x >= this.dim || y < 0 || y >= this.dim)
         return null;
      this.oppField[y * 10 + x] = this.oppField[y * 10 + x] | 1;
      return this.oppField[y * 10 + x];
      console.info("Player.shoot noch nicht fertig");
   }
}

//export class ShipMatch {
class ShipMatch {
   d;
   player1;
   player2;
   constructor() {
      this.db = new CDb();
   }
   static createnew(playerId) {
      const shipMatch = new ShipMatch();
      shipMatch.d = ShipMatchDv1;
      shipMatch.d.id = (shipMatch.d.created = Date.now()).toString();
      shipMatch.d.state = ShipMatchState.init;
      shipMatch.d.player1 = playerId;
      shipMatch.player1 = new Player(1, shipMatch);
      for (let i = 0; i < shipMatch.d.dim * shipMatch.d.dim; i++) {
         shipMatch.d.battlefield1[i] = 0;
         shipMatch.d.battlefield2[i] = 0;
      }

      // for (let i = 0; i < shipMatch.d.dim; i++) {
      //    shipMatch.d.player1.battlefield[i] = [];
      //    shipMatch.d.player2.battlefield[i] = [];
      //    for (let j = 0; j < shipMatch.d.dim; j++) {
      //       shipMatch.d.player1.battlefield[i][j] = 0;
      //       shipMatch.d.player2.battlefield[i][j] = 0;
      //    }
      // }
      return { shipMatch: shipMatch, player1: shipMatch.player1 };
   }

   static async load(id) {
      try {
         const shipMatch = new ShipMatch();
         //shipMatch.d = JSON.parse(await shipMatch.db.load(id));
         shipMatch.d = await shipMatch.db.load(id);

         shipMatch.player1 = new Player(1, shipMatch);
         return { shipMatch: shipMatch, player1: shipMatch.player1 };
      }
      catch (error) {
         console.error(`could not load object ${id}, ${error}`)
         throw error;
      }
   }

   async save() {
      try {
         await this.db.save(this.d);
         return this.d.id;
      }
      catch (error) {
         console.error(`could not save object ${this.d.id}, ${error}`)
      }
   }
   logBattlefield(id) {
      let b;
      if (id == 1) {
         b = this.d.battlefield1;
         console.log("battlefield1");
      }
      else if (id == 2) {
         b = this.d.battlefield2;
         console.log("battlefield2");
      }
      else
         return;
      let n = 0;
      for (let i = 0; i < this.d.dim; i++) {
         console.log(`${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}, ${b[n++]}`);
      }
   }
}

export { ShipMatch }