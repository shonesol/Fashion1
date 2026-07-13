// app.js
// FashionAI Main Controller


import {
    startFashionAI
} from "./auth-manager.js";


import {
    startDatabase
} from "./database-manager.js";


import {
    generateOutfit
} from "./outfit-generator.js";


import {
    saveOutfitHistory
} from "./outfit-history.js";



console.log(
"🚀 FashionAI app.js loaded"
);



// ==========================
// INITIALIZE FASHIONAI
// ==========================

async function initFashionAI(){

try{


const database =
await startDatabase();



await startFashionAI();



window.FashionAI =
window.FashionAI || {};



window.FashionAI.database =
database;



console.log(
"✅ Database connected",
database
);



window.dispatchEvent(

new CustomEvent(
"FashionAIReady",
{
detail:{
database
}
}

)

);



console.log(
"✅ FashionAI ready"
);



}

catch(error){

console.error(
"❌ FashionAI startup failed:",
error
);

}

}



initFashionAI();




// ==========================
// OUTFIT BUTTON
// ==========================


function setupOutfitButton(){


const outfitBtn =
document.getElementById(
"outfitBtn"
);



const box =
document.getElementById(
"outfitResult"
);



if(!outfitBtn){

console.error(
"❌ outfitBtn missing"
);

return;

}



console.log(
"✅ Outfit button connected"
);



outfitBtn.onclick =
async()=>{


try{


if(box){

box.innerHTML =
"🤖 Creating outfit...";

}



const database =
window.FashionAI?.database;



if(!database){

throw new Error(
"Database not ready"
);

}



const outfit =
await generateOutfit(
database,
"Casual"
);



await saveOutfitHistory(
database,
outfit
);



if(box){

box.innerHTML =
outfit.message ||
JSON.stringify(outfit);

}



}

catch(error){


console.error(
"❌ Outfit error:",
error
);



if(box){

box.innerHTML =
"❌ " + error.message;

}


}


};


}



// Run immediately

setupOutfitButton();
