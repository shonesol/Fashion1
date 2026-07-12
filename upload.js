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




// ==========================
// VARIABLES
// ==========================

let database = null;

let uploadBtn = null;
let imageInput = null;
let result = null;




// ==========================
// START AFTER PAGE LOAD
// ==========================

document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"📸 Upload system loaded"
);



uploadBtn =
document.getElementById(
"uploadBtn"
);


imageInput =
document.getElementById(
"clothingImage"
);


result =
document.getElementById(
"result"
);




console.log(
"Button:",
uploadBtn
);





if(!uploadBtn){

console.error(
"❌ uploadBtn not found in HTML"
);

return;

}



connectUser();



uploadBtn.addEventListener(
"click",
uploadClothing
);



});







// ==========================
// CONNECT USER DATABASE
// ==========================


function connectUser(){



onAuthStateChanged(

auth,

async(user)=>{


if(!user){


console.log(
"❌ No logged in user"
);


if(result){

result.innerHTML =
"❌ Please login first";

}


return;

}




try{


database =
await getDatabase(
user.uid
);



console.log(
"✅ Database connected:",
database.name
);



}

catch(error){


console.error(
"Database connection error:",
error
);



}



});


}








// ==========================
// UPLOAD FUNCTION
// ==========================


async function uploadClothing(){


try{


console.log(
"Upload clicked"
);





if(!database){


result.innerHTML =
"❌ Database not ready";


return;


}




const file =
imageInput.files[0];





if(!file){


result.innerHTML =
"❌ Select a clothing image first";


return;


}





result.innerHTML =

`

<div class="ai-loading">

🤖 FashionAI is analyzing...

</div>

`;







const image =
await readImage(file);





console.log(
"Image ready"
);







const ai =

await analyzeClothing(
image
);






console.log(
"AI Result:",
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








result.innerHTML =


`

<h3>
✅ Clothing Saved
</h3>


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
"❌ Upload failed:",
error
);



result.innerHTML =


`

<h3>
❌ Upload Failed
</h3>

<p>
${error.message}
</p>

`;



}



}









// ==========================
// READ IMAGE
// ==========================


function readImage(file){



return new Promise(

(resolve,reject)=>{


const reader =
new FileReader();



reader.onload=()=>{


resolve(
reader.result
);


};



reader.onerror=()=>{


reject(
new Error(
"Image reading failed"
)

);


};



reader.readAsDataURL(file);



}

);



}
