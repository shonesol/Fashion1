// =====================================
// FashionAI Ultimate
// outfit-engine.js - Part 1
// Automatic Outfit Generator
// =====================================


import {

getAllClothes,
saveOutfit

}

from "./database.js";



import {

calculateOutfitScore,
matchColors

}

from "./hybrid-ai.js";




// =====================================
// Generate Outfit
// =====================================

export async function generateOutfit(

options={}

){



const wardrobe =
await getAllClothes();



if(!wardrobe.length){


throw new Error(
"No clothes available"
);


}





const clothes =
filterAvailableClothes(
wardrobe
);



const outfit =
buildCombination(
clothes,
options
);



const scored =
scoreOutfit(
outfit
);



await saveOutfit({

name:
"AI Generated Outfit",

items:
outfit,

score:
scored,

date:
new Date()
.toLocaleDateString()

});



return {


name:
"FashionAI Look",


items:
outfit,


score:
scored,


description:
createDescription(
outfit
)


};



}





// =====================================
// Filter Clothes
// =====================================

function filterAvailableClothes(

clothes

){


return clothes.filter(

item=>

item.laundryStatus !== "Dirty"

);


}





// =====================================
// Build Combination
// =====================================

function buildCombination(

clothes,

options

){


const tops =
clothes.filter(

item=>

item.category==="Top"

);



const bottoms =
clothes.filter(

item=>

item.category==="Bottom"

);



const shoes =
clothes.filter(

item=>

item.category==="Shoes"

);



const result=[];



if(tops.length)

result.push(
randomItem(tops)
);



if(bottoms.length)

result.push(
randomItem(bottoms)
);



if(shoes.length)

result.push(
randomItem(shoes)
);



return result;


}





// =====================================
// Random Selection
// =====================================

function randomItem(array){


return array[

Math.floor(

Math.random()
*
array.length

)

];

}

// =====================================
// FashionAI Ultimate
// outfit-engine.js - Part 2
// Smart Outfit Scoring
// =====================================



// =====================================
// Score Outfit
// =====================================

function scoreOutfit(

outfit

){


let score = 50;



// Color matching

if(outfit.length > 1){


const colors =
outfit.map(
item=>item.color
);



for(let i=0;i<colors.length;i++){


for(let j=i+1;j<colors.length;j++){


if(
matchColors(
colors[i],
colors[j]
)

){

score += 10;

}


}


}


}




// Category balance

const categories =
outfit.map(
item=>item.category
);



if(
categories.includes("Top")
&&
categories.includes("Bottom")
){

score += 15;

}



if(
categories.includes("Shoes")
){

score += 10;

}




return Math.min(
score,
100
);


}





// =====================================
// Weather Matching
// =====================================

export function matchWeather(

outfit,

weather

){



if(!weather)
return true;



const hot =
weather.temperature > 28;



if(hot){


return !outfit.some(

item=>

item.material==="Wool"

);


}



return true;


}





// =====================================
// Occasion Matching
// =====================================

export function matchOccasion(

outfit,

occasion

){


const formalWords=[

"office",

"meeting",

"wedding",

"formal"

];



if(
formalWords.includes(
occasion?.toLowerCase()
)

){


return outfit.some(

item=>

item.style==="Formal"
||
item.style==="Elegant"

);


}



return true;


}





// =====================================
// Outfit Description
// =====================================

function createDescription(

outfit

){


const items =
outfit.map(

item=>

item.name

)
.join(", ");



return

`A balanced outfit featuring ${items}. 
FashionAI selected this combination based on wardrobe compatibility and style balance.`;

}





// =====================================
// Generate Multiple Options
// =====================================

export async function generateOutfitOptions(

count=5

){


const options=[];



for(
let i=0;
i<count;
i++
){


try{


options.push(

await generateOutfit()

);


}
catch{

}



}



return options;


}

// =====================================
// FashionAI Ultimate
// outfit-engine.js - Part 3
// Personalization & Planning
// =====================================


import {

getFavorites

}

from "./database.js";




// =====================================
// Generate Personalized Outfit
// =====================================

export async function generatePersonalizedOutfit(

preferences={}

){


const outfits =
await generateOutfitOptions(10);



return outfits.sort(

(a,b)=>{


return (

calculatePreferenceScore(
b,
preferences
)

-

calculatePreferenceScore(
a,
preferences
)

);


}

)[0];


}





// =====================================
// Preference Score
// =====================================

function calculatePreferenceScore(

outfit,

preferences

){


let score =
outfit.score || 50;



if(
preferences.favoriteColors
){


outfit.items.forEach(item=>{


if(
preferences.favoriteColors.includes(
item.color
)

){

score +=10;

}


});


}




if(
preferences.favoriteStyle
){


outfit.items.forEach(item=>{


if(
item.style ===
preferences.favoriteStyle

){

score +=15;

}


});


}



return score;


}





// =====================================
// Favorite Outfit
// =====================================

export async function createFavoriteOutfit(

outfit

){


const favorites =
await getFavorites();



return {


id:
Date.now(),


name:
"Favorite AI Look",


items:
outfit.items,


created:
new Date()
.toISOString(),


favorite:true


};


}





// =====================================
// Seasonal Outfit Suggestions
// =====================================

export function seasonalRecommendation(

season

){


const recommendations={


summer:

"Choose breathable fabrics, lighter colors and comfortable footwear.",


winter:

"Use layers with jackets, sweaters and warm accessories.",


rainy:

"Pick water-resistant shoes and practical outer layers.",


spring:

"Mix fresh colors with light layers."



};



return (

recommendations[
season.toLowerCase()
]

||

"Choose clothing based on comfort and occasion."

);


}





// =====================================
// Weekly Outfit Planner
// =====================================

export function createWeeklyPlan(){


const days=[

"Monday",

"Tuesday",

"Wednesday",

"Thursday",

"Friday",

"Saturday",

"Sunday"

];



return days.map(day=>({


day,


outfit:null,


planned:false


}));


}
