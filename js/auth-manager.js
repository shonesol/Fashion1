// =====================================
// FashionAI Ultimate
// auth-manager.js
// Email & Password Authentication
// =====================================


import {

auth,
logoutUser,
watchUser

}

from "./firebase.js";



import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";






// =====================================
// Initialize Authentication
// =====================================

export function initAuth(){


watchUser(

user=>{


if(user){


console.log(
"✅ User logged in:",
user.email
);



updateUserUI(user);



saveUserSession(user);



}

else{


console.log(
"No user logged in"
);



updateUserUI(null);



}


}

);


}







// =====================================
// Email Login + Signup
// =====================================


export function setupEmailAuth(){



const email =

document.getElementById(
"email"
);



const password =

document.getElementById(
"password"
);



const signupButton =

document.getElementById(
"signupBtn"
);



const loginButton =

document.getElementById(
"loginBtn"
);



const status =

document.getElementById(
"loginStatus"
);






// CREATE ACCOUNT

if(signupButton){


signupButton.addEventListener(

"click",

async()=>{


try{


const result =

await createUserWithEmailAndPassword(

auth,

email.value,

password.value

);



status.textContent =
"Account created successfully ✅";



saveUserSession(
result.user
);



window.location.href =
"dashboard.html";



}

catch(error){


status.textContent =
error.message;


}



}

);


}







// LOGIN

if(loginButton){


loginButton.addEventListener(

"click",

async()=>{


try{


const result =

await signInWithEmailAndPassword(

auth,

email.value,

password.value

);



status.textContent =
"Login successful ✅";



saveUserSession(
result.user
);



window.location.href =
"dashboard.html";



}

catch(error){


status.textContent =
error.message;


}



}

);


}


}









// =====================================
// Logout
// =====================================

export function setupLogoutButton(){


const button =

document.getElementById(
"logoutButton"
);



if(button){


button.addEventListener(

"click",

async()=>{


await logoutUser();


localStorage.removeItem(
"fashionai_user"
);



window.location.href =
"index.html";


}

);


}


}







// =====================================
// Update UI
// =====================================

function updateUserUI(user){



const name =

document.getElementById(
"userName"
);



const photo =

document.getElementById(
"userPhoto"
);




if(!name)
return;



if(user){


name.textContent =

user.email;



if(photo){


photo.src =

"assets/default-user.png";


}



}

else{


name.textContent =
"Guest";


}


}







// =====================================
// Save User Session
// =====================================

function saveUserSession(user){


localStorage.setItem(

"fashionai_user",

JSON.stringify({

uid:user.uid,

email:user.email


})

);


}







// =====================================
// Get Saved User
// =====================================

export function getSavedUser(){


const user =

localStorage.getItem(

"fashionai_user"

);



return user

?

JSON.parse(user)

:

null;


}
