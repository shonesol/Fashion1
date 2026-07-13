// upload.js
// FashionAI Upload Controller


import { analyzeClothing } from "./clothing-ai.js";
import { addClothing } from "./db.js";


console.log(
"🚀 upload.js loaded"
);



function setupUpload(){


const uploadBtn =
document.getElementById(
"uploadBtn"
);


const imageInput =
document.getElementById(
"clothingImage"
);


const result =
document.getElementById(
"result"
);



if(!uploadBtn || !imageInput || !result){

console.error(
"❌ Upload elements missing",
{
uploadBtn,
imageInput,
result
}
);

return;

}



console.log(
"✅ Upload button connected"
);



uploadBtn.onclick =
async()=>{


console.log(
"🔥 Analyze button clicked"
);



const database =
window.FashionAI?.database;



if(!database){


result.innerHTML =
"❌ Database not ready. Please login again.";


console.error(
window.FashionAI
);


return;

}



const file =
imageInput.files[0];



if(!file){


result.innerHTML =
"❌ Please choose an image.";


return;

}



result.innerHTML =
"🤖 FashionAI is analyzing...";



const reader =
new FileReader();



reader.onload =
async()=>{


try{


const ai =
await analyzeClothing(
reader.result
);



console.log(
"🤖 AI RESULT:",
ai
);



const clothing = {


...ai,


image:
reader.result,


name:
ai.type || "Clothing"

};



await addClothing(
database,
clothing
);



result.innerHTML = `

<h3>✅ Clothing Saved</h3>

<p>Type: ${clothing.type || ""}</p>

<p>Category: ${clothing.category || ""}</p>

<p>Color: ${clothing.primaryColor || ""}</p>

<p>Material: ${clothing.material || ""}</p>

`;



window.dispatchEvent(
new Event("clothingAdded")
);



}


catch(error){


console.error(
"❌ UPLOAD ERROR:",
error
);



result.innerHTML =
"❌ " + error.message;


}



};



reader.readAsDataURL(file);



};


}



// Start immediately

setupUpload();
