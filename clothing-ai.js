// clothing-ai.js
// FashionAI Clothing Vision Analyzer


import {
askGemini
}
from "./gemini-ai.js";





// ==========================
// ANALYZE CLOTHING IMAGE
// ==========================


export async function analyzeClothing(

image

){


try{



const prompt = `


You are FashionAI, a professional fashion stylist and clothing recognition AI.


Analyze the clothing image carefully.


Identify:

- clothing type
- category
- main color
- secondary colors
- material
- texture
- pattern
- fashion style
- suitable occasion
- season


Return ONLY valid JSON.


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



Allowed categories:

Top

Bottom

Dress

Shoes

Jacket

Accessories

Other



Be accurate with colors and garment type.

`;







const result =

await askGemini(

prompt,

image

);







// Remove markdown JSON formatting


const clean =

result

.replace(
/```json/g,
""
)

.replace(
/```/g,
""
)

.trim();







const clothing =

JSON.parse(

clean

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


type:"Unknown",


category:"Other",


primaryColor:"Unknown",


secondaryColor:"",


material:"Unknown",


texture:"Unknown",


pattern:"Unknown",


style:"Casual",


occasion:"Casual",


season:"All"



};



}

}
