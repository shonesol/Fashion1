// app.js
// FashionAI Main Controller


import {
startFashionAI
}
from "./auth-manager.js";


import {
showAILoading
}
from "./ai-loader.js";


import {
generateOutfit
}
from "./outfit-generator.js";


import {
saveOutfitHistory
}
from "./outfit-history.js";


import {
getOutfitAdvice
}
from "./occasion-weather-ai.js";


import {
analyzeWardrobe
}
from "./wardrobe-intelligence.js";



console.log(
"🚀 FashionAI Started"
);



startFashionAI();





window.addEventListener(

"FashionAIReady",

()=>{


console.log(
"✅ FashionAI Connected"
);



}

);







document.addEventListener(

"DOMContentLoaded",

()=>{



console.log(
"📄 Page Loaded"
);






// CREATE OUTFIT


const outfitBtn =
document.getElementById(
"outfitBtn"
);



if(outfitBtn){


outfitBtn.onclick = async()=>{


const box =
document.getElementById(
"outfitResult"
);



showAILoading(
box,
"Creating outfit..."
);



try{


const outfit =

await generateOutfit(

window.FashionAI.database,

"Casual"

);



await saveOutfitHistory(

window.FashionAI.database,

outfit

);



box.innerHTML =

`

<h3>
✨ Your Outfit
</h3>

<p>
${outfit.message}
</p>

`;



}

catch(error){


console.error(
error
);


box.innerHTML =
"❌ Outfit generation failed";


}



};


}









// SMART OUTFIT


const smartBtn =
document.getElementById(
"smartOutfitBtn"
);



if(smartBtn){


smartBtn.onclick = async()=>{


const box =
document.getElementById(
"smartOutfitResult"
);



showAILoading(
box,
"Thinking..."
);



const result =

await getOutfitAdvice(

window.FashionAI.database,

document.getElementById(
"weather"
).value,

document.getElementById(
"occasion"
).value

);



box.innerHTML =

`

<h3>
🌟 Recommendation
</h3>

<p>
${result.message}
</p>

`;



};


}







// WARDROBE AI


const wardrobeBtn =
document.getElementById(
"analyzeWardrobeBtn"
);



if(wardrobeBtn){


wardrobeBtn.onclick = async()=>{


const result =

await analyzeWardrobe(

window.FashionAI.database

);



document.getElementById(
"wardrobeAdvice"
).innerHTML =

`

<h3>
🧠 AI Analysis
</h3>

<p>
${result.advice}
</p>

`;



};


}



});
