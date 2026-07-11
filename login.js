// login.js
// FashionAI Authentication


import {

auth

}

from "./firebase.js";



import {

signInWithEmailAndPassword,

createUserWithEmailAndPassword

}

from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";







const email =

document.getElementById("email");



const password =

document.getElementById("password");



const message =

document.getElementById("message");







// LOGIN


document
.getElementById("loginBtn")
.onclick = async()=>{


try{


await signInWithEmailAndPassword(

auth,

email.value,

password.value

);



message.innerHTML =
"✅ Login successful";



window.location.href =
"index.html";



}

catch(error){


message.innerHTML =
error.message;


}



};









// CREATE ACCOUNT


document
.getElementById("signupBtn")
.onclick = async()=>{


try{


await createUserWithEmailAndPassword(

auth,

email.value,

password.value

);



message.innerHTML =
"✅ Account created";



window.location.href =
"index.html";



}

catch(error){


message.innerHTML =
error.message;


}



};
