// wardrobe.js
// FashionAI Smart Wardrobe

import {
    getClothes,
    deleteClothing,
    updateLaundryStatus
} from "./db.js";

let database = null;

const wardrobe =
    document.getElementById("wardrobe");

const search =
    document.getElementById("searchClothes");

const filter =
    document.getElementById("categoryFilter");

window.addEventListener(
    "FashionAIReady",
    (event) => {

        database =
            event.detail.database;

        console.log(
            "✅ Wardrobe Connected"
        );

        loadWardrobe();

    }
);

window.addEventListener(
    "clothingAdded",
    () => {

        console.log(
            "👕 Refresh wardrobe"
        );

        loadWardrobe();

    }
);

search?.addEventListener(
    "input",
    loadWardrobe
);

filter?.addEventListener(
    "change",
    loadWardrobe
);

async function loadWardrobe() {

    if (!database) {

        console.log(
            "Database not ready"
        );

        return;

    }

    try {

        let clothes =
            await getClothes(database);

        const word =
            search?.value
                ?.toLowerCase()
                ?.trim();

        if (word) {

            clothes = clothes.filter(item =>

                (item.name || "")
                    .toLowerCase()
                    .includes(word)

                ||

                (item.color || "")
                    .toLowerCase()
                    .includes(word)

                ||

                (item.category || "")
                    .toLowerCase()
                    .includes(word)

                ||

                (item.style || "")
                    .toLowerCase()
                    .includes(word)

            );

        }

        if (
            filter &&
            filter.value !== "All"
        ) {

            clothes = clothes.filter(
                item =>
                    item.category === filter.value
            );

        }

        displayWardrobe(clothes);

    }

    catch (error) {

        console.error(error);

    }

}
// ==========================
// DISPLAY WARDROBE
// ==========================

function displayWardrobe(items) {

    if (!wardrobe) return;

    wardrobe.innerHTML = "";

    if (items.length === 0) {

        wardrobe.innerHTML = `

<div class="empty-wardrobe">

<h2>👕 No Clothes Yet</h2>

<p>
Upload clothing and it will appear here.
</p>

</div>

`;

        return;

    }

    items.forEach(item => {

        const card = document.createElement("div");

        card.className = "wardrobe-card";

        card.innerHTML = `

<img
src="${item.image || ""}"
class="wardrobe-image"
alt="${item.name || "Clothing"}"
onerror="this.style.display='none';"
>

<h3>
${item.name || item.type || "Clothing"}
</h3>

<p><strong>Category:</strong> ${item.category || "Unknown"}</p>

<p><strong>Color:</strong> ${item.color || item.primaryColor || "Unknown"}</p>

<p><strong>Material:</strong> ${item.material || "Unknown"}</p>

<p><strong>Texture:</strong> ${item.texture || "Unknown"}</p>

<p><strong>Pattern:</strong> ${item.pattern || "Plain"}</p>

<p><strong>Style:</strong> ${item.style || "Casual"}</p>

<p><strong>Season:</strong> ${item.season || "All"}</p>

<p><strong>Laundry:</strong> ${item.laundryStatus || "Clean"}</p>

<p><strong>Times Worn:</strong> ${item.timesWorn || 0}</p>

<div class="wardrobe-buttons">

<button class="clean-btn">
🧺 Clean
</button>

<button class="dirty-btn">
👕 Dirty
</button>

<button class="delete-btn">
🗑 Delete
</button>

</div>

`;

        wardrobe.appendChild(card);

        // Clean button
        card.querySelector(".clean-btn").onclick = async () => {

            await updateLaundryStatus(
                database,
                item.id,
                "Clean"
            );

            loadWardrobe();

        };

        // Dirty button
        card.querySelector(".dirty-btn").onclick = async () => {

            await updateLaundryStatus(
                database,
                item.id,
                "Dirty"
            );

            loadWardrobe();

        };

        // Delete button
        card.querySelector(".delete-btn").onclick = async () => {

            if (!confirm("Delete this clothing?")) return;

            await deleteClothing(
                database,
                item.id
            );

            loadWardrobe();

        };

    });

}
