// app.js
// FashionAI Main Application


import {
startFashionAI
}
from "./auth-manager.js";
import {
startTrendUpdater
}
from "./trend-updater.js";

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

// ==========================
// START FASHIONAI SYSTEM
// ==========================

startFashionAI();


window.addEventListener(
"FashionAIReady",
()=>{


startTrendUpdater(

window.FashionAI.database

);


});

// ==========================
// DATABASE READY
// ==========================


window.addEventListener(
"FashionAIReady",
()=>{


console.log(
"✅ FashionAI is ready"
);



console.log(
"User:",
window.FashionAI.user.email
);



console.log(
"Database:",
window.FashionAI.database.name
);




window.dispatchEvent(

new CustomEvent(
"FashionAIConnected",
{

detail:{

user:
window.FashionAI.user,


database:
window.FashionAI.database


}

}

)

);



});








// ==========================
// VOICE BUTTON CONNECTION
// ==========================


document.addEventListener(
"DOMContentLoaded",
()=>{


const voiceBtn =
document.getElementById(
"voiceBtn"
);



if(voiceBtn){


voiceBtn.addEventListener(
"click",
()=>{


startListening();


}

);


console.log(
"🎙️ Voice button connected"
);


}


});
document
.getElementById("outfitBtn")
?.addEventListener(
"click",
async()=>{


const outfit =
await generateOutfit(

window.FashionAI.database,

"Casual"

);



document.getElementById(
"outfitResult"
).innerHTML=


`

<h3>
Your FashionAI Outfit
</h3>

<p>
${outfit.message}
</p>

`;



});
document
.getElementById("smartOutfitBtn")
?.addEventListener(
"click",
async()=>{


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



});
