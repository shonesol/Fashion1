// =====================================
// FashionAI Ultimate
// hybrid-ai.js - Part 1
// Hybrid Intelligence Engine
// =====================================


import {

askFashionAI

}
from "./gemini-ai.js";



import {

fashionFallback

}
from "./offline-engine.js";




// =====================================
// Main AI Router
// =====================================


export async function askHybridAI(

question

){


const cleanQuestion =
question
.toLowerCase();



// Check offline knowledge first


const offlineAnswer =
fashionFallback(
cleanQuestion
);



if(offlineAnswer){


return {


source:
"offline",


answer:
offlineAnswer


};


}





// Use Gemini for advanced questions


const aiAnswer =
await askFashionAI(

question

);



if(aiAnswer){


return {


source:
"gemini",


answer:
aiAnswer


};


}





return {


source:
"offline",


answer:
"I recommend choosing an outfit that matches your confidence and occasion."


};


}





// =====================================
// Daily Recommendation
// =====================================


export async function getDailyRecommendation(){


const hour =
new Date()
.getHours();



if(hour < 12){


return

"Start your day with a clean, comfortable outfit and a confident style.";

}



if(hour < 18){


return

"Try adding a color accent to your outfit for a fresh daytime look.";

}



return

"Evening style tip: choose elegant layers and comfortable footwear.";

}





// =====================================
// Outfit Question Handler
// =====================================

export async function styleQuestion(

occasion,

weather,

clothes

){



const question =

`
Create an outfit.

Occasion:
${occasion}

Weather:
${weather}

Available clothes:
${JSON.stringify(clothes)}

`;



return await askHybridAI(
question
);


}
