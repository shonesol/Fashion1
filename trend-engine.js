// trend-engine.js
// FashionAI Fashion Trend Intelligence


import {
askGemini
}
from "./gemini-ai.js";


import {
savePreference,
getPreference
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

Analyze current fashion trends.

Return ONLY valid JSON.


Format:


{

"colors":[
"Black",
"Beige"
],


"styles":[
"Elegant",
"Streetwear"
],


"materials":[
"Cotton",
"Denim"
],


"popularGarments":[
"Wide leg trousers",
"Oversized jackets"
],


"seasonAdvice":
"Short fashion advice"

}



`;







const response =

await askGemini(

prompt

);






// Remove possible markdown

const cleanJSON =

response
.replace(
/```json/g,
""
)
.replace(
/```/g,
""
)
.trim();







const trends =

JSON.parse(

cleanJSON

);








await savePreference(

database,

"fashionTrends",

{

...trends,


updatedAt:

Date.now()


}

);






console.log(

"🌍 Fashion trends saved",

trends

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

await getPreference(

database,

"fashionTrends"

);







return trends || {


colors:[],


styles:[],


materials:[],


popularGarments:[]


};



}









// ==========================
// MATCH CLOTHING WITH TRENDS
// ==========================


export async function matchTrend(

database,

clothing

){



const trends =

await getFashionTrends(

database

);







const colorMatch =

trends.colors?.some(

color =>

color.toLowerCase()

===

clothing.color
?.toLowerCase()

);







const styleMatch =

trends.styles?.some(

style =>

style.toLowerCase()

===

clothing.style
?.toLowerCase()

);







return {


isTrending:

colorMatch || styleMatch,



reason:

colorMatch

?

"Popular color"

:

styleMatch

?

"Popular style"

:

"Classic wardrobe item"



};



}
