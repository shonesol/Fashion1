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

You are FashionAI, a professional fashion recognition AI.

Analyze this clothing image.

Return ONLY JSON.
Do not add explanations.
Do not use markdown.

Use this exact format:

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


Categories allowed:

Top
Bottom
Dress
Shoes
Jacket
Accessories
Other


Be accurate.

`;





const result = await askGemini(

prompt,

image

);





console.log(
"Gemini Vision Response:",
result
);






// Extract JSON safely

const jsonMatch = result.match(
/\{[\s\S]*\}/
);





if(!jsonMatch){


throw new Error(
"No JSON found"
);


}





const clothing = JSON.parse(

jsonMatch[0]

);








return {


type:
clothing.type || "Unknown",



category:
clothing.category || "Other",



primaryColor:
clothing.primaryColor || "Unknown",



secondaryColor:
clothing.secondaryColor || "",



material:
clothing.material || "Unknown",



texture:
clothing.texture || "Unknown",



pattern:
clothing.pattern || "Plain",



style:
clothing.style || "Casual",



occasion:
clothing.occasion || "Casual",



season:
clothing.season || "All"



};




}

catch(error){



console.error(

"FashionAI Vision Error:",

error

);




return {


type:"Unknown Clothing",


category:"Other",


primaryColor:"Unknown",


secondaryColor:"",


material:"Unknown",


texture:"Unknown",


pattern:"Plain",


style:"Casual",


occasion:"Casual",


season:"All"


};


}



}
