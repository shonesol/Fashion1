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

import {
    showToast,
    showLoading,
    hideLoading
} from "./app.js";

// =====================================
// Elements
// =====================================

const imageInput = document.getElementById("clothingImage");
const cameraInput = document.getElementById("cameraInput");
const preview = document.getElementById("imagePreview");
const saveButton = document.getElementById("saveClothing");

let selectedImage = null;

// =====================================
// Preview Image
// =====================================

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

/// =====================================
// Save Clothing
// =====================================

if (saveButton) {

    saveButton.addEventListener("click", async () => {

        try {

            if (!selectedImage || !preview.src) {
                showToast("Please choose an image first.");
                return;
            }

            await initDatabase();

            showLoading("Analyzing clothing...");

            const imageData = preview.src;

            let analysis = {};

            try {

                const result = await analyzeClothing(imageData);

                if (result && typeof result === "object") {
                    analysis = result;
                }

            } catch (err) {

                console.warn("AI failed. Using offline defaults.", err);

            }

            const clothing = {

                id: crypto.randomUUID(),

                image: imageData,

                name: analysis.name || "Clothing Item",

                category: analysis.category || "Top",

                color: analysis.color || "Unknown",

                style: analysis.style || "Casual",

                material: analysis.material || "Unknown",

                season: analysis.season || "All",

                favorite: false,

                timesWorn: 0,

                laundryStatus: "Clean",

                dateAdded: Date.now()

            };

            await saveClothing(clothing);

            hideLoading();

            showToast("✅ Clothing saved!");

            selectedImage = null;

            if (imageInput) imageInput.value = "";
            if (cameraInput) cameraInput.value = "";

            preview.removeAttribute("src");
            preview.style.display = "none";

            // Go to wardrobe automatically
            window.location.href = "wardrobe.html";

        } catch (error) {

            console.error(error);

            hideLoading();

            showToast("❌ Failed to save clothing.");

        }

    });

}
