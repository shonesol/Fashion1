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




document.addEventListener(
"DOMContentLoaded",
()=>{


const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");



console.log(
"✅ Upload system loaded"
);





if(!uploadBtn){

console.error(
"❌ Upload button missing"
);

return;

}







// LOGIN CHECK

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
await getDatabase(user.uid);



console.log(
"✅ Database connected"
);



}

catch(error){

console.error(
"Database error:",
error
);


}



});








// BUTTON

uploadBtn.onclick = async()=>{


try{


if(!database){


result.innerHTML =
"❌ Database still loading. Wait a few seconds.";


return;


}






const file =
imageInput.files[0];




if(!file){


result.innerHTML =
"❌ Select an image first";


return;


}






result.innerHTML =
"🤖 FashionAI is analyzing...";






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
await analyzeClothing(image);





console.log(
"🤖 AI RESULT",
ai
);







const clothing = {


image:image,


name:ai.type,


type:ai.type,


category:ai.category,


color:ai.primaryColor,


secondaryColor:ai.secondaryColor,


material:ai.material,


texture:ai.texture,


pattern:ai.pattern,


style:ai.style,


occasion:ai.occasion,


season:ai.season,


laundryStatus:"Clean",


timesWorn:0,


favorite:false,


createdAt:Date.now()


};






await addClothing(

database,

clothing

);






result.innerHTML = `

<h3>
✅ Clothing Saved
</h3>

<p>
👕 ${clothing.name}
</p>

<p>
🎨 ${clothing.color}
</p>

<p>
✨ ${clothing.style}
</p>

`;





window.dispatchEvent(
new Event("clothingAdded")
);



}

catch(error){


console.error(
"Upload AI error:",
error
);


result.innerHTML =
"❌ " + error.message;


}



};





reader.readAsDataURL(file);



}

catch(error){


console.error(
error
);


result.innerHTML =
"❌ Upload failed";


}



};



});
