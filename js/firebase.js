// =====================================
// FashionAI Ultimate
// firebase.js
// Firebase Configuration & Services
// =====================================


import {

initializeApp

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {

getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

getFirestore

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





// =====================================
// Firebase Config
// Replace with your Firebase project config
// =====================================


const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "design-a0e45.firebaseapp.com",
    projectId: "design-a0e45",
    storageBucket: "design-a0e45.appspot.com",
    messagingSenderId: "752963168855",
    appId: "1:752963168855:web:660513e16f91108e489112"
};




// =====================================
// Initialize Firebase
// =====================================


const app =
initializeApp(
firebaseConfig
);





// Authentication

export const auth =
getAuth(
app
);





// Database

export const firestore =
getFirestore(
app
);





// Google Login Provider

const googleProvider =
new GoogleAuthProvider();






// =====================================
// Google Sign In
// =====================================


export async function loginWithGoogle(){


try{


const result =

await signInWithPopup(

auth,

googleProvider

);



return result.user;



}

catch(error){


console.error(

"Login Error",

error

);



throw error;


}


}






// =====================================
// Logout
// =====================================


export async function logoutUser(){


await signOut(
auth
);


}






// =====================================
// Auth Listener
// =====================================


export function watchUser(

callback

){



onAuthStateChanged(

auth,

user=>{


callback(
user
);


}

);



}
