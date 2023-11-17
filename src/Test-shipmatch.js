import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut, signInWithEmailAndPassword, signInWithPopup, signInWithCredential, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, getCountFromServer, doc, addDoc, setDoc, getDoc, getDocs } from "firebase/firestore";

import { ShipMatch } from "./shipmatch.js";

import { CDb as FbDb } from "./shipmatchDbFirebase.js"

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
   const app = initializeApp(firebaseConfig);
   const auth = getAuth();
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
   {
      //Get-Childitem -Path Env:* | Sort-Object Name
      const email = "inox99@arcor.de";
      const password = "inox99"
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
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
      signOut(auth);
   }
}

async function testFb() {

   //const uid = 'bK0SiHAtUSTYs7RDvartnST4gux1';
   //const token = "ya29.a0AWY7CknAmuUJpEOpGUxK_8Lg5GIgRWRNp_1plsvfmrsjQRErbO9ej5q3lo4uURVL90Z2I96civofANFPrLTJiOqJ0KWWrX_6gFQRHHsF97dRESkJo7h8_Nz8Zbw7D0VgUuXwiubyMu2s23dmksDkXLG1NIN89l3BaCgYKAX0SARESFQG1tDrpI0A5Iw1byzB9TX9-V6UGzg0167";
   //const token = "1//09oSfo8JBtlM7CgYIARAAGAkSNwF-L9IrgZhIQhOrFpxB902OThbKBJj6VFG5BW1i5hGXnibBhx28leiNh8OpLCTITaNyuBkLsTg"

   const app = initializeApp(firebaseConfig);
   const auth = getAuth();
   const db = getFirestore(app);
   //connectFirestoreEmulator(db, 'localhost', 8080);

   try {
      // //const googleUser = await GoogleSignIn().signIn();
      // //const id_token = googleUser.getAuthResponse().id_token

      // const userCredential = await signInWithCustomToken(getAuth(), token);
      // signInWithCredential(auth, credential);

      if (false) {
         //  code: 'auth/operation-not-supported-in-this-environment',
         const provider = new GoogleAuthProvider();
         const credential = await signInWithPopup(auth, provider);
      }
      if (true) {
         // const email = "Claudia.Pilger98@gmail.com";
         // const password = "Sm9k8jgbcbswYBA";
         const email = "simon.pilger@icloud.com";
         const password = "simon96";
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
   }
   catch (error) {
      console.error(error);
      return;
   }
   try {

      const Coll = collection(db, 'cities');
      //const Coll = collection(db, 'bkorder');
      console.log(`collection '${Coll.path}' `);
      //const snap = await getCountFromServer(Coll);
      //console.log(`collection '${Coll.path}' enthält ${snap.data().count} docs`);
      if (true) {
         const docRef = doc(db, "cities", "SF");
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
      // {
      //    const shipMatch = ShipMatch.createnew("karl");
      //    await shipMatch.save();
      // }
      // {
      //    const shipMatch = await ShipMatch.load("1700054908642");
      //    new FbDb().save(shipMatch );
      //    //shipMatch.logBattlefield(2);
      // }
      {
         const shipMatch = await ShipMatch.load("1700054908642");
         shipMatch.logBattlefield(2);
         shipMatch.player1.shoot(3,3);
         shipMatch.logBattlefield(2);
         await shipMatch.save();
      }
      // {
      //    const shipMatch = ShipMatch.createnew("karl");
      //    shipMatch.logBattlefield(2);
      //    //await shipMatch.save();
      //    shipMatch.player1.shoot(1,1);
      //    shipMatch.logBattlefield(2);
      // }
   } catch (error) {
      console.error(`executing ShipMatchTest, error${error}`);
   }
}
//================================================================================

const _ = 0;
console.log(process.env.fbEmail);
// testAuth();
//testFb();
//ShipMatchTest();
