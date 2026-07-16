// =====================================
// FashionAI Ultimate
// auth-manager.js
// User Authentication Manager
// =====================================


import {

loginWithGoogle,
logoutUser,
watchUser

}

from "./firebase.js";





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



updateUserUI(
user
);



saveUserSession(
user
);



}

else{


console.log(
"No user logged in"
);



updateUserUI(
null
);



}


}

);



}






// =====================================
// Login Button
// =====================================


export function setupLoginButton(){



const button =

document.getElementById(
"googleLogin"
);



if(button){


button.addEventListener(

"click",

async()=>{


try{


await loginWithGoogle();



}

catch(error){


alert(
"Login failed"
);



}



}

);


}



}







// =====================================
// Logout Button
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


}

);



}


}







// =====================================
// Update UI
// =====================================


function updateUserUI(

user

){



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

user.displayName ||

"Fashion Lover";



if(photo){


photo.src =

user.photoURL ||

"assets/default-user.png";


}



}

else{


name.textContent =
"Guest";


}




}







// =====================================
// Save Session
// =====================================


function saveUserSession(

user

){


localStorage.setItem(

"fashionai_user",

JSON.stringify({

uid:user.uid,

email:user.email,

name:user.displayName


})

);


}







// =====================================
// Get Current User
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
