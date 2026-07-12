// upload.js TEST

import {
analyzeClothing
} from "./clothing-ai.js";


document.addEventListener("DOMContentLoaded",()=>{


const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");



console.log("UPLOAD SCRIPT STARTED");



if(!uploadBtn){

console.log("❌ Upload button missing");
return;

}



uploadBtn.addEventListener("click", async()=>{


console.log("BUTTON CLICKED");


const file =
imageInput.files[0];


if(!file){

result.innerHTML =
"❌ Please choose an image";

return;

}



result.innerHTML =
"📸 Reading image...";



const reader =
new FileReader();



reader.onload = async()=>{


try{


result.innerHTML =
"🤖 Sending image to AI...";



const ai =
await analyzeClothing(reader.result);



console.log(
"AI RESULT:",
ai
);



result.innerHTML = `

<h3>✅ AI Analysis Complete</h3>

<p>Type: ${ai.type}</p>

<p>Category: ${ai.category}</p>

<p>Color: ${ai.primaryColor}</p>

<p>Style: ${ai.style}</p>

`;



}

catch(error){


console.error(
"UPLOAD ERROR:",
error
);



result.innerHTML = `

<h3>❌ AI ERROR</h3>

<p>${error.message}</p>

`;

}



};



reader.readAsDataURL(file);



});



});
