or the response structure is slightly different.

Replace your **entire `clothing-ai.js`** with this:

```javascript
// =====================================
// FashionAI Clothing AI Analyzer
// =====================================


import {
    askGemini
} from "./gemini-ai.js";





export async function analyzeClothing(image){


const prompt = `

You are FashionAI.

Analyze the clothing image.

Return ONLY JSON.
No markdown.
No explanation.

Use this exact format:

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




try{


const response =
await askGemini(
prompt,
image
);



console.log(
"RAW GEMINI RESPONSE:",
response
);





// Get Gemini text

const text =

response
?.candidates
?.[0]
?.content
?.parts
?.[0]
?.text;



if(!text){


return {

error:
"No AI text returned",

raw:
response

};


}





// Remove markdown if Gemini adds it

const cleanText =
text
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();





const result =
JSON.parse(
cleanText
);



return result;




}

catch(error){


console.error(
"AI parsing error:",
error
);



return {


error:
"Invalid AI response",

details:
error.message


};


}



}
