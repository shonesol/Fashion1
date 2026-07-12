// upload.js
// FashionAI Clothing Upload System


import { auth } from "./firebase.js";


import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
getDatabase
}
from "./database-manager.js";


import {
analyzeClothing
}
from "./clothing-ai.js";


import {
addClothing
}
from "./db.js";


import {
showAILoading,
showAIError,
showAISuccess
}
from "./ai-loader.js";





let database = null;



let uploadReady = false;






// ==========================
// GET ELEMENTS AFTER PAGE LOAD
// ==========================


document.addEventListener(
"DOMContentLoaded",
()=>{


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






if(!uploadBtn){

console.error(
"❌ uploadBtn not found"
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
"❌ No logged in user"
);


return;

}



try{


database =
await getDatabase(
user.uid
);



uploadReady = true;



console.log(
"✅ Upload system ready"
);



}

catch(error){


console.error(
"Database error:",
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



if(!uploadReady || !database){


showAIError(
result,
"Please wait. Database is loading..."
);


return;


}







const file =
imageInput.files[0];







if(!file){


showAIError(
result,
"Please select a clothing image"
);


return;


}






showAILoading(

result,

"FashionAI is analyzing your clothing..."

);







const reader =
new FileReader();








reader.onload = async()=>{


try{



const image =
reader.result;






console.log(
"📸 Image ready"
);








const ai =
await analyzeClothing(
image
);







console.log(
"🤖 AI RESULT:",
ai
);







const clothing = {


image:image,


name:
ai.type || "Unknown Clothing",



type:
ai.type || "Unknown",



category:
ai.category || "Other",



color:
ai.primaryColor || "Unknown",



secondaryColor:
ai.secondaryColor || "",



material:
ai.material || "Unknown",



texture:
ai.texture || "Unknown",



pattern:
ai.pattern || "Plain",



style:
ai.style || "Casual",



occasion:
ai.occasion || "Casual",



season:
ai.season || "All",



laundryStatus:
"Clean",



timesWorn:0,



favorite:false,



createdAt:
Date.now()


};







await addClothing(

database,

clothing

);







showAISuccess(

result,

"Clothing added successfully"

);







result.innerHTML += `


<p>
👕 ${clothing.name}
</p>


<p>
📂 ${clothing.category}
</p>


<p>
🎨 ${clothing.color}
</p>


<p>
✨ ${clothing.style}
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
"❌ Upload AI error:",
error
);



showAIError(

result,

error.message

);



}



};









reader.onerror=()=>{


showAIError(

result,

"Image reading failed"

);


};







reader.readAsDataURL(file);






}

catch(error){



console.error(
"Upload error:",
error
);



showAIError(

result,

"Upload failed"

);



}



});



});
