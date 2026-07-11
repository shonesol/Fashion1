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
"✅ FashionAI Upload Database Connected"
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
// UPLOAD CLOTHING
// ==========================


uploadBtn?.addEventListener(

"click",

async()=>{


try{



if(!database){


result.innerHTML =
"❌ Login required";


return;


}






const file =

imageInput.files[0];







if(!file){


result.innerHTML =
"❌ Select clothing image";


return;


}







result.innerHTML =

"🤖 FashionAI is analyzing clothing...";







const reader =

new FileReader();







reader.onload = async()=>{



try{



const image =

reader.result;






const ai =

await analyzeClothing(

image

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




lastWashed:

new Date().toISOString(),




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
🎨 Color: ${clothing.color}
</p>


<p>
🧵 Material: ${clothing.material}
</p>


<p>
✨ Style: ${clothing.style}
</p>


<p>
🧺 Status: Clean
</p>

`;








imageInput.value = "";








window.dispatchEvent(

new Event(

"clothingAdded"

)

);



}

catch(error){



console.error(

"AI upload error:",

error

);



result.innerHTML =

"❌ AI analysis failed";



}



};







reader.onerror = ()=>{


result.innerHTML =

"❌ Image reading failed";


};







reader.readAsDataURL(file);





}

catch(error){



console.error(

"Upload error:",
error

);



result.innerHTML =

"❌ Upload failed";



}



});
