// app.js
// FashionAI Main Application


import {
startFashionAI
}
from "./auth-manager.js";
import {

saveOutfitHistory

}

from "./outfit-history.js";

import {
startTrendUpdater
}
from "./trend-updater.js";


import {
learnFromWardrobe
}
from "./fashion-memory.js";


import {
learnUserStyle
}
from "./memory-ai.js";


import {
startListening
}
from "./voice-assistant.js";


import {
generateOutfit
}
from "./outfit-generator.js";


import {
getOutfitAdvice
}
from "./occasion-weather-ai.js";


import {
analyzeWardrobe
}
from "./wardrobe-intelligence.js";




// ==========================
// START SYSTEM
// ==========================


startFashionAI();









// ==========================
// DATABASE READY
// ==========================


window.addEventListener(

"FashionAIReady",

async()=>{


const database =

window.FashionAI.database;



console.log(
"✅ FashionAI Ready"
);



console.log(
"User:",
window.FashionAI.user.email
);



console.log(
"Database:",
database.name
);





// Learn user style

await learnUserStyle(

database

);




// Learn wardrobe

await learnFromWardrobe(

database

);




// Update fashion trends

startTrendUpdater(

database

);







window.dispatchEvent(

new CustomEvent(

"FashionAIConnected",

{

detail:{


user:
window.FashionAI.user,


database:database


}


}

)

);



}

);









// ==========================
// BUTTONS
// ==========================


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

return;

}



const outfit =

await generateOutfit(

window.FashionAI.database,

"Casual"

);


await saveOutfitHistory(

window.FashionAI.database,

outfit

);



document.getElementById(

"outfitResult"

).innerHTML =


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







document.getElementById(

"smartOutfitResult"

).innerHTML =


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
