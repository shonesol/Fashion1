// upload.js
// FashionAI Upload Controller

import { analyzeClothing } from "./clothing-ai.js";
import { addClothing } from "./db.js";

console.log("🚀 upload.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn =
        document.getElementById("uploadBtn");

    const imageInput =
        document.getElementById("clothingImage");

    const result =
        document.getElementById("result");

    if (!uploadBtn || !imageInput || !result) {

        console.error("Upload elements missing");

        return;

    }

    uploadBtn.addEventListener("click", async () => {

        if (!window.FashionAI?.database) {

            result.innerHTML =
                "❌ Database not ready";

            return;

        }

        const file = imageInput.files[0];

        if (!file) {

            result.innerHTML =
                "❌ Please choose an image.";

            return;

        }

        result.innerHTML =
            "📸 Reading image...";

        const reader = new FileReader();

        reader.onload = async () => {

            try {

                result.innerHTML =
                    "🤖 FashionAI is analyzing...";

                const ai =
                    await analyzeClothing(
                        reader.result
                    );

                const clothing = {

                    ...ai,

                    image: reader.result,

                    name:
                        ai.type || "Clothing"

                };

                await addClothing(

                    window.FashionAI.database,

                    clothing

                );

                result.innerHTML = `

<h3>✅ Clothing Saved</h3>

<p><b>Type:</b> ${clothing.type}</p>

<p><b>Category:</b> ${clothing.category}</p>

<p><b>Color:</b> ${clothing.primaryColor}</p>

<p><b>Material:</b> ${clothing.material}</p>

`;

                window.dispatchEvent(

                    new Event("clothingAdded")

                );

            }

            catch (error) {

                console.error(error);

                result.innerHTML =

                    `❌ ${error.message}`;

            }

        };

        reader.readAsDataURL(file);

    });

});
