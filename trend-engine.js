// trend-engine.js
// FashionAI Fashion Trend Intelligence


import {
askGemini
}
from "./gemini-ai.js";


import {
saveMemory,
getMemory
}
from "./db.js";





// ==========================
// UPDATE FASHION TRENDS
// ==========================


export async function updateFashionTrends(
database
){



try{


const prompt = `

You are a global fashion trend expert.

Give current fashion trends.

Return ONLY JSON.

Include:

{
"colors":[
""
],

"styles":[
""
],

"materials":[
""
],

"popularGarments":[
""
],

"seasonAdvice":""

}

`;





const response =
await askGemini(
prompt
);





const trends =
JSON.parse(
response
);






await saveMemory(

database,

{

id:"fashionTrends",

...trends,

updatedAt:
Date.now()

}

);





return trends;



}

catch(error){


console.error(
"Trend update error:",
error
);



return null;


}



}









// ==========================
// GET SAVED TRENDS
// ==========================


export async function getFashionTrends(
database
){



const trends =
await getMemory(

database,

"fashionTrends"

);



return trends || {

colors:[],

styles:[],

materials:[]

};


}









// ==========================
// TREND MATCHING
// ==========================


export async function matchTrend(
database,
clothing
){



const trends =
await getFashionTrends(
database
);





if(
trends.colors?.includes(
clothing.color
)
){


return true;


}





if(
trends.styles?.includes(
clothing.style
)
){


return true;


}




return false;


}
