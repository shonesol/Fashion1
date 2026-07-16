// =====================================
// FashionAI Ultimate
// upload.js
// Clothing Upload System
// =====================================
console.log("Upload JS loaded");

import {

saveClothing

}

from "./database.js";



import {

analyzeClothing

}

from "./hybrid-ai.js";



import {

showToast,
showLoading,
hideLoading

}

from "./app.js";





// =====================================
// Elements
// =====================================


const imageInput =

document.getElementById(
"clothingImage"
);



const cameraInput =

document.getElementById(
"cameraInput"
);



const preview =

document.getElementById(
"imagePreview"
);



const saveButton =

document.getElementById(
"saveClothing"
);





let selectedImage = null;





// =====================================
// Image Selection
// =====================================


function handleImage(event){


const file =

event.target.files[0];



if(!file)

return;



selectedImage = file;



const reader =

new FileReader();



reader.onload = e=>{


preview.src =

e.target.result;


preview.style.display =
"block";



};



reader.readAsDataURL(file);



}





if(imageInput)

imageInput.addEventListener(

"change",

handleImage

);





if(cameraInput)

cameraInput.addEventListener(

"change",

handleImage

);







// =====================================
// Save Clothing
// =====================================


if(saveButton){



saveButton.addEventListener(

"click",

async()=>{



if(!selectedImage){


showToast(
"Choose an image first"
);


return;


}



try{


showLoading(
"Analyzing clothing..."
);





const imageData =

preview.src;





const analysis =

await analyzeClothing(
imageData
);






await saveClothing({


image:imageData,


name:

analysis.name || "Clothing Item",



category:

analysis.category || "Unknown",



color:

analysis.color || "Unknown",



style:

analysis.style || "Casual",



material:

analysis.material || "Unknown"



});






hideLoading();



showToast(

"Added to wardrobe ✨"

);



}

catch(error){


hideLoading();


console.error(
error
);



showToast(
"Upload failed"
);


}




}

);


}
