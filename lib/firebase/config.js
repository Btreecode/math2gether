import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBjvxx1A_OsDEHnUuZGdpFKzAfAu6JOpIo",
  authDomain: "math2gether-64d5d.firebaseapp.com",
  projectId: "math2gether-64d5d",
  storageBucket: "math2gether-64d5d.firebasestorage.app",
  messagingSenderId: "96061605580",
  appId: "1:96061605580:web:0505a22549be7b7c846469",
  measurementId: "G-S017BFFRQ8"
};

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const auth = getAuth(fbApp);

export { fbApp, db, auth };


// export default firebaseConfig;
