import { CDb } from "./shipmatchDbLocalFS.js"
//import { CDb } from "./shipmatchDbFirebase.js"

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
   "turn": 0,
   "dim": 10,
   //"ships": [[4, 1], [3, 2], [2, 3], [1, 4]],
   "ships": {
      "4": 1,
      "3": 2,
      "2": 3,
      "1": 4,
   },
   "player1": "",
   "battlefield1": {},
   "player2": "",
   "battlefield2": {},
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
   shoot(x, y) {
      if (x < 0 || x >= this.dim || y < 0 || y >= this.dim)
         return;
      this.oppField[y * 10 + x] = this.oppField[y * 10 + x] | 1;
      console.info("Player.shoot noch nicht fertig");
   }
}

export class ShipMatch {
   d;
   player1;
   player2;
   constructor() {
      this.db = new CDb();
      // this.d = ShipMatchDv1;
      // this.d.id = this.d.created = Date.now();
      // this.d.player1.id = player;
      // this.d.state = ShipMatchState.init;
      // for (let i = 0; i < this.d.dim; i++) {
      //    this.d.player1.battlefield[i] = [];
      //    this.d.player2.battlefield[i] = [];
      //    for (let j = 0; j < this.d.dim; j++) {
      //       this.d.player1.battlefield[i][j] = 0;
      //       this.d.player2.battlefield[i][j] = 0;
      //    }
      // }
   }
   static createnew(player) {
      const shipMatch = new ShipMatch();
      shipMatch.d = ShipMatchDv1;
      shipMatch.d.id = (shipMatch.d.created = Date.now()).toString();
      shipMatch.d.player1 = player;
      shipMatch.d.state = ShipMatchState.init;
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
      return shipMatch;
   }

   static async load(id) {
      try {
         const shipMatch = new ShipMatch();
         shipMatch.d = JSON.parse(await shipMatch.db.load(id));
         shipMatch.player1 = new Player(1, shipMatch);
         return shipMatch;
      }
      catch (error) {
         console.error(`could not load object ${id}, ${error}`)
         throw error;
      }
   }

   async save() {
      try {
         await this.db.save(this.d);
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
