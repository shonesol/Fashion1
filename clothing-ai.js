// FashionAI Clothing AI Analyzer

import {
    askGemini
} from "./gemini-ai.js";



export async function analyzeClothing(image){


    const prompt = `

You are FashionAI.

Analyze this clothing image.

Return ONLY valid JSON.

Use exactly this format:

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

Do not add markdown.
Do not explain.

`;



    try{


        const result =
        await askGemini(
            prompt,
            image
        );



        console.log(
            "AI Result:",
            result
        );



        return result;



    }catch(error){


        console.error(
            "Clothing analysis failed:",
            error
        );


        return {

            error:
            error.message

        };


    }


}
