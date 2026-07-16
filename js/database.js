// =====================================
// FashionAI Ultimate
// database.js
// IndexedDB Local Storage Engine
// =====================================



const DATABASE_NAME =

"FashionAI_DB";



const DATABASE_VERSION =

1;



const CLOTHING_STORE =

"wardrobe";



const OUTFIT_STORE =

"outfits";





let db;






// =====================================
// Initialize Database
// =====================================


export function initDatabase(){


return new Promise(

(resolve,reject)=>{


const request =

indexedDB.open(

DATABASE_NAME,

DATABASE_VERSION

);





request.onupgradeneeded = event=>{


db =
event.target.result;



if(
!db.objectStoreNames.contains(
CLOTHING_STORE
)

){


const store =

db.createObjectStore(

CLOTHING_STORE,

{

keyPath:"id",

autoIncrement:true

}

);



store.createIndex(
"category",
"category"
);



store.createIndex(
"color",
"color"
);



store.createIndex(
"favorite",
"favorite"
);



}






if(
!db.objectStoreNames.contains(
OUTFIT_STORE
)

){


db.createObjectStore(

OUTFIT_STORE,

{

keyPath:"id",

autoIncrement:true

}

);


}



};





request.onsuccess = event=>{


db =
event.target.result;


resolve();


};





request.onerror = error=>{


reject(error);


};



}


);

}






// =====================================
// Add Clothing
// =====================================


export function saveClothing(item){


return new Promise(

(resolve,reject)=>{


const transaction =

db.transaction(

CLOTHING_STORE,

"readwrite"

);



transaction
.objectStore(
CLOTHING_STORE
)
.add({

...item,

createdAt:

Date.now(),

timesWorn:0,

favorite:false,

laundryStatus:"Clean"


})

.onsuccess=()=>resolve(true);



transaction.onerror=
reject;



}


);

}






// =====================================
// Get All Clothes
// =====================================


export function getAllClothes(){


return new Promise(

(resolve,reject)=>{


const transaction =

db.transaction(

CLOTHING_STORE,

"readonly"

);



const request =

transaction
.objectStore(
CLOTHING_STORE
)
.getAll();



request.onsuccess=()=>{


resolve(
request.result
);



};



request.onerror=
reject;



}


);

}






// =====================================
// Get Single Item
// =====================================


export function getClothingById(id){


return new Promise(

(resolve)=>{


const request =

db.transaction(

CLOTHING_STORE,

"readonly"

)

.objectStore(
CLOTHING_STORE
)

.get(id);



request.onsuccess=()=>{


resolve(
request.result
);


};



}


);

}






// =====================================
// Update Clothing
// =====================================


export function updateClothing(item){


return new Promise(

(resolve,reject)=>{


const request =

db.transaction(

CLOTHING_STORE,

"readwrite"

)

.objectStore(
CLOTHING_STORE
)

.put(item);



request.onsuccess=()=>resolve(true);



request.onerror=
reject;


}

);


}






// =====================================
// Delete Clothing
// =====================================


export function deleteClothing(id){


return new Promise(

(resolve)=>{


db.transaction(

CLOTHING_STORE,

"readwrite"

)

.objectStore(
CLOTHING_STORE
)

.delete(id);



resolve(true);


}

);


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



item.laundryStatus =
status;



return updateClothing(
item
);


}






// =====================================
// Wear Counter
// =====================================


export async function increaseWearCount(id){


const item =

await getClothingById(id);



item.timesWorn =
(item.timesWorn || 0)+1;



return updateClothing(
item
);


}






/// =====================================
// Save Outfit
// =====================================

export function saveOutfit(outfit){

return new Promise((resolve,reject)=>{

const request = db
.transaction(
OUTFIT_STORE,
"readwrite"
)
.objectStore(
OUTFIT_STORE
)
.add({

...outfit,

timestamp:Date.now()

});

request.onsuccess = ()=>{

resolve(true);

};

request.onerror = (event)=>{

reject(event.target.error);

};

});

}

// =====================================
// Get Outfits
// =====================================


export function getOutfits(){


return new Promise(

(resolve)=>{


const request =

db.transaction(

OUTFIT_STORE,

"readonly"

)

.objectStore(
OUTFIT_STORE
)

.getAll();



request.onsuccess=()=>{


resolve(
request.result
);


};


}

);

}






// =====================================
// Statistics
// =====================================


export async function getStatistics(){


const clothes =
await getAllClothes();



const outfits =
await getOutfits();



return {


clothes:

clothes.length,


favorites:

clothes.filter(
item=>item.favorite
)
.length,


outfits:

outfits.length


};



}
// =====================================
// Database Ready
// =====================================

export function isDatabaseReady(){

return db !== undefined && db !== null;

}
