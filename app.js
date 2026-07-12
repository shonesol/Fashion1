// app.js
// FashionAI Main Controller


import {
startFashionAI
}
from "./auth-manager.js";


import {
generateOutfit
}
from "./outfit-generator.js";


import {
saveOutfitHistory
}
from "./outfit-history.js";


console.log(
"🚀 FashionAI app.js loaded"
);



startFashionAI();





window.addEventListener(
"FashionAIReady",
()=>{

console.log(
"✅ FashionAI ready"
);

}
);







document.addEventListener(
"DOMContentLoaded",
()=>{



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


box.innerHTML =
"🤖 Creating outfit...";



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
outfit.message;



}

catch(error){


console.error(error);


box.innerHTML =
"❌ Outfit failed";


}



};



}



});
