// profile.js
// FashionAI User Profile


import {

auth

}

from "./firebase.js";



import {

signOut,

onAuthStateChanged

}

from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";







const emailBox =

document.getElementById(
"userEmail"
);








// SHOW USER


onAuthStateChanged(

auth,

(user)=>{


if(user){


emailBox.innerHTML =

"Logged in as: " + user.email;


}

else{


window.location.href="login.html";


}


});









// LOGOUT


document

.getElementById("logoutBtn")

?.addEventListener(

"click",

async()=>{


await signOut(auth);



window.location.href="login.html";


}

);
