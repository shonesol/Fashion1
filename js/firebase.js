// =====================================
// FashionAI Ultimate
// firebase.js
// Firebase Core Setup
// =====================================


// Firebase CDN Imports

import {

    initializeApp

}
from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged

}
from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


import {

    getFirestore

}
from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



// =====================================
// Firebase Configuration
// =====================================


const firebaseConfig = {


    apiKey:

    "YOUR_FIREBASE_API_KEY",


    authDomain:

    "YOUR_PROJECT.firebaseapp.com",


    projectId:

    "YOUR_PROJECT_ID",


    storageBucket:

    "YOUR_PROJECT.appspot.com",


    messagingSenderId:

    "YOUR_SENDER_ID",


    appId:

    "YOUR_APP_ID"


};




// =====================================
// Initialize Firebase
// =====================================


const app =
initializeApp(
    firebaseConfig
);



export const auth =
getAuth(app);



export const db =
getFirestore(app);



const provider =
new GoogleAuthProvider();




// =====================================
// Google Login
// =====================================


export async function loginGoogle(){


    try{


        const result =
        await signInWithPopup(
            auth,
            provider
        );


        const user =
        result.user;



        localStorage.setItem(

            "fashionAI_user",

            JSON.stringify({

                uid:user.uid,

                name:user.displayName,

                email:user.email,

                photo:user.photoURL

            })

        );



        return user;


    }
    catch(error){


        console.error(
            "Login Error:",
            error
        );


        throw error;


    }


}




// =====================================
// Logout
// =====================================


export async function logoutUser(){


    await signOut(auth);


    localStorage.removeItem(
        "fashionAI_user"
    );


}



// =====================================
// Authentication Observer
// =====================================


export function watchUser(callback){


    onAuthStateChanged(

        auth,

        user=>{


            callback(user);


        }

    );


}



// =====================================
// Current User
// =====================================


export function getCurrentUser(){


    return auth.currentUser;


}

// =====================================
// FashionAI Ultimate
// firebase.js - Part 2
// User Management
// =====================================


// =====================================
// Create User Profile
// =====================================

import {

    doc,
    setDoc,
    getDoc,
    deleteDoc

}
from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



import {

    db

}
from "./firebase.js";



// =====================================
// Save User Profile
// =====================================

export async function createUserProfile(user){


    if(!user) return;



    const userRef =
    doc(
        db,
        "users",
        user.uid
    );



    const existing =
    await getDoc(
        userRef
    );



    if(!existing.exists()){


        await setDoc(

            userRef,

            {

                uid:user.uid,

                name:
                user.displayName || "FashionAI User",

                email:
                user.email || "",

                photo:
                user.photoURL || "",


                createdAt:
                Date.now(),


                preferences:{

                    style:"",

                    favoriteColors:[],

                    occasions:[],

                    sizes:{}

                }


            }

        );


    }



    return true;


}




// =====================================
// Get User Profile
// =====================================

export async function getUserProfile(uid){


    if(!uid) return null;



    const ref =
    doc(
        db,
        "users",
        uid
    );



    const snapshot =
    await getDoc(
        ref
    );



    if(snapshot.exists()){


        return snapshot.data();


    }



    return null;


}




// =====================================
// Delete Account Data
// =====================================

export async function deleteAccountData(uid){


    if(!uid) return;



    await deleteDoc(

        doc(
            db,
            "users",
            uid
        )

    );



    localStorage.clear();


}



// =====================================
// Authentication Guard
// =====================================

export function requireLogin(){


    const user =
    localStorage.getItem(
        "fashionAI_user"
    );



    if(!user){


        window.location.href =
        "login.html";


        return false;


    }



    return true;


}
