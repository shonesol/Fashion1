// =====================================
// FashionAI Ultimate
// upload.js
// Clothing Upload System
// =====================================


console.log("✅ Upload JS loaded");



import {

initDatabase,
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



if(!file){

console.log(
"No image selected"
);

return;

}



console.log(
"Selected image:",
file.name
);



selectedImage = file;



const reader =

new FileReader();



reader.onload = (e)=>{


preview.src =

e.target.result;



preview.style.display =
"block";



};



reader.readAsDataURL(file);


}






if(imageInput){


imageInput.addEventListener(

"change",

handleImage

);


}




if(cameraInput){


cameraInput.addEventListener(

"change",

handleImage

);


}







// =====================================
// Save Clothing
// =====================================


if(saveButton){


saveButton.addEventListener(

"click",

async()=>{


try{


// Start database

await initDatabase();





if(!selectedImage){


showToast(
"Choose an image first"
);


return;


}






showLoading(

"Analyzing clothing..."

);






const imageData =

preview.src;






console.log(
"Sending image to AI..."
);






let analysis;



try{


analysis =

await analyzeClothing(

imageData

);



}

catch(error){


console.log(
"AI failed, using fallback"
);



analysis = {


name:
"Clothing Item",


category:
"Top",


color:
"Unknown",


style:
"Casual",


material:
"Unknown"


};


}







console.log(

"Analysis result:",

analysis

);






console.log(

"Saving clothing..."

);






await saveClothing({



image:

imageData,



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






// clear upload

selectedImage = null;

imageInput.value = "";

preview.src = "";







}

catch(error){


console.error(

"UPLOAD ERROR:",

error

);



hideLoading();



showToast(

"Upload failed"

);



}



}

);


}
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
