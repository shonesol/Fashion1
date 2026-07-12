// app.js
// FashionAI Main Application


import { startFashionAI } from "./auth-manager.js";

import { saveOutfitHistory } from "./outfit-history.js";

import { startTrendUpdater } from "./trend-updater.js";

import { learnFromWardrobe } from "./fashion-memory.js";

import { learnUserStyle } from "./memory-ai.js";

import { startListening } from "./voice-assistant.js";

import { generateOutfit } from "./outfit-generator.js";

import { getOutfitAdvice } from "./occasion-weather-ai.js";

import { analyzeWardrobe } from "./wardrobe-intelligence.js";

import { showAILoading } from "./ai-loader.js";



// START SYSTEM

startFashionAI();




// DATABASE READY

window.addEventListener(

"FashionAIReady",

async()=>{


const database =
window.FashionAI.database;



console.log(
"✅ FashionAI Ready"
);



await learnUserStyle(database);



await learnFromWardrobe(database);



startTrendUpdater(database);





window.dispatchEvent(

new CustomEvent(

"FashionAIConnected",

{

detail:{

user:
window.FashionAI.user,


database:
database

}

}

)

);



});







document.addEventListener(

"DOMContentLoaded",

()=>{



// VOICE

const voiceBtn =
document.getElementById(
"voiceBtn"
);


if(voiceBtn){


voiceBtn.onclick=()=>{


startListening();


};


}






// CREATE OUTFIT

const outfitBtn =
document.getElementById(
"outfitBtn"
);



if(outfitBtn){


outfitBtn.onclick=async()=>{


if(!window.FashionAI){

alert(
"FashionAI is loading..."
);

return;

}



const resultBox =
document.getElementById(
"outfitResult"
);



showAILoading(

resultBox,

"Creating your perfect outfit..."

);




const outfit =

await generateOutfit(

window.FashionAI.database,

"Casual"

);



await saveOutfitHistory(

window.FashionAI.database,

outfit

);




resultBox.innerHTML =


`

<h3>
✨ FashionAI Outfit
</h3>


<p>
${outfit.message}
</p>

`;



};



}








// SMART OUTFIT

const smartBtn =
document.getElementById(
"smartOutfitBtn"
);



if(smartBtn){


smartBtn.onclick=async()=>{



const resultBox =
document.getElementById(
"smartOutfitResult"
);



showAILoading(

resultBox,

"Finding the best outfit..."

);





const weather =
document.getElementById(
"weather"
).value;



const occasion =
document.getElementById(
"occasion"
).value;






const result =

await getOutfitAdvice(

window.FashionAI.database,

weather,

occasion

);






resultBox.innerHTML =


`

<h3>
🌟 FashionAI Suggestion
</h3>


<p>
${result.message}
</p>

`;



};



}








// WARDROBE ANALYSIS


const wardrobeAI =
document.getElementById(
"analyzeWardrobeBtn"
);



if(wardrobeAI){


wardrobeAI.onclick=async()=>{


const result =

await analyzeWardrobe(

window.FashionAI.database

);





document.getElementById(

"wardrobeAdvice"

).innerHTML =


`

<h3>
🧠 Wardrobe Intelligence
</h3>


<p>
${result.advice}
</p>


<p>
Style:
${result.style || "Learning..."}

</p>


<p>
Favorite Color:
${result.favoriteColor || "Learning..."}

</p>

`;



};



}



});
