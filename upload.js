// upload.js
// FashionAI Clothing Upload Fix


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



let database = null;



window.addEventListener(
"DOMContentLoaded",
()=>{


const button =
document.getElementById("uploadBtn");


const input =
document.getElementById("clothingImage");


const result =
document.getElementById("result");




if(!button){

console.log("Upload button missing");

return;

}





onAuthStateChanged(
auth,
async(user)=>{


if(!user){

result.innerHTML =
"❌ Login first";

return;

}



database =
await getDatabase(user.uid);


console.log(
"✅ Upload database ready"
);


});







button.onclick = async()=>{


try{


const file =
input.files[0];



if(!file){

result.innerHTML =
"❌ Select an image first";

return;

}





result.innerHTML =
"🤖 Reading image...";




const reader =
new FileReader();





reader.onload = async()=>{


try{


const image =
reader.result;



result.innerHTML =
"🤖 AI analyzing clothing...";





const ai =
await analyzeClothing(image);




console.log(
"AI RESULT:",
ai
);





const clothing = {


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


style:
ai.style || "Casual",


pattern:
ai.pattern || "Plain",


texture:
ai.texture || "Unknown",


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





result.innerHTML =

`
<h3>✅ Added Successfully</h3>

<p>${clothing.name}</p>

<p>Category: ${clothing.category}</p>

<p>Color: ${clothing.color}</p>

`;





window.dispatchEvent(
new Event("clothingAdded")
);





}

catch(error){


console.error(
"UPLOAD ERROR:",
error
);


result.innerHTML =
"❌ "+error.message;



}



};




reader.readAsDataURL(file);



}

catch(error){


console.error(error);


result.innerHTML =
"❌ Upload failed";


}



};



});
