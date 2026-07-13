// auth-manager.js
// FashionAI Authentication + User Database Manager


import {
    auth
} from "./firebase.js";


import {
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
    getDatabase
} from "./database-manager.js";




// Always create FashionAI object

window.FashionAI = {

    user:null,

    database:null

};






// ==========================
// START FASHIONAI
// ==========================

export function startFashionAI(){


return new Promise((resolve,reject)=>{


console.log(
"🤖 Starting FashionAI..."
);





onAuthStateChanged(

auth,

async(user)=>{


try{



if(!user){


console.log(
"👤 No user logged in"
);



window.FashionAI.user=null;

window.FashionAI.database=null;



resolve(null);


return;


}





console.log(
"✅ User detected:",
user.email
);







const database =

await getDatabase(

user.uid

);








window.FashionAI = {


user:user,


database:database


};







console.log(
"✅ FashionAI Personal Storage Ready"
);






window.dispatchEvent(

new CustomEvent(

"FashionAIReady",

{

detail:{


user:user,


database:database


}

}

)

);






resolve(database);





}

catch(error){


console.error(
"❌ FashionAI startup error:",
error
);



reject(error);



}



}



);



});


}
