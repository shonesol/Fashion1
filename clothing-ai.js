// =====================================
// FashionAI Clothing Analyzer
// =====================================


import {
    askHuggingFace
} from "./huggingface-ai.js";





export async function analyzeClothing(image){



const prompt = `

Analyze this clothing image.

Return:

- clothing type
- category
- colors
- material
- style
- season
- occasion

`;



const result =
await askHuggingFace(
    prompt,
    image
);



console.log(
"Clothing AI Result:",
result
);



return result;



}
