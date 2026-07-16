// =====================================
// FashionAI Ultimate
// auth-guard.js
// Page Protection
// =====================================


import { watchUser } from "./firebase.js";



export function protectPage(){


watchUser((user)=>{


if(!user){


console.log("No user found. Redirecting to login...");


window.location.replace(
"index.html"
);


}


else{


console.log(
"Protected page access:",
user.email
);


}


});


}
