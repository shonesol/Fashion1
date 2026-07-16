// =====================================
// FashionAI Ultimate
// hybrid-ai.js
// =====================================

import { fashionFallback } from "./offline-engine.js";

const AI_ENDPOINT = "/api/gemini";

// =====================================
// Ask Hybrid AI
// =====================================

export async function askHybridAI(question, image = null) {

    // Offline first
    const offline = fashionFallback(question);

    if (offline) {
        return {
            answer: offline,
            source: "offline"
        };
    }

    // Online AI
    try {

        const response = await fetch(AI_ENDPOINT, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: question,
                image
            })

        });

        if (!response.ok) {
            throw new Error("Gemini request failed");
        }

        const data = await response.json();

        return {

            answer:
                data.text ||
                data.answer ||
                "No response.",

            source: "AI"

        };

    } catch (error) {

        console.log("AI unavailable", error);

        return {

            answer:
                "FashionAI is running in offline mode.",

            source: "fallback"

        };

    }

}

// =====================================
// Analyze Clothing
// =====================================

export async function analyzeClothing(image) {

    try {

        const result = await askHybridAI(

            "Analyze this clothing image. Return Name, Category, Color, Style and Material.",

            image

        );

        if (result.source === "AI") {

            return parseResponse(result.answer);

        }

    } catch (error) {

        console.log(error);

    }

    // Offline fallback

    return {

        name: "Clothing Item",

        category: "Top",

        color: "Unknown",

        style: "Casual",

        material: "Unknown"

    };

}

// =====================================
// Parse Gemini Response
// =====================================

function parseResponse(text) {

    return {

        name: getValue(text, "name"),

        category: getValue(text, "category"),

        color: getValue(text, "color"),

        style: getValue(text, "style"),

        material: getValue(text, "material")

    };

}

function getValue(text, key) {

    const match = text.match(
        new RegExp(key + "\\s*[:\\-]\\s*(.+)", "i")
    );

    return match ? match[1].trim() : "Unknown";

}

// =====================================
// Daily Tip
// =====================================

export function getDailyRecommendation() {

    const tips = [

        "Wear neutral colours for versatility.",

        "Layer your outfit for a premium look.",

        "Keep your shoes clean.",

        "Accessories complete an outfit.",

        "Wear clothes that fit well."

    ];

    return tips[
        Math.floor(Math.random() * tips.length)
    ];

}
