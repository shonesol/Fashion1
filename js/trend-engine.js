// =====================================
// FashionAI Ultimate
// trend-engine.js - Part 1
// Fashion Trend Intelligence
// =====================================


import {

getAllClothes

}

from "./database.js";





// =====================================
// Current Trends
// =====================================


const fashionTrends = {


minimalism:{

name:
"Minimal Luxury",

colors:[

"Beige",

"Black",

"White",

"Gold"

],


styles:[

"Elegant",

"Minimal"

]


},




streetwear:{

name:
"Modern Streetwear",

colors:[

"Black",

"Grey",

"Blue"

],


styles:[

"Streetwear",

"Casual"

]


},




classic:{

name:
"Classic Style",

colors:[

"Navy",

"White",

"Brown"

],


styles:[

"Formal",

"Smart Casual"

]


},




earth:{

name:
"Earth Tones",

colors:[

"Brown",

"Green",

"Beige"

],


styles:[

"Natural",

"Casual"

]


}



};





// =====================================
// Get Trends
// =====================================

export function getTrends(){


return fashionTrends;


}





// =====================================
// Match Wardrobe To Trends
// =====================================

export async function matchWardrobeTrends(){



const clothes =
await getAllClothes();



const matches=[];



clothes.forEach(item=>{


Object.values(
fashionTrends
)
.forEach(trend=>{


if(

trend.colors.includes(
item.color

)

||

trend.styles.includes(
item.style

)

){


matches.push({

item,

trend:
trend.name

});


}



});


});



return matches;


}





// =====================================
// Trend Recommendation
// =====================================

export async function recommendTrend(){



const matches =
await matchWardrobeTrends();



if(!matches.length){


return

"Try adding versatile neutral pieces to follow current trends.";


}



return

`Your ${matches[0].item.name} matches the ${matches[0].trend} trend.`;

}

// =====================================
// FashionAI Ultimate
// trend-engine.js - Part 2
// Advanced Trend System
// =====================================


import {

getAllClothes

}

from "./database.js";





// =====================================
// Trend History
// =====================================


let trendHistory = [];





// =====================================
// Update Weekly Trends
// =====================================

export function updateWeeklyTrends(){



const updates=[


{

name:
"Clean Girl Aesthetic",

colors:[
"White",
"Beige",
"Gold"
],

style:
"Minimal"


},


{

name:
"Modern Office Wear",

colors:[
"Navy",
"Black",
"Grey"
],

style:
"Formal"


},


{

name:
"Relaxed Street Style",

colors:[
"Black",
"Blue",
"Grey"
],

style:
"Streetwear"


}


];



const selected =

updates[

Math.floor(
Math.random()
*
updates.length
)

];



trendHistory.push({

...selected,

date:

new Date()
.toISOString()

});



return selected;


}





// =====================================
// Get Trend History
// =====================================

export function getTrendHistory(){


return trendHistory;


}





// =====================================
// Personal Trend Score
// =====================================

export async function calculateTrendScore(){


const wardrobe =
await getAllClothes();



let score = 0;



wardrobe.forEach(item=>{


Object.values(
fashionTrends
)
.forEach(trend=>{


if(

trend.colors.includes(
item.color

)

){


score +=5;


}



if(

trend.styles.includes(
item.style

)

){


score +=5;


}



});


});



return Math.min(
score,
100
);


}





// =====================================
// Trend Summary
// =====================================

export async function getTrendSummary(){



const score =
await calculateTrendScore();



return {


score,


message:

score > 70

?

"Your wardrobe is very trend aligned."

:

"Add a few modern pieces to refresh your style."


};


}
