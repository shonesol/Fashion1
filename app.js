// app.js
// FashionAI Main Application Controller


import { 
startFashionAI 
} from "./auth-manager.js";


import { 
saveOutfitHistory 
} from "./outfit-history.js";


import { 
startTrendUpdater 
} from "./trend-updater.js";


import { 
learnFromWardrobe 
} from "./fashion-memory.js";


import { 
learnUserStyle 
} from "./memory-ai.js";


import { 
startListening 
} from "./voice-assistant.js";


import { 
generateOutfit 
} from "./outfit-generator.js";


import { 
getOutfitAdvice 
} from "./occasion-weather-ai.js";


import { 
analyzeWardrobe 
} from "./wardrobe-intelligence.js";


import {
showAILoading
} from "./ai-loader.js";





console.log(
"🚀 FashionAI app.js loaded"
);





// ==========================
// START FASHIONAI
// ==========================


startFashionAI();


console.log(
"🔐 Authentication started"
);








// ==========================
// WHEN DATABASE IS READY
// ==========================


window.addEventListener(

"FashionAIReady",

async()=>{


try{


const database =

window.FashionAI.database;



console.log(
"✅ FashionAI Database Ready"
);



console.log(
"User:",
window.FashionAI.user.email
);



console.log(
"Database:",
database.name
);






// Learn user preferences


await learnUserStyle(

database

);





// Learn wardrobe


await learnFromWardrobe(

database

);





// Update trends


startTrendUpdater(

database

);







// Send database to other modules


window.dispatchEvent(

new CustomEvent(

"FashionAIConnected",

{

detail:{

database:database,

user:
window.FashionAI.user

}

}

)

);





console.log(
"🧠 FashionAI Intelligence Activated"
);



}

catch(error){


console.error(

"FashionAI startup error:",

error

);


}


});











// ==========================
// PAGE BUTTONS
// ==========================


document.addEventListener(

"DOMContentLoaded",

()=>{





// ==========================
// VOICE BUTTON
// ==========================


const voiceBtn =

document.getElementById(
"voiceBtn"
);



if(voiceBtn){


voiceBtn.onclick=()=>{


startListening();


};


}









// ==========================
// OUTFIT GENERATOR
// ==========================


const outfitBtn =

document.getElementById(
"outfitBtn"
);



if(outfitBtn){



outfitBtn.onclick=async()=>{


try{



if(!window.FashionAI){


alert(
"FashionAI is still loading..."
);


return;


}





const box =

document.getElementById(
"outfitResult"
);





showAILoading(

box,

"✨ Creating your AI outfit..."

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







box.innerHTML =


`

<h3>
✨ FashionAI Outfit
</h3>


<p>
${outfit.message}
</p>

`;




}

catch(error){


console.error(
"Outfit error:",
error
);


}

};


}











// ==========================
// SMART OUTFIT
// ==========================


const smartBtn =

document.getElementById(
"smartOutfitBtn"
);



if(smartBtn){



smartBtn.onclick=async()=>{



try{



const box =

document.getElementById(
"smartOutfitResult"
);




showAILoading(

box,

"🌟 Creating smart recommendation..."

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







box.innerHTML =


`

<h3>
🌟 FashionAI Suggestion
</h3>


<p>
${result.message}
</p>

`;



}

catch(error){


console.error(
"Smart outfit error:",
error
);


}


};


}











// ==========================
// WARDROBE ANALYSIS
// ==========================


const wardrobeBtn =

document.getElementById(
"analyzeWardrobeBtn"
);



if(wardrobeBtn){



wardrobeBtn.onclick=async()=>{


try{


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
${result.style}
</p>


<p>
Favorite Color:
${result.favoriteColor}
</p>

`;



}

catch(error){


console.error(
"Wardrobe analysis error:",
error
);


}



};



}



});
