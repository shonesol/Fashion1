// clothing-ai.js
// FashionAI Clothing Vision


import {
askGemini
}
from "./gemini-ai.js";





export async function analyzeClothing(
image
){



const prompt = `

You are a professional fashion expert.

Analyze this clothing image.

Return ONLY JSON.

Include:

type,
category,
primaryColor,
secondaryColor,
material,
texture,
pattern,
style,
occasion,
season

Example:

{
"type":"Denim Jacket",
"category":"Jacket",
"primaryColor":"Blue",
"secondaryColor":"Black",
"material":"Denim",
"texture":"Rough",
"pattern":"Plain",
"style":"Streetwear",
"occasion":"Casual",
"season":"All"
}

`;





const result =
await askGemini(
prompt,
image
);





try{


return JSON.parse(
result
);


}

catch{


console.log(
"AI response:",
result
);



return {


type:"Unknown",

category:"Other",

primaryColor:"Unknown",

material:"Unknown",

texture:"Unknown",

style:"Casual"


};


}


}
