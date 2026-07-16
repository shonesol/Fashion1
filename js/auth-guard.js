// =====================================
// FashionAI Ultimate
// auth-guard.js
// Page Protection
// =====================================


import {

watchUser

}

from "./firebase.js";



export function protectPage(){


watchUser(

(user)=>{


if(!user){


window.location.href =
"login.html";


}


}

);


}
