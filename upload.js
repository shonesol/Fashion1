// upload.js
// FashionAI IMAGE TEST


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





console.log("✅ Upload test loaded");





if(!uploadBtn){

console.log(
"❌ Upload button not found"
);

return;

}





uploadBtn.addEventListener(
"click",
()=>{



const file =
imageInput.files[0];





if(!file){


result.innerHTML =
"❌ No image selected";


return;


}






result.innerHTML =
"📸 Reading image...";






const reader =
new FileReader();





reader.onload = async()=>{



try{



console.log(
"IMAGE READY"
);




result.innerHTML =
"🤖 Sending image to Gemini...";






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

<h3>✅ AI WORKS</h3>

<p><b>Type:</b> ${ai.type}</p>

<p><b>Category:</b> ${ai.category}</p>

<p><b>Color:</b> ${ai.primaryColor}</p>

<p><b>Material:</b> ${ai.material}</p>

<p><b>Style:</b> ${ai.style}</p>

`;





}

catch(error){



console.error(
"AI ERROR:",
error
);





result.innerHTML =

`

<h3>❌ AI ERROR</h3>

<p>${error.message}</p>

`;



}





};






reader.onerror = ()=>{


result.innerHTML =
"❌ Image reading failed";


};





reader.readAsDataURL(file);




});



});
