// =====================================
// FashionAI Ultimate
// database.js - Part 1
// IndexedDB Storage Engine
// =====================================


const DATABASE_NAME =
"FashionAI_Database";


const DATABASE_VERSION =
1;



let db;



// =====================================
// Object Stores
// =====================================


const STORES = {


    WARDROBE:
    "wardrobe",


    HISTORY:
    "history",


    FAVORITES:
    "favorites",


    OUTFITS:
    "outfits",


    SETTINGS:
    "settings"


};



// =====================================
// Open Database
// =====================================


export function initDatabase(){


return new Promise(

(resolve,reject)=>{


const request =
indexedDB.open(

DATABASE_NAME,

DATABASE_VERSION

);



request.onupgradeneeded =
(event)=>{


    db =
    event.target.result;



// Wardrobe Store

if(!db.objectStoreNames.contains(
    STORES.WARDROBE
)){


const wardrobe =
db.createObjectStore(

    STORES.WARDROBE,

    {
        keyPath:"id",
        autoIncrement:true
    }

);



wardrobe.createIndex(
    "category",
    "category",
    {
        unique:false
    }
);


wardrobe.createIndex(
    "color",
    "color",
    {
        unique:false
    }
);


wardrobe.createIndex(
    "favorite",
    "favorite",
    {
        unique:false
    }
);


wardrobe.createIndex(
    "style",
    "style",
    {
        unique:false
    }
);


}





// History Store

if(!db.objectStoreNames.contains(
    STORES.HISTORY
)){


db.createObjectStore(

    STORES.HISTORY,

    {
        keyPath:"id",
        autoIncrement:true
    }

);


}




// Outfit Store

if(!db.objectStoreNames.contains(
    STORES.OUTFITS
)){


db.createObjectStore(

    STORES.OUTFITS,

    {
        keyPath:"id",
        autoIncrement:true
    }

);


}




// Favorites Store

if(!db.objectStoreNames.contains(
    STORES.FAVORITES
)){


db.createObjectStore(

    STORES.FAVORITES,

    {
        keyPath:"id"
    }

);


}





// Settings Store

if(!db.objectStoreNames.contains(
    STORES.SETTINGS
)){


db.createObjectStore(

    STORES.SETTINGS,

    {
        keyPath:"key"
    }

);


}


};



request.onsuccess =
(event)=>{


db =
event.target.result;


console.log(
"✅ FashionAI Database Ready"
);


resolve(db);


};



request.onerror =
(event)=>{


console.error(
"Database Error",
event
);


reject(
event
);


};



});


}






// =====================================
// Get Database
// =====================================


export function getDB(){


return db;


}

// =====================================
// FashionAI Ultimate
// database.js - Part 2
// Wardrobe CRUD Operations
// =====================================


// =====================================
// Add Clothing Item
// =====================================

export function addClothing(item){


return new Promise(

(resolve,reject)=>{


const transaction =
db.transaction(

    STORES.WARDROBE,

    "readwrite"

);



const store =
transaction.objectStore(
    STORES.WARDROBE
);



const request =
store.add({

    name:
    item.name || "Unknown Item",


    image:
    item.image,


    category:
    item.category || "Other",


    color:
    item.color || "",


    style:
    item.style || "",


    material:
    item.material || "",


    favorite:
    item.favorite || false,


    laundryStatus:
    item.laundryStatus || "Clean",


    timesWorn:
    0,


    createdAt:
    Date.now()


});



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}




// =====================================
// Get All Clothes
// =====================================


export function getAllClothes(){


return new Promise(

(resolve,reject)=>{


const transaction =
db.transaction(

STORES.WARDROBE,

"readonly"

);



const store =
transaction.objectStore(
STORES.WARDROBE
);



const request =
store.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>{


reject(
request.error
);


};



});


}




// =====================================
// Get Single Clothing Item
// =====================================

export function getClothingById(id){


return new Promise(

(resolve,reject)=>{


const transaction =
db.transaction(

STORES.WARDROBE,

"readonly"

);



const store =
transaction.objectStore(
STORES.WARDROBE
);



const request =
store.get(id);



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}




// =====================================
// Update Clothing
// =====================================

export function updateClothing(item){


return new Promise(

(resolve,reject)=>{


const transaction =
db.transaction(

STORES.WARDROBE,

"readwrite"

);



const store =
transaction.objectStore(
STORES.WARDROBE
);



const request =
store.put(item);



request.onsuccess=()=>{

resolve(true);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}




// =====================================
// Delete Clothing
// =====================================

export function deleteClothing(id){


return new Promise(

(resolve,reject)=>{


const transaction =
db.transaction(

STORES.WARDROBE,

"readwrite"

);



const store =
transaction.objectStore(
STORES.WARDROBE
);



const request =
store.delete(id);



request.onsuccess=()=>{

resolve(true);

};



request.onerror=()=>{

reject(
request.error
);

};



});


}

// =====================================
// FashionAI Ultimate
// database.js - Part 3
// Advanced Database Functions
// =====================================


// =====================================
// Search Wardrobe
// =====================================

export async function searchWardrobe(query){

    const clothes =
    await getAllClothes();


    const text =
    query.toLowerCase();


    return clothes.filter(item=>{


        return (

            item.name
            ?.toLowerCase()
            .includes(text)

            ||

            item.category
            ?.toLowerCase()
            .includes(text)

            ||

            item.color
            ?.toLowerCase()
            .includes(text)

            ||

            item.style
            ?.toLowerCase()
            .includes(text)

        );


    });


}



// =====================================
// Filter Clothes
// =====================================

export async function filterWardrobe(type,value){


const clothes =
await getAllClothes();


return clothes.filter(item=>{


return item[type] === value;


});


}




// =====================================
// Save Favorite
// =====================================

export function saveFavorite(item){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(

STORES.FAVORITES,

"readwrite"

);



const store =
transaction.objectStore(
STORES.FAVORITES
);



const request =
store.put(item);



request.onsuccess=()=>{

resolve(true);

};


request.onerror=()=>{

reject(
request.error
);

};


});


}




// =====================================
// Get Favorites
// =====================================

export function getFavorites(){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(

STORES.FAVORITES,

"readonly"

);



const store =
transaction.objectStore(
STORES.FAVORITES
);



const request =
store.getAll();



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};


});


}




// =====================================
// Save Outfit History
// =====================================

export function saveOutfit(outfit){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(

STORES.OUTFITS,

"readwrite"

);



const store =
transaction.objectStore(
STORES.OUTFITS
);



const request =
store.add({

...outfit,

createdAt:
Date.now()

});



request.onsuccess=()=>{

resolve(
request.result
);

};


request.onerror=()=>{

reject(
request.error
);

};


});


}




// =====================================
// Get Outfit History
// =====================================

export function getOutfits(){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(

STORES.OUTFITS,

"readonly"

);



const store =
transaction.objectStore(
STORES.OUTFITS
);



const request =
store.getAll();



request.onsuccess=()=>{

resolve(
request.result
);

};



request.onerror=()=>{

reject(
request.error
);

};


});


}





// =====================================
// Wear Tracking
// =====================================

export async function increaseWearCount(id){


const item =
await getClothingById(id);



if(!item)
return false;



item.timesWorn =
(item.timesWorn || 0)+1;



await updateClothing(item);



return true;


}





// =====================================
// Laundry Status
// =====================================

export async function updateLaundryStatus(

id,

status

){


const item =
await getClothingById(id);



if(!item)
return false;



item.laundryStatus =
status;



await updateClothing(item);



return true;


}





// =====================================
// Dashboard Statistics
// =====================================

export async function getStatistics(){


const clothes =
await getAllClothes();


const outfits =
await getOutfits();


const favorites =
clothes.filter(

item=>item.favorite===true

);



return {


clothes:
clothes.length,


favorites:
favorites.length,


outfits:
outfits.length


};


}





// =====================================
// Initialize Database Automatically
// =====================================

initDatabase();
