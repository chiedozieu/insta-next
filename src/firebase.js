// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-3846a.firebaseapp.com",
  projectId: "insta-next-3846a",
  storageBucket: "insta-next-3846a.appspot.com",
  messagingSenderId: "833757038972",
  appId: "1:833757038972:web:67c763c76c9503e3867cf9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Storage rule

// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read; 
//       allow write if 
//       request.resource.size < 2 * 1024 * 1024 && 
//       request.resource.contentType.matches('image/.*');
//     }
//   }
// }