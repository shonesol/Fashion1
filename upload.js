// =====================================
// FashionAI Upload Manager
// Upload + Save + AI Analysis
// =====================================


import {
    addClothing
} from "./db.js";


import {
    analyzeClothing
} from "./clothing-ai.js";




// Selected image

let selectedImage = null;




// Elements

const imageInput =
document.getElementById("imageInput");


const imagePreview =
document.getElementById("imagePreview");


const saveButton =
document.getElementById("saveClothingBtn");


const analyzeButton =
document.getElementById("analyzeClothingBtn");





// =====================================
// Image Selection
// =====================================


if(imageInput){


imageInput.addEventListener(
"change",
(event)=>{


console.log(
"Image selected"
);



const file =
event.target.files[0];



if(!file){

return;

}




const reader =
new FileReader();




reader.onload = ()=>{


selectedImage =
reader.result;



imagePreview.src =
selectedImage;



imagePreview.style.display =
"block";



console.log(
"Image ready"
);



};




reader.readAsDataURL(file);



});


}








// =====================================
// Save Clothing
// =====================================


if(saveButton){


saveButton.addEventListener(
"click",
async()=>{


console.log(
"Save clicked"
);



if(!selectedImage){


alert(
"Please select an image first"
);


return;


}





const clothing = {


image:selectedImage,


name:
document.getElementById(
"clothingName"
).value || "Unnamed Clothing",



category:
document.getElementById(
"category"
).value || "Other",



color:
document.getElementById(
"color"
).value || "Unknown",



season:
document.getElementById(
"season"
).value || "All Season",



occasion:
document.getElementById(
"occasion"
).value || "Casual",



notes:
document.getElementById(
"notes"
).value || "",



created:
new Date().toISOString()


};




try{


await addClothing(
clothing
);



alert(
"✅ Saved to wardrobe"
);



}



catch(error){


console.error(
error
);



alert(
"Save failed"
);



}



});


}









// =====================================
// AI ANALYSIS
// =====================================


if(analyzeButton){


analyzeButton.addEventListener(
"click",
async()=>{


console.log(
"Analyze button clicked"
);





if(!selectedImage){


alert(
"Upload an image first"
);


return;


}





analyzeButton.innerText =
"🤖 Analyzing...";




try{


const result =
await analyzeClothing(
selectedImage
);




console.log(
"AI RESULT:",
result
);





analyzeButton.innerText =
"🤖 Analyze With AI";





if(result.error){


alert(
"AI Error: " +
result.error
);


return;


}





const aiText =

`
Type: ${result.type || ""}

Category: ${result.category || ""}

Primary Color: ${result.primaryColor || ""}

Material: ${result.material || ""}

Style: ${result.style || ""}

Season: ${result.season || ""}

Occasion: ${result.occasion || ""}
`;





alert(
"✅ AI Analysis Complete\n\n"
+
aiText
);



}




catch(error){


console.error(
"Analysis failed:",
error
);



alert(
"AI analysis failed"
);



analyzeButton.innerText =
"🤖 Analyze With AI";


}



});


}
