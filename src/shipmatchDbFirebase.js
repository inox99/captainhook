import { CDb as ICdb } from "./shipmatchIDb.js"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBFJ29U37VB1pMv3-fVzps2kMX4DY4uLaY",
   authDomain: "test-run-a1.firebaseapp.com",
   projectId: "test-run-a1",
   storageBucket: "test-run-a1.appspot.com",
   messagingSenderId: "83662903845",
   appId: "1:83662903845:web:02ac1e67abd7a3b6d3bdcc"
};

async function getDb(cdb) {
   if (cdb.error)
      throw error;
   if (cdb.db)
      return cdb.db;
   try {
      await signInWithEmailAndPassword(cdb.auth, cdb.email, cdb.password);
      cdb.db = getFirestore(cdb.app);
      return cdb.db;
   } catch (error) {
      cdb.error = error;
      throw error;
   }
}

export class CDb extends ICdb {
   constructor() {
      super("shipmatch");
      this.email = "***";
      this.password = "***";
      this.db;
      this.error;

      try {
         this.app = initializeApp(firebaseConfig);
         this.auth = getAuth();
         // signInWithEmailAndPassword(this.auth, this.email, this.password).then(
         //    function (value) { this.userCredential = value; },
         //    function (error) { this.error = error; }
         // );
      } catch (error) {
         this.error = error;
         console.error(error);
      }
   }
   async save(shipMatch) {
      const db = await getDb(this);
      const col = this.location;
      const id = shipMatch.d.id;
      await setDoc(doc(db, col, id), shipMatch.d);
   }
   async load(id) {
      const db = await getDb(this);
      const d = {};
      return d;
   }
   async list(player) {
      const db = await getDb();
   }
}
