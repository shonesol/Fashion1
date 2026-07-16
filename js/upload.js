// =====================================
// FashionAI Ultimate
// upload.js - Part 1
// Clothing Upload System
// =====================================


import {

addClothing

}

from "./database.js";


import {

analyzeClothing

}

from "./clothing-ai.js";



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


const preview =
document.getElementById(
"imagePreview"
);


const uploadButton =
document.getElementById(
"saveClothing"
);




let selectedImage =
null;




// =====================================
// Image Selection
// =====================================


if(imageInput){


imageInput.addEventListener(

"change",

(event)=>{


const file =
event.target.files[0];



if(!file)
return;



const reader =
new FileReader();



reader.onload = e=>{


selectedImage =
e.target.result;



if(preview){

preview.src =
selectedImage;


preview.style.display =
"block";

}


};



reader.readAsDataURL(
file
);



});


}




// =====================================
// Save Clothing
// =====================================


if(uploadButton){


uploadButton.addEventListener(

"click",

saveClothingItem

);


}




async function saveClothingItem(){



if(!selectedImage){


showToast(
"Please select an image first"
);


return;


}



try{


showLoading(
"Analyzing clothing..."
);



const analysis =
await analyzeClothing(
selectedImage
);



const clothing = {


image:
selectedImage,


name:
analysis.name ||
"New Clothing",


category:
analysis.category ||
"Other",


color:
analysis.color ||
"",


style:
analysis.style ||
"",


material:
analysis.material ||
"",


favorite:false,


laundryStatus:
"Clean"


};




await addClothing(
clothing
);



hideLoading();



showToast(
"Clothing saved successfully!"
);



resetUpload();



}

catch(error){



console.error(error);



hideLoading();



showToast(
"Upload failed"
);



}



}




// =====================================
// Reset Upload
// =====================================


function resetUpload(){


selectedImage=null;



if(imageInput)

imageInput.value="";



if(preview){

preview.src="";

preview.style.display=
"none";

}


}

// =====================================
// FashionAI Ultimate
// upload.js - Part 2
// Advanced Upload Features
// =====================================



// =====================================
// Camera Support
// =====================================


const cameraInput =
document.getElementById(
"cameraInput"
);



if(cameraInput){


cameraInput.addEventListener(

"change",

event=>{


const file =
event.target.files[0];


if(!file)
return;



loadImageFile(file);



});


}




// =====================================
// Shared Image Loader
// =====================================


function loadImageFile(file){



if(!file.type.startsWith("image/")){


showToast(
"Only image files allowed"
);


return;


}



const reader =
new FileReader();



reader.onload = e=>{


selectedImage =
e.target.result;



if(preview){


preview.src =
selectedImage;


preview.style.display =
"block";


}



};



reader.readAsDataURL(file);



}





// =====================================
// Image Compression
// =====================================


export function compressImage(

image,

maxWidth=900

){


return new Promise(resolve=>{


const img =
new Image();



img.onload=()=>{


const canvas =
document.createElement(
"canvas"
);



const scale =
maxWidth / img.width;



canvas.width =
maxWidth;



canvas.height =
img.height * scale;



const ctx =
canvas.getContext(
"2d"
);



ctx.drawImage(

img,

0,

0,

canvas.width,

canvas.height

);



resolve(

canvas.toDataURL(
"image/jpeg",
0.8
)

);



};



img.src=image;



});

}





// =====================================
// Duplicate Detection
// =====================================


export async function checkDuplicate(

image

){


const {getAllClothes}
=
await import(
"./database.js"
);



const clothes =
await getAllClothes();



return clothes.some(

item=>

item.image === image

);



}





// =====================================
// Multiple Upload Support
// =====================================


export async function uploadMultiple(

files

){



for(
const file of files
){


const reader =
new FileReader();



reader.onload=
async event=>{


await saveClothingItem(
event.target.result
);


};



reader.readAsDataURL(
file
);


}



}




// =====================================
// Drag And Drop
// =====================================


const dropArea =
document.querySelector(
".uploadArea"
);



if(dropArea){


dropArea.addEventListener(

"dragover",

event=>{


event.preventDefault();


dropArea.classList.add(
"active"
);


});


dropArea.addEventListener(

"dragleave",

()=>{


dropArea.classList.remove(
"active"
);


});


dropArea.addEventListener(

"drop",

event=>{


event.preventDefault();



const file =
event.dataTransfer.files[0];



if(file){

loadImageFile(file);

}



});


}
