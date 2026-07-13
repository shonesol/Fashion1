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



let selectedImage = null;



const imageInput =
document.getElementById("imageInput");


const imagePreview =
document.getElementById("imagePreview");


const saveButton =
document.getElementById("saveClothingBtn");


const analyzeButton =
document.getElementById("analyzeClothingBtn");





// ================================
// IMAGE UPLOAD
// ================================


if(imageInput){


imageInput.addEventListener(
"change",
(event)=>{


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
"Image loaded"
);


};



reader.readAsDataURL(file);



});


}







// ================================
// SAVE CLOTHING
// ================================


if(saveButton){


saveButton.addEventListener(
"click",
async()=>{


if(!selectedImage){


alert(
"Please upload an image first"
);


return;


}




const clothing = {


image:selectedImage,


name:
document.getElementById(
"clothingName"
).value || "Unnamed Item",



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
"✅ Clothing saved"
);



}

catch(error){


console.error(
"Save error:",
error
);



alert(
"Save failed"
);


}



});


}







// ================================
// AI ANALYSIS
// ================================


if(analyzeButton){


analyzeButton.addEventListener(
"click",
async()=>{


console.log(
"Analyze clicked"
);




if(!selectedImage){


alert(
"Please upload clothing image first"
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
"FULL AI RESULT:",
result
);





analyzeButton.innerText =
"🤖 Analyze With AI";






if(result.error){


console.error(
"AI ERROR:",
result
);



alert(

"AI Error:\n\n" +

JSON.stringify(
result,
null,
2
)

);



return;


}






alert(

"✅ Analysis Complete\n\n" +

"Type: " +
(result.type || "Unknown") +

"\nCategory: " +
(result.category || "Unknown") +

"\nColor: " +
(result.primaryColor || "Unknown") +

"\nMaterial: " +
(result.material || "Unknown")

);





}

catch(error){


console.error(
"Analysis crashed:",
error
);



alert(

"Analysis failed:\n\n" +

JSON.stringify(
error,
null,
2
)

);



}



analyzeButton.innerText =
"🤖 Analyze With AI";



});


}
