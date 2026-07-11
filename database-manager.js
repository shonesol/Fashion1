// database-manager.js
// FashionAI Local Storage System


const DATABASE_VERSION = 1;



export function getDatabase(userId){


return new Promise((resolve,reject)=>{


if(!userId){

reject(
new Error("Missing user ID")
);

return;

}



const databaseName =
"FashionAI_" + userId;



const request =
indexedDB.open(
databaseName,
DATABASE_VERSION
);



request.onupgradeneeded=(event)=>{


const db =
event.target.result;



// CLOTHING

if(!db.objectStoreNames.contains("wardrobe")){


const wardrobe =
db.createObjectStore(
"wardrobe",
{
keyPath:"id",
autoIncrement:true
}
);



wardrobe.createIndex(
"category",
"category"
);



wardrobe.createIndex(
"color",
"color"
);



wardrobe.createIndex(
"laundryStatus",
"laundryStatus"
);



}



// HISTORY

if(!db.objectStoreNames.contains("history")){


db.createObjectStore(
"history",
{
keyPath:"id",
autoIncrement:true
}
);


}



// OUTFITS

if(!db.objectStoreNames.contains("outfits")){


db.createObjectStore(
"outfits",
{
keyPath:"id",
autoIncrement:true
}
);


}



// AI MEMORY

if(!db.objectStoreNames.contains("memory")){


db.createObjectStore(
"memory",
{
keyPath:"id"
}
);


}



// TREND DATA

if(!db.objectStoreNames.contains("trends")){


db.createObjectStore(
"trends",
{
keyPath:"id"
}
);


}



};



request.onsuccess=()=>{


console.log(
"FashionAI Storage Ready:",
databaseName
);


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
