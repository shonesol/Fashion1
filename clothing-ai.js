// clothing-ai.js
// FashionAI Clothing Vision Analyzer


import {
askGemini
}
from "./gemini-ai.js";




// ==========================
// ANALYZE CLOTHING IMAGE
// ==========================


export async function analyzeClothing(image){


try{


const prompt = `

You are FashionAI, an expert fashion recognition AI.

Analyze the clothing image.

Return ONLY valid JSON.

No markdown.
No explanation.

Format:

{
"type":"",
"category":"",
"primaryColor":"",
"secondaryColor":"",
"material":"",
"texture":"",
"pattern":"",
"style":"",
"occasion":"",
"season":""
}


Category must be one of:

Top
Bottom
Dress
Shoes
Jacket
Accessories
Other


`;







const response = await askGemini(

prompt,

image

);






console.log(
"Gemini Raw Response:",
response
);






if(!response){

throw new Error(
"Gemini returned empty response"
);

}






// Remove markdown if Gemini adds it


const clean = response

.replaceAll(
"```json",
""
)

.replaceAll(
"```",
""
)

.trim();








const match =
clean.match(
/\{[\s\S]*\}/
);





if(!match){


throw new Error(
"AI did not return JSON"
);


}







const data = JSON.parse(

match[0]

);








return {


type:
data.type || "Unknown Clothing",


category:
data.category || "Other",


primaryColor:
data.primaryColor || "Unknown",


secondaryColor:
data.secondaryColor || "",


material:
data.material || "Unknown",


texture:
data.texture || "Unknown",


pattern:
data.pattern || "Plain",


style:
data.style || "Casual",


occasion:
data.occasion || "Casual",


season:
data.season || "All"


};





}

catch(error){



console.error(

"❌ Clothing AI Error:",

error

);



throw error;


}


}
