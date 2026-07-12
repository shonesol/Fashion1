// upload.js
// FashionAI Clothing Upload System


import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
getDatabase
} from "./database-manager.js";


import {
addClothing
} from "./db.js";


import {
analyzeClothing
} from "./clothing-ai.js";



console.log("🔥 upload.js loaded");



let database = null;



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
"❌ Upload button not found"
);

return;

}



if(!imageInput){

console.error(
"❌ Image input not found"
);

return;

}



if(!result){

console.error(
"❌ Result box not found"
);

return;

}





// ==========================
// CONNECT USER DATABASE
// ==========================


onAuthStateChanged(
auth,
async(user)=>{


if(!user){

console.log(
"❌ No user logged in"
);

return;

}



try{


database =
await getDatabase(
user.uid
);



console.log(
"✅ Upload database connected"
);



}

catch(error){


console.error(
"Database connection error:",
error
);


}



});







// ==========================
// UPLOAD BUTTON
// ==========================


uploadBtn.addEventListener(

"click",

async()=>{



try{



if(!database){


result.innerHTML =
"❌ Database not ready. Please login again.";


return;


}




const file =
imageInput.files[0];





if(!file){


result.innerHTML =
"❌ Please select clothing image";


return;


}







result.innerHTML =
`
<div>
🤖 FashionAI is analyzing clothing...
</div>
`;






const reader =
new FileReader();






reader.onload = async()=>{



try{



const image =
reader.result;




console.log(
"📸 Image converted"
);






const aiResult =
await analyzeClothing(
image
);






console.log(
"🤖 AI Result:",
aiResult
);






const clothing = {


image:image,


name:
aiResult.type || "Unknown Clothing",



type:
aiResult.type || "Unknown",



category:
aiResult.category || "Other",



color:
aiResult.primaryColor || "Unknown",



secondaryColor:
aiResult.secondaryColor || "",



material:
aiResult.material || "Unknown",



texture:
aiResult.texture || "Unknown",



pattern:
aiResult.pattern || "Plain",



style:
aiResult.style || "Casual",



occasion:
aiResult.occasion || "Casual",



season:
aiResult.season || "All",



laundryStatus:
"Clean",



timesWorn:0,



favorite:false,



createdAt:Date.now()


};








await addClothing(

database,

clothing

);








console.log(
"✅ Saved:",
clothing
);








result.innerHTML =


`
<h3>✅ Clothing Added Successfully</h3>

<p>👕 ${clothing.name}</p>

<p>
📂 Category:
${clothing.category}
</p>

<p>
🎨 Color:
${clothing.color}
</p>

<p>
🧵 Material:
${clothing.material}
</p>

<p>
✨ Style:
${clothing.style}
</p>
`;






imageInput.value="";






window.dispatchEvent(

new Event(
"clothingAdded"
)

);






}

catch(error){


console.error(
"❌ AI Analysis Error:",
error
);



result.innerHTML =


`
<h3>❌ AI Analysis Failed</h3>

<p>
${error.message}
</p>
`;



}



};






reader.onerror=()=>{


result.innerHTML =
"❌ Cannot read image";


};







reader.readAsDataURL(file);



}

catch(error){


console.error(
"❌ Upload Error:",
error
);


result.innerHTML =
"❌ Upload failed";


}



});



});
