



/// upload.js
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





let database = null;



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






// ==========================
// CONNECT DATABASE
// ==========================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


console.log(
"❌ User not logged in"
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
error
);


}



});









// ==========================
// UPLOAD BUTTON
// ==========================


if(uploadBtn){


uploadBtn.addEventListener(

"click",

async()=>{



try{



if(!database){


result.innerHTML =

"❌ Please login first";


return;


}





const file =

imageInput.files[0];







if(!file){


result.innerHTML =

"❌ Please choose a clothing image";


return;


}






result.innerHTML =

`

<div class="ai-loading">

🤖 FashionAI is analyzing your clothing...

</div>

`;









const reader =

new FileReader();









reader.onload = async()=>{



try{



const image =

reader.result;






// SEND IMAGE TO GEMINI


const ai =

await analyzeClothing(

image

);






console.log(
"AI Clothing:",
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



timesWorn:

0,



favorite:

false,



createdAt:

Date.now()



};









// SAVE TO DATABASE


await addClothing(

database,

clothing

);








result.innerHTML =


`

<h3>
✅ Clothing Added Successfully
</h3>


<p>
👕 ${clothing.name}
</p>


<p>
Category:
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

"AI Error:",

error

);



result.innerHTML =

`

❌ AI analysis failed

<br>

${error.message}

`;



}



};








reader.onerror=()=>{


result.innerHTML=

"❌ Cannot read image";


};







reader.readAsDataURL(file);






}

catch(error){



console.error(

"Upload Error:",

error

);



result.innerHTML=

"❌ Upload failed";


}



});


}
