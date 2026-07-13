import {
    askGemini
} from "./gemini-ai.js";


export async function analyzeClothing(image){


const prompt = `

Analyze this clothing image.

Return ONLY JSON.

Format:

{
"type":"",
"category":"",
"primaryColor":"",
"secondaryColor":"",
"material":"",
"style":"",
"season":"",
"occasion":"",
"description":""
}

`;



const response =
await askGemini(
    prompt,
    image
);



console.log(
"Gemini raw response:",
response
);



try{


const text =

response.candidates[0]
.content.parts[0]
.text;



return JSON.parse(text);



}
catch(error){


console.error(
"JSON conversion failed:",
error
);



return {

error:
"Invalid AI response"

};


}



}
