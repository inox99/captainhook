import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut, signInWithEmailAndPassword, signInWithPopup, signInWithCredential, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, getCountFromServer, doc, addDoc, setDoc, getDoc, getDocs } from "firebase/firestore";

import { ShipMatch, shipMatch } from "./shipmatch.js";
import { CDb as FbDb } from "./shipmatchDbFirebase.js";
import { CDb as LfsDb } from "./shipmatchDbLocalFS.js";
import { shipmatchClient } from "./shipmatchClient.js"

/*===============================================================================================================
   
   Cloud Firestore         https://firebase.google.com/docs/firestore

   firebase emulators:start --only firestore
   
   emulators: You are not currently authenticated so some features may not work correctly. 
      Please run firebase login to authenticate the CLI.

   https://firebase.google.com/docs/auth/web/password-auth

   https://stackoverflow.com/questions/74242497/is-it-possible-to-retrieve-firebase-id-token-from-the-cli
    
   Create Custom Tokens    https://firebase.google.com/docs/auth/admin/create-custom-tokens

*/

/*===============================================================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFJ29U37VB1pMv3-fVzps2kMX4DY4uLaY",
  authDomain: "test-run-a1.firebaseapp.com",
  projectId: "test-run-a1",
  storageBucket: "test-run-a1.appspot.com",
  messagingSenderId: "83662903845",
  appId: "1:83662903845:web:02ac1e67abd7a3b6d3bdcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/
const firebaseConfig = {
   apiKey: "AIzaSyBFJ29U37VB1pMv3-fVzps2kMX4DY4uLaY",
   authDomain: "test-run-a1.firebaseapp.com",
   projectId: "test-run-a1",
   storageBucket: "test-run-a1.appspot.com",
   messagingSenderId: "83662903845",
   appId: "1:83662903845:web:02ac1e67abd7a3b6d3bdcc"
};
async function testAuth() {
   /*
      https://firebase.google.com/docs/auth/web/password-auth
      https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
   
   */
   const app = initializeApp(firebaseConfig);
   const auth = getAuth();
   if (false) {
      //export declare function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
      const email = process.env.fbEmail;
      const password = process.env.fbpass;


   }
   {
      //Get-Childitem -Path Env:* | Sort-Object Name
      const email = process.env.fbEmail;
      const password = process.env.fbpass;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      if (false) {
         const user = auth.currentUser;
         if (user !== null) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
            console.log(user);
         } else {
            // No user is signed in.
            console.log("No user is signed in");
         }
      }
      if (true) {
         //export declare function signInWithCredential(auth: Auth, credential: AuthCredential): Promise<UserCredential>;
         await signOut(auth);
         await signInWithCredential(auth, userCredential);
         const user = auth.currentUser;
      }
      if (false) {
         //async function signInWithCustomToken(auth, customToken)
         const user = auth.currentUser;
         const token = await user.getIdToken(); //funktioniert nicht, da token dafür nicht geeignet
         await signInWithCustomToken(auth, token);
      }
   }
   {
      const user = auth.currentUser;
      if (user) {
         // User is signed in, see docs for a list of available properties
         // https://firebase.google.com/docs/reference/js/auth.user
         // ...
         console.log(user);
      } else {
         // No user is signed in.
         console.log("No user is signed in");
      }
   }
   if (auth.currentUser)
      await signOut(auth);
}
const testObject = {
   f1() {
      console.debug(`testObject.f1() called`);
      this["f2"]();
   },
   f2() {
      console.debug(`testObject.f2() called`);
   }
}
async function testFb() {

   const app = initializeApp(firebaseConfig);
   const auth = getAuth();

   const db = getFirestore(app);
   connectFirestoreEmulator(db, 'localhost', 8080);

   try {
      if (false) {
         const provider = new GoogleAuthProvider();
         const credential = await signInWithPopup(auth, provider);   //  code: 'auth/operation-not-supported-in-this-environment',
      }
      if (true) {
         const email = process.env.fbEmail;
         const password = process.env.fbpass;
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
   }
   catch (error) {
      console.error(error);
      return;
   }
   try {
      if (false) {
         const Coll = collection(db, 'cities');
         //const Coll = collection(db, 'bkorder');
         console.log(`collection '${Coll.path}' `);
         //const snap = await getCountFromServer(Coll);
         //console.log(`collection '${Coll.path}' enthält ${snap.data().count} docs`);
         if (true) {
            const docRef = doc(db, "cities", "SF");
         }
      }
      if (false) {
         const shipMatch = ShipMatch.createnew("otto");
         const col = shipMatch.db.location;
         const id = shipMatch.d.id;
         await setDoc(doc(db, shipMatch.db.location, shipMatch.d.id), shipMatch.d);
         //const docRef = await addDoc(collection(db, shipMatch.db.location, shipMatch.d.id), shipMatch.d);
      }
      if (true) {
         const docRef = doc(db, "shipmatch", "1700007795874");
         if (false) {
            const docSnap = await getDoc(docRef);
            const d = docSnap.data();
            console.log(d);
         }
         if (true) {
            const r = ShipMatch.createnew("");
            const e = {};
            e.battlefield1 = r.d.battlefield1;
            e.battlefield1[0] = 1;
            //e.player2 = "karl";
            await setDoc(docRef, e, { merge: true });
         }
      }
   }
   catch (error) {
      console.error(error);
   }
   signOut(auth);
}
async function ShipMatchTest() {
   const _ = 0;
   try {
      if (false) {
         const shipMatch = ShipMatch.createnew("karl");
         await shipMatch.save();
      }
      if (false) {
         const shipMatch = await ShipMatch.load("1700054908642");
         new FbDb().save(shipMatch);
         //shipMatch.logBattlefield(2);
      }
      if (false) {
         const { shipMatch, player1 } = ShipMatch.createnew("karl");
         shipMatch.logBattlefield(2);
         //await shipMatch.save();
         player1.shoot(2, 2);
         shipMatch.logBattlefield(2);
      }
      if (false) {
         const { shipMatch, player1 } = await ShipMatch.load("1700054908642");
         shipMatch.logBattlefield(2);
         player1.shoot(9, 3);
         shipMatch.logBattlefield(2);
         await shipMatch.save();
      }
      if (true) {
         shipMatch.assignDb(new LfsDb());
         const shipmathList = await shipMatch.list();
         shipmathList.map(fileName => {
            console.log(fileName);
         });
      }
      if (true) {
      }
   } catch (error) {
      console.error(`executing ShipMatchTest, error${error}`);
   }
}
function ShipMatchSocketTest() {
   //socket.disconnect();
   let socket = shipmatchClient.connect();
   //shipmatchClient.test();
   //console.log(`ShipMatchSocketTest, socket.id: ${socket.id}`);
   setTimeout(async () => {
      console.log(`ShipMatchSocketTest, socket.id: ${socket.id}`);
      const response = shipmatchClient.test_({ func: "echo" });   // NOK response undefined
      //const response = await shipmatchClient.test_({ func: "list" });

      //const response = await shipmatchClient.test({ func: "echo" }); // OK
      //const response = await shipmatchClient.test({ func: "list" }); // ok but empty
      console.log(response);
   }, 1000);

   // shipmatchClient.connect(async (socket) => {
   //    console.log(`shipmatchClient.connect, socket.id: ${socket.id}`);
   //    const response = await shipmatchClient.test({ func: "list" });
   //    console.log(response);
   //    //socket.close();
   // });
}

//================================================================================
const _ = 0;
//testObject.f1();
//testAuth();
//testFb();
//ShipMatchTest();
ShipMatchSocketTest();

// // (async () => {
// //    await ShipMatchSocketTest();
// // })();