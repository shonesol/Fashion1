// db.js
// FashionAI IndexedDB Manager

const DB_NAME = "FashionAI";
const DB_VERSION = 1;
const STORE_NAME = "clothes";

let db = null;

// Open the database
export function openDatabase() {

    return new Promise((resolve, reject) => {

        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

            }

        };

        request.onsuccess = (event) => {

            db = event.target.result;
            resolve(db);

        };

        request.onerror = () => {

            reject("Failed to open FashionAI database.");

        };

    });

}

// Save clothing
export async function saveClothing(item) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = database.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const request = store.add(item);

        request.onsuccess = () => resolve(true);

        request.onerror = () => reject("Could not save clothing.");

    });

}

// Get all clothes
export async function getClothes() {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = database.transaction(STORE_NAME, "readonly");

        const store = tx.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject([]);

    });

}

// Delete clothing
export async function deleteClothing(id) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = database.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const request = store.delete(id);

        request.onsuccess = () => resolve(true);

        request.onerror = () => reject(false);

    });

}

// Clear wardrobe
export async function clearWardrobe() {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = database.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const request = store.clear();

        request.onsuccess = () => resolve(true);

        request.onerror = () => reject(false);

    });

}
