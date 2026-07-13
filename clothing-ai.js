// =====================================
// FashionAI Clothing AI Analyzer
// Debug Version
// =====================================

import {
    askGemini
} from "./gemini-ai.js";



export async function analyzeClothing(image){


const prompt = `

Analyze this clothing image.

Return ONLY a JSON object.

Example:

{
"type":"shirt",
"category":"top",
"primaryColor":"black",
"secondaryColor":"white",
"material":"cotton",
"style":"casual",
"season":"all",
"occasion":"casual",
"description":"black casual shirt"
}

`;



try{


const response =
await askGemini(
prompt,
image
);



console.log(
"========== GEMINI RAW =========="
);


console.log(
response
);



if(!response.candidates){


return {

error:
"No candidates returned",

fullResponse:
response

};


}



const text =
response
.candidates[0]
.content
.parts[0]
.text;



console.log(
"GEMINI TEXT:",
text
);




return {

raw:text

};



}

catch(error){


console.error(
"Analyzer error:",
error
);



return {

error:
error.message

};


}



}
