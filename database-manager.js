// database-manager.js
// FashionAI Permanent User Storage (IndexedDB)


let database = null;


const DATABASE_VERSION = 1;



// ==========================
// OPEN USER DATABASE
// ==========================

export function getDatabase(userId){


return new Promise((resolve,reject)=>{


if(!userId){

reject(
"Missing User ID"
);

return;

}



const request = indexedDB.open(

"FashionAI_" + userId,

DATABASE_VERSION

);





request.onupgradeneeded = (event)=>{


const db = event.target.result;



// ==========================
// WARDROBE
// ==========================

if(
!db.objectStoreNames.contains("wardrobe")
){


const store =
db.createObjectStore(

"wardrobe",

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
"style",
"style"
);



store.createIndex(
"material",
"material"
);



}







// ==========================
// OUTFIT HISTORY
// ==========================

if(
!db.objectStoreNames.contains("history")
){


db.createObjectStore(

"history",

{
keyPath:"id",
autoIncrement:true
}

);


}







// ==========================
// AI MEMORY
// ==========================

if(
!db.objectStoreNames.contains("preferences")
){


db.createObjectStore(

"preferences",

{
keyPath:"id"
}

);


}







// ==========================
// PROFILE
// ==========================

if(
!db.objectStoreNames.contains("profile")
){


db.createObjectStore(

"profile",

{
keyPath:"id"
}

);


}



};







request.onsuccess=(event)=>{


database =
event.target.result;


console.log(
"✅ FashionAI Database Ready:",
database.name
);



resolve(database);


};






request.onerror=()=>{


console.error(
"Database error:",
request.error
);



reject(request.error);


};



});


}









// ==========================
// CLOSE DATABASE
// ==========================


export function closeDatabase(){


if(database){


database.close();


database=null;


}


}








// ==========================
// DELETE USER DATABASE
// ==========================


export function deleteUserDatabase(userId){


return new Promise((resolve,reject)=>{


const request =
indexedDB.deleteDatabase(

"FashionAI_" + userId

);



request.onsuccess=()=>{


console.log(
"FashionAI database deleted"
);


resolve();


};



request.onerror=()=>{


reject(request.error);


};



});


}
