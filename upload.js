// upload.js
// FashionAI Local Clothing Upload (No Cloud Storage)

import {
analyzeClothing
} from "./clothing-ai.js";

import {
addClothing
} from "./db.js";


let database = null;


// Connect to FashionAI database

window.addEventListener(
"FashionAIReady",
(event)=>{

database = event.detail.database;

console.log(
"✅ Upload database connected"
);

});





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
"Upload button missing"
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
"❌ Select a clothing image first";

return;

}




if(!database){

result.innerHTML =
"❌ Database not ready. Login first.";

return;

}




result.innerHTML =
"📸 Preparing image...";





const reader =
new FileReader();





reader.onload = async()=>{


try{


// Compress image

const compressedImage =
await compressImage(
reader.result
);




result.innerHTML =
"🤖 FashionAI analyzing...";




// Send to Gemini

const analysis =
await analyzeClothing(
compressedImage
);





console.log(
"AI RESULT:",
analysis
);





// Save locally

await addClothing(

database,

{

image: compressedImage,


type:
analysis.type,


category:
analysis.category,


color:
analysis.primaryColor,


primaryColor:
analysis.primaryColor,


secondaryColor:
analysis.secondaryColor,


material:
analysis.material,


texture:
analysis.texture,


pattern:
analysis.pattern,


style:
analysis.style,


occasion:
analysis.occasion,


season:
analysis.season,


name:
analysis.category+" "+analysis.type


}

);






result.innerHTML =

`

<h3>✅ Clothing Saved</h3>

<p>
Category: ${analysis.category}
</p>

<p>
Color: ${analysis.primaryColor}
</p>

<p>
Style: ${analysis.style}
</p>

`;





window.dispatchEvent(
new Event("clothingAdded")
);



}

catch(error){


console.error(
"Upload error:",
error
);



result.innerHTML =

`

<h3>❌ AI ERROR</h3>

<p>
${error.message}
</p>

`;



}



};



reader.readAsDataURL(file);



});


});







// ==========================
// IMAGE COMPRESSION
// ==========================

function compressImage(
image
){

return new Promise(
(resolve)=>{


const img =
new Image();


img.onload = ()=>{


const canvas =
document.createElement(
"canvas"
);



const max =
800;



let width =
img.width;


let height =
img.height;



if(width > height){

if(width > max){

height =
height * max / width;

width =
max;

}

}
else{

if(height > max){

width =
width * max / height;

height =
max;

}

}




canvas.width =
width;

canvas.height =
height;




const ctx =
canvas.getContext("2d");



ctx.drawImage(
img,
0,
0,
width,
height
);



resolve(

canvas.toDataURL(
"image/jpeg",
0.7
)

);



};




img.src =
image;



});


}
