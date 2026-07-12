// upload.js

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
alert("upload.js started");
alert("UPLOAD JS LOADED");
// TEST
alert("UPLOAD JS LOADED");

console.log("🔥 upload.js loaded");
let database = null;


document.addEventListener("DOMContentLoaded",()=>{


const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");

console.log("🔥 upload.js loaded");

alert("UPLOAD JS IS WORKING");



onAuthStateChanged(auth, async(user)=>{


if(!user){

console.log("No user");

return;

}


database =
await getDatabase(user.uid);


console.log(
"Upload database connected"
);


});





if(!uploadBtn){

console.log(
"Upload button missing"
);

return;

}





uploadBtn.addEventListener(
"click",
async()=>{


try{


if(!database){

result.innerHTML =
"❌ Database not ready. Refresh and login again";

return;

}




const file =
imageInput.files[0];



if(!file){

result.innerHTML =
"❌ Choose clothing image first";

return;

}




result.innerHTML =
"🤖 AI is analyzing...";





const reader =
new FileReader();




reader.onload = async()=>{


try{


const image =
reader.result;



const ai =
await analyzeClothing(image);



console.log(
"AI RESULT",
ai
);





const item={


image:image,


name:
ai.type || "Clothing",


type:
ai.type || "Unknown",


category:
ai.category || "Other",


color:
ai.primaryColor || "Unknown",


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


createdAt:Date.now()


};





await addClothing(

database,

item

);





console.log(
"SAVED",
item
);





result.innerHTML=

`
<h3>✅ Clothing Added</h3>

<p>${item.name}</p>

<p>Category: ${item.category}</p>

<p>Color: ${item.color}</p>
`;





window.dispatchEvent(
new Event("clothingAdded")
);



}

catch(e){


console.error(
"ANALYSIS ERROR",
e
);


result.innerHTML =
"❌ "+e.message;


}



};



reader.readAsDataURL(file);



}

catch(error){


console.error(
error
);


result.innerHTML =
"❌ Upload failed";


}



});



});
