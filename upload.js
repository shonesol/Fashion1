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
// LOGIN + DATABASE
// ==========================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


console.log(
"No user logged in"
);


return;


}




database =
await getDatabase(
user.uid
);



console.log(
"✅ Upload Database Connected"
);



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
"Please login first";


return;


}





const file =
imageInput.files[0];




if(!file){


result.innerHTML =
"Select a clothing image";


return;


}






result.innerHTML =
"🤖 AI is analyzing...";






const reader =
new FileReader();






reader.onload = async()=>{



const image =
reader.result;





// AI ANALYSIS


const ai =
await analyzeClothing(
image
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



timesWorn:
0,



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
${clothing.name}
</p>


<p>
Color:
${clothing.color}
</p>


<p>
Material:
${clothing.material}
</p>


<p>
Style:
${clothing.style}
</p>

`;







// Refresh wardrobe


window.dispatchEvent(

new Event(
"clothingAdded"
)

);



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



});
