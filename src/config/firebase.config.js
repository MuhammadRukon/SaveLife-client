import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};
console.log(VITE_APIKEY);
console.log(VITE_AUTHDOMAIN);
console.log(VITE_PROJECTID);
console.log(VITE_STORAGEBUCKET);
console.log(VITE_MESSAGINGSENDERID);
console.log(VITE_APPID);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
