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





let database = null;





// ==========================
// ELEMENTS
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
"❌ Upload button not found"
);

return;

}







// ==========================
// CONNECT USER
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
"Database error:",
error
);


}



});









// ==========================
// BUTTON CLICK
// ==========================


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
"❌ Please select a clothing image";


return;


}






result.innerHTML =
"🤖 FashionAI is analyzing your clothing...";







const reader =
new FileReader();







reader.onload = async()=>{



try{



const image =
reader.result;





console.log(
"📸 Image prepared"
);






const aiResult =

await analyzeClothing(

image

);







console.log(
"🤖 Gemini Result:",
aiResult
);






if(!aiResult){


throw new Error(
"AI returned no result"
);


}








const clothing = {



image:image,



name:

aiResult.type ||

"Unknown Clothing",



type:

aiResult.type ||

"Unknown",




category:

aiResult.category ||

"Other",




color:

aiResult.primaryColor ||

"Unknown",




secondaryColor:

aiResult.secondaryColor ||

"",




material:

aiResult.material ||

"Unknown",




texture:

aiResult.texture ||

"Unknown",




pattern:

aiResult.pattern ||

"Plain",




style:

aiResult.style ||

"Casual",




occasion:

aiResult.occasion ||

"Casual",




season:

aiResult.season ||

"All",




laundryStatus:

"Clean",




timesWorn:

0,




favorite:

false,




lastWashed:

new Date()
.toISOString(),




createdAt:

Date.now()



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

<div class="ai-result">


<h3>
✅ Clothing Added
</h3>


<p>
👕 ${clothing.name}
</p>


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


</div>

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
"❌ AI ERROR:",
error
);



result.innerHTML =

`

<h3>
❌ AI Analysis Failed
</h3>

<p>
${error.message}
</p>

`;



}



};








reader.onerror = ()=>{


result.innerHTML =
"❌ Cannot read image";


};






reader.readAsDataURL(file);





}

catch(error){


console.error(
"Upload Error:",
error
);



result.innerHTML =
"❌ Upload failed";


}



});



});
