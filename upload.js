// upload.js
// FashionAI Clothing Upload System (Fixed)


import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
getDatabase
} from "./database-manager.js";

import {
addClothing
} from "./db.js";

import {
analyzeClothing
} from "./clothing-ai.js";



console.log("🔥 upload.js loaded");



let database = null;

let currentUser = null;




document.addEventListener(
"DOMContentLoaded",
()=>{



const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");




if(!uploadBtn){

console.error(
"❌ upload button missing"
);

return;

}





// ==========================
// LOGIN CONNECTION
// ==========================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){

console.log(
"❌ User not logged in"
);

result.innerHTML =
"Please login first";

return;

}



try{


currentUser = user;



database =
await getDatabase(
user.uid
);



console.log(
"✅ Database connected",
database.name
);



}

catch(error){


console.error(
"Database error",
error
);


result.innerHTML =
"❌ Database connection failed";


}



});









// ==========================
// UPLOAD BUTTON
// ==========================


uploadBtn.onclick = async()=>{


try{



if(!database){


alert(
"Database is not ready. Login again."
);


return;


}




const file =
imageInput.files[0];




if(!file){


result.innerHTML =
"❌ Select clothing image";


return;


}






result.innerHTML =
`
<h3>
🤖 FashionAI is analyzing...
</h3>
`;







const reader =
new FileReader();





reader.onload = async()=>{


try{



const image =
reader.result;





console.log(
"📸 Image ready"
);






const ai =
await analyzeClothing(
image
);






console.log(
"🤖 AI RESULT:",
ai
);








const clothing = {


image:image,


name:
ai.type || "Unknown Clothing",



type:
ai.type || "Unknown",



category:
ai.category || "Other",



color:
ai.primaryColor || "Unknown",



secondaryColor:
ai.secondaryColor || "",



material:
ai.material || "Unknown",



texture:
ai.texture || "Unknown",



pattern:
ai.pattern || "Plain",



style:
ai.style || "Casual",



occasion:
ai.occasion || "Casual",



season:
ai.season || "All",



laundryStatus:
"Clean",



timesWorn:0,



favorite:false,



createdAt:
Date.now()

};









await addClothing(

database,

clothing

);








console.log(
"✅ SAVED",
clothing
);






result.innerHTML =
`

<h3>
✅ Clothing Added
</h3>

<p>
👕 ${clothing.name}
</p>

<p>
📂 ${clothing.category}
</p>

<p>
🎨 ${clothing.color}
</p>

`;





window.dispatchEvent(
new Event(
"clothingAdded"
)
);





}

catch(error){


console.error(
"❌ AI/SAVE ERROR:",
error
);


result.innerHTML =
`
<h3>
❌ Failed
</h3>

<p>
${error.message}
</p>
`;



}



};





reader.readAsDataURL(file);



}

catch(error){


console.error(
"UPLOAD ERROR:",
error
);


}



};



});
