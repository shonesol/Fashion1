// clothing-ai.js
// FashionAI Clothing Vision Analyzer

import { askGemini } from "./gemini-ai.js";

export async function analyzeClothing(image) {

    try {

        const prompt = `
You are FashionAI.

Analyze the clothing image.

Return ONLY valid JSON.

No markdown.
No explanation.

Use this format:

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

Allowed category:

Top
Bottom
Dress
Shoes
Jacket
Accessories
Other
`;

        const response = await askGemini(prompt, image);

        console.log("🤖 Gemini Response:", response);

        if (!response) {
            throw new Error("Empty AI response.");
        }

        const json = response.match(/\{[\s\S]*\}/);

        if (!json) {
            throw new Error("Gemini did not return valid JSON.");
        }

        const data = JSON.parse(json[0]);

        return {

            name:
                data.type || "Clothing",

            type:
                data.type || "Unknown",

            category:
                data.category || "Other",

            color:
                data.primaryColor || "Unknown",

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
                data.season || "All",

            laundryStatus:
                "Clean",

            timesWorn:
                0,

            favorite:
                false

        };

    }

    catch (error) {

        console.error(
            "❌ Clothing AI Error:",
            error
        );

        throw error;

    }

}
