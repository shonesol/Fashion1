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
// START FASHIONAI
// ==========================

startFashionAI();




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




// Start trends

startTrendUpdater(

window.FashionAI.database

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
// BUTTON CONNECTIONS
// ==========================


document.addEventListener(

"DOMContentLoaded",

()=>{



// VOICE BUTTON

const voiceBtn =
document.getElementById(
"voiceBtn"
);



if(voiceBtn){


voiceBtn.onclick=()=>{


startListening();


};


}






// OUTFIT BUTTON


const outfitBtn =
document.getElementById(
"outfitBtn"
);



if(outfitBtn){


outfitBtn.onclick=async()=>{


const outfit =

await generateOutfit(

window.FashionAI.database,

"Casual"

);




document.getElementById(
"outfitResult"
).innerHTML =


`

<h3>
✨ Your FashionAI Outfit
</h3>


<p>
${outfit.message}
</p>

`;



};


}








// SMART WEATHER OUTFIT


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



});
