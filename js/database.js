// =====================================
// FashionAI Database Manager
// database.js
// =====================================

const DB_NAME = "FashionAI_DB";
const DB_VERSION = 2;

const CLOTHING_STORE = "wardrobe";
const OUTFIT_STORE = "outfits";
const HISTORY_STORE = "history";

let db = null;

// =====================================
// Initialize Database
// =====================================

export function initDatabase() {

    return new Promise((resolve, reject) => {

        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {

            db = request.result;

            db.onversionchange = () => {
                db.close();
                alert("Database updated. Please reload the app.");
            };

            resolve(db);
        };

        request.onupgradeneeded = (event) => {

            db = event.target.result;

            // Wardrobe Store
            if (!db.objectStoreNames.contains(CLOTHING_STORE)) {

                const clothing = db.createObjectStore(
                    CLOTHING_STORE,
                    {
                        keyPath: "id"
                    }
                );

                clothing.createIndex(
                    "category",
                    "category",
                    { unique: false }
                );

                clothing.createIndex(
                    "color",
                    "color",
                    { unique: false }
                );

                clothing.createIndex(
                    "season",
                    "season",
                    { unique: false }
                );

                clothing.createIndex(
                    "favorite",
                    "favorite",
                    { unique: false }
                );
            }

            // Outfit Store
            if (!db.objectStoreNames.contains(OUTFIT_STORE)) {

                db.createObjectStore(
                    OUTFIT_STORE,
                    {
                        keyPath: "id"
                    }
                );
            }

            // History Store
            if (!db.objectStoreNames.contains(HISTORY_STORE)) {

                db.createObjectStore(
                    HISTORY_STORE,
                    {
                        keyPath: "id"
                    }
                );
            }

        };

    });

}

// =====================================
// Save Clothing
// =====================================

export async function saveClothing(item) {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            CLOTHING_STORE,
            "readwrite"
        );

        const store =
            transaction.objectStore(
                CLOTHING_STORE
            );

        if (!item.id) {
            item.id = crypto.randomUUID();
        }

        item.dateAdded = Date.now();

        const request = store.put(item);

        request.onsuccess = () => resolve(item);

        request.onerror = () => reject(request.error);

    });

}

// =====================================
// Get All Clothes
// =====================================

export async function getAllClothes() {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CLOTHING_STORE,
                "readonly"
            );

        const store =
            transaction.objectStore(
                CLOTHING_STORE
            );

        const request = store.getAll();

        request.onsuccess = () => {

            resolve(request.result);

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

}

// =====================================
// Get One Clothing
// =====================================

export async function getClothing(id) {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CLOTHING_STORE,
                "readonly"
            );

        const store =
            transaction.objectStore(
                CLOTHING_STORE
            );

        const request = store.get(id);

        request.onsuccess = () => {

            resolve(request.result);

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

}

// =====================================
// Update Clothing
// =====================================

export async function updateClothing(item) {

    return saveClothing(item);

}

// =====================================
// Delete Clothing
// =====================================

export async function deleteClothing(id) {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                CLOTHING_STORE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                CLOTHING_STORE
            );

        const request = store.delete(id);

        request.onsuccess = () => resolve(true);

        request.onerror = () => reject(request.error);

    });

}

// =====================================
// Save Outfit
// =====================================

export async function saveOutfit(outfit) {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                OUTFIT_STORE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                OUTFIT_STORE
            );

        if (!outfit.id) {
            outfit.id = crypto.randomUUID();
        }

        const request = store.put(outfit);

        request.onsuccess = () => resolve(outfit);

        request.onerror = () => reject(request.error);

    });

}

// =====================================
// Get Saved Outfits
// =====================================

export async function getSavedOutfits() {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                OUTFIT_STORE,
                "readonly"
            );

        const store =
            transaction.objectStore(
                OUTFIT_STORE
            );

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject(request.error);

    });

}

// =====================================
// Wear History
// =====================================

export async function saveHistory(history) {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                HISTORY_STORE,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                HISTORY_STORE
            );

        if (!history.id) {
            history.id = crypto.randomUUID();
        }

        history.date = Date.now();

        const request = store.put(history);

        request.onsuccess = () => resolve(history);

        request.onerror = () => reject(request.error);

    });

}

// =====================================
// Get History
// =====================================

export async function getHistory() {

    await initDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                HISTORY_STORE,
                "readonly"
            );

        const store =
            transaction.objectStore(
                HISTORY_STORE
            );

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject(request.error);

    });

}
