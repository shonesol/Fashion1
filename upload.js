// upload.js
// FashionAI Clothing Upload


import {
addClothing
}
from "./db.js";



import {
analyzeClothing
}
from "./clothing-ai.js";



const uploadButton =
document.getElementById(
"uploadBtn"
);



const imageInput =
document.getElementById(
"clothingImage"
);





uploadButton.onclick=async()=>{


try{


const file =
imageInput.files[0];



if(!file){

alert(
"Select clothing image first"
);

return;

}




const reader =
new FileReader();



reader.onload=async()=>{


const image =
reader.result;



// AI ANALYSIS

const ai =
await analyzeClothing(
image
);




// CREATE CLOTHING OBJECT

const clothing={


image:image,


name:
ai.type,


category:
ai.category,


color:
ai.primaryColor,


secondaryColor:
ai.secondaryColor,


pattern:
ai.pattern,


material:
ai.material,


texture:
ai.texture,


style:
ai.style,


occasion:
ai.occasion,


season:
ai.season,


favorite:false,


laundryStatus:
"Clean",


timesWorn:0


};





const database =
window.FashionAI.database;




await addClothing(

database,

clothing

);





alert(
"✅ Clothing saved"
);





window.dispatchEvent(

new Event(
"clothingAdded"
)

);



};



reader.readAsDataURL(file);



}

catch(error){


console.error(
error
);


alert(
"Upload failed"
);


}


};
