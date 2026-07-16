// =====================================
// FashionAI Ultimate
// upload.js
// =====================================

console.log("✅ Upload JS loaded");

import {
    initDatabase,
    saveClothing
} from "./database.js";

import {
    analyzeClothing
} from "./hybrid-ai.js";

const imageInput = document.getElementById("clothingImage");
const cameraInput = document.getElementById("cameraInput");
const preview = document.getElementById("imagePreview");
const saveButton = document.getElementById("saveClothing");

let selectedImage = null;

// ================================
// Preview Image
// ================================

function previewImage(event) {

    const file = event.target.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function (e) {

        preview.src = e.target.result;
        preview.style.display = "block";

    };

    reader.readAsDataURL(file);

}

if (imageInput) {

    imageInput.addEventListener("change", previewImage);

}

if (cameraInput) {

    cameraInput.addEventListener("change", previewImage);

}

// ================================
// Upload
// ================================

if (saveButton) {

    saveButton.addEventListener("click", async () => {

        try {

            if (!selectedImage) {

                alert("Please choose an image first.");

                return;

            }

            await initDatabase();

            const imageData = preview.src;

            let analysis;

            try {

                analysis = await analyzeClothing(imageData);

            } catch (e) {

                console.log("AI unavailable. Using fallback.");

                analysis = {
                    name: "Clothing Item",
                    category: "Top",
                    color: "Unknown",
                    style: "Casual",
                    material: "Unknown"
                };

            }

            await saveClothing({

                image: imageData,

                name: analysis.name || "Clothing Item",

                category: analysis.category || "Top",

                color: analysis.color || "Unknown",

                style: analysis.style || "Casual",

                material: analysis.material || "Unknown"

            });

            alert("✅ Clothing added successfully!");

            selectedImage = null;

            if (imageInput) imageInput.value = "";
            if (cameraInput) cameraInput.value = "";

            preview.src = "";
            preview.style.display = "none";

        } catch (error) {

            console.error(error);

            alert("❌ Upload failed.\n\nCheck the browser console for details.");

        }

    });

}
