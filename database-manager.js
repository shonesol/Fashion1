// database-manager.js
// FashionAI Permanent User Storage (IndexedDB)


let database = null;



const DATABASE_VERSION = 7;





// ==========================
// CREATE / OPEN USER DATABASE
// ==========================


export function getDatabase(userId){


return new Promise((resolve,reject)=>{



if(!userId){


reject(
"Missing User ID"
);


return;


}





const request =

indexedDB.open(

"FashionAI_" + userId,

DATABASE_VERSION

);







request.onupgradeneeded = (event)=>{


const db =
event.target.result;





// WARDROBE


if(
!db.objectStoreNames.contains(
"wardrobe"
)
){



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
"style",
"style"
);



wardrobe.createIndex(
"laundryStatus",
"laundryStatus"
);



}








// HISTORY


if(
!db.objectStoreNames.contains(
"history"
)
){


db.createObjectStore(

"history",

{

keyPath:"id",

autoIncrement:true

}

);


}








// OUTFIT PLANS


if(
!db.objectStoreNames.contains(
"plans"
)
){


db.createObjectStore(

"plans",

{

keyPath:"id",

autoIncrement:true

}

);


}








// AI MEMORY


if(
!db.objectStoreNames.contains(
"preferences"
)
){


db.createObjectStore(

"preferences",

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

"✅ User FashionAI Storage Ready:",

database.name

);



resolve(database);



};








request.onerror=()=>{


reject(
request.error
);


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
