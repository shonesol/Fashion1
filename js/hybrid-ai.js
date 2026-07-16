// =====================================
// FashionAI Ultimate
// hybrid-ai.js
// Hybrid Intelligence Engine
// =====================================


import {

searchFashionKnowledge

}

from "./offline-engine.js";





// =====================================
// AI Endpoint
// =====================================


const AI_ENDPOINT =

"/api/gemini";






// =====================================
// Ask FashionAI
// =====================================


export async function askHybridAI(

question,

image=null

){



// 1. Offline first

const offline =

searchFashionKnowledge(
question
);



if(offline){


return {


answer:
offline,


source:
"offline"


};


}






// 2. Advanced AI

try{


const response =

await fetch(

AI_ENDPOINT,

{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({

prompt:question,

image


})


}

);






const data =

await response.json();





return {


answer:

data.text ||

data.answer ||

"FashionAI could not answer.",


source:
"AI"


};



}

catch(error){


console.warn(

"AI unavailable"

);



return {


answer:

"I can help with outfit choices, colors, wardrobe planning and fashion advice offline.",


source:
"fallback"


};



}



}







// =====================================
// Clothing Analysis
// =====================================


export async function analyzeClothing(

image

){



try{


const response =

await askHybridAI(

"Analyze this clothing image. Return category, color, style and material.",

image

);





if(response.source==="AI"){


return parseClothingResponse(

response.answer

);


}



}

catch(error){



console.log(
"AI analysis failed"
);


}





// Offline fallback

return {


name:
"Uploaded Clothing",


category:
"Top",


color:
"Unknown",


style:
"Casual",


material:
"Unknown"


};


}







// =====================================
// Parse AI Result
// =====================================


function parseClothingResponse(

text

){


return {


name:

extract(
text,
"name"
),



category:

extract(
text,
"category"
),



color:

extract(
text,
"color"
),



style:

extract(
text,
"style"
),



material:

extract(
text,
"material"
)



};


}







function extract(

text,

keyword

){



const match =

text.match(

new RegExp(

keyword+
"[:\\-]\\s*(.*)",

"i"

)

);



return match

?

match[1]

:

"Unknown";


}







// =====================================
// Daily Fashion Tip
// =====================================


export async function getDailyRecommendation(){



const tips=[


"Try combining neutral colors with one statement piece.",


"Rotate your wardrobe to use more of your clothes.",


"Good fit is the foundation of great style.",


"Accessories can upgrade a simple outfit.",


"Build outfits around your favorite pieces."


];



return tips[

Math.floor(

Math.random()

*

tips.length

)

];


}
