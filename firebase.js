// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// import { initializeApp } from "firebase/app";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// import { collection, addDoc, getDocs } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpFUYyTaiw7vsdoqAC88JryTfcsbXL_FA",
  authDomain: "listfilms-7f2e6.firebaseapp.com",
  projectId: "listfilms-7f2e6",
  storageBucket: "listfilms-7f2e6.firebasestorage.app",
  messagingSenderId: "177826474842",
  appId: "1:177826474842:web:3fc6cd76316b54ca6d2163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// async function addData() {
//   try {
//     const docRef = await addDoc(collection(db, "Todos"), {
//       title: "Задача 3",
//       status: "active",
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error addind document: ", e);
//   }
// }

// async function getData() {
//   const querySnapshot = await getDocs(collection(db, "Todos"));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data().title}`);
//   });
// }

// addData();
// getData();