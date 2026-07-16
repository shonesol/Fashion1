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

// =====================================
// FashionAI Ultimate
// hybrid-ai.js - Part 2
// Advanced Fashion Intelligence
// =====================================



// =====================================
// Color Compatibility Engine
// =====================================

export function matchColors(

primary,

secondary

){


const combinations = {


black:[

"white",

"gold",

"beige",

"red"

],


white:[

"black",

"blue",

"brown",

"gold"

],


blue:[

"white",

"beige",

"grey",

"gold"

],


beige:[

"brown",

"white",

"black"

],


red:[

"black",

"white",

"gold"

],


green:[

"beige",

"brown",

"white"

]


};



return (

combinations[
primary.toLowerCase()
]

||

[]

).includes(

secondary.toLowerCase()

);


}





// =====================================
// Outfit Score
// =====================================

export function calculateOutfitScore(

outfit

){


let score = 50;



if(outfit.colorsMatched){

score += 20;

}


if(outfit.occasionMatched){

score += 20;

}


if(outfit.weatherMatched){

score += 10;

}



return Math.min(
score,
100
);


}





// =====================================
// Rank Outfits
// =====================================

export function rankOutfits(

outfits

){


return outfits.sort(

(a,b)=>

calculateOutfitScore(b)

-

calculateOutfitScore(a)

);


}





// =====================================
// User Preference Learning
// =====================================

export function learnPreference(

history

){


const preferences = {


colors:{},


styles:{},


categories:{}


};



history.forEach(item=>{


if(item.color){


preferences.colors[item.color] =

(preferences.colors[item.color] || 0)+1;


}



if(item.style){


preferences.styles[item.style] =

(preferences.styles[item.style] || 0)+1;


}



if(item.category){


preferences.categories[item.category] =

(preferences.categories[item.category] || 0)+1;


}



});



return preferences;


}





// =====================================
// Personal Style Summary
// =====================================

export function generateStyleProfile(

preferences

){


const favoriteColor =

Object.keys(
preferences.colors
)
.sort(

(a,b)=>

preferences.colors[b]
-

preferences.colors[a]

)[0];



const favoriteStyle =

Object.keys(
preferences.styles
)
.sort(

(a,b)=>

preferences.styles[b]
-

preferences.styles[a]

)[0];



return {


favoriteColor:
favoriteColor || "Not discovered",


favoriteStyle:
favoriteStyle || "Exploring",


message:

`Your style is becoming ${favoriteStyle || "unique"}.`

};


}
