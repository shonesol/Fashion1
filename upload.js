// upload.js IMAGE TEST

import {
analyzeClothing
} from "./clothing-ai.js";


document.addEventListener(
"DOMContentLoaded",
()=>{


const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");



uploadBtn.onclick = ()=>{


const file =
imageInput.files[0];


if(!file){

result.innerHTML =
"❌ No image selected";

return;

}



result.innerHTML =
"📸 Image reading...";



const reader =
new FileReader();



reader.onload = async()=>{


console.log(
"IMAGE READY"
);


result.innerHTML =
"🤖 Sending to AI...";



try{


const ai =
await analyzeClothing(
reader.result
);



console.log(
"AI RESULT:",
ai
);



result.innerHTML =

`
<h3>AI WORKS</h3>

<p>
${JSON.stringify(ai)}
</p>
`;



}

catch(error){


console.error(
error
);


result.innerHTML =

`
❌ AI ERROR

<br>

${error.message}

`;



}



};



reader.readAsDataURL(file);



};


});
