instead of pure JSON. Then `JSON.parse()` fails and upload stops.


Replace your upload with this improved version:


```javascript
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
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const result =
document.getElementById("result");





// ==========================
// AUTH CONNECTION
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
await getDatabase(user.uid);


console.log(
"✅ Upload database ready"
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
// UPLOAD
// ==========================


uploadBtn?.addEventListener(

"click",

async()=>{


try{


if(!database){

result.innerHTML =
"❌ Wait for login to finish";

return;

}





const file =
imageInput.files[0];




if(!file){


result.innerHTML =
"❌ Choose a clothing photo";


return;


}





result.innerHTML =
`
<h3>
🤖 FashionAI is thinking...
</h3>
`;







const reader =
new FileReader();





reader.onload = async()=>{


try{


const image =
reader.result;



console.log(
"Image ready"
);





const ai =
await analyzeClothing(image);



console.log(
"Gemini:",
ai
);






const clothing = {


image:image,


name:
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


createdAt:Date.now()


};






await addClothing(

database,

clothing

);






result.innerHTML =


`

<h3>
✅ Added To Wardrobe
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

new Event(
"clothingAdded"
)

);






}

catch(error){


console.error(
error
);


result.innerHTML =
`
❌ AI failed:
${error.message}
`;



}



};





reader.readAsDataURL(file);





}

catch(error){


console.error(
"Upload error",
error
);


}


});
