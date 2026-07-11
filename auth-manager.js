// auth-manager.js


import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
getDatabase
}
from "./database-manager.js";




export function startFashionAI(){



onAuthStateChanged(
auth,
async(user)=>{


if(!user){


console.log(
"No user logged in"
);


return;


}



const database =
await getDatabase(
user.uid
);



window.FashionAI = {


user:user,

database:database


};



console.log(
"FashionAI Ready"
);



window.dispatchEvent(

new Event(
"FashionAIReady"
)

);



});


}
