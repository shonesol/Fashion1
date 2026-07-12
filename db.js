// db.js
// FashionAI Database Functions


// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(database, clothing){

return new Promise((resolve,reject)=>{


try{


console.log(
"📦 ADD CLOTHING STARTED"
);


console.log(
"Database:",
database
);


console.log(
"Item:",
clothing
);



if(!database){

reject(
new Error("Database missing")
);

return;

}




const transaction =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



const item = {


...clothing,


laundryStatus:
clothing.laundryStatus || "Clean",


timesWorn:
clothing.timesWorn || 0,


favorite:
clothing.favorite || false,


createdAt:
clothing.createdAt || Date.now()


};





const request =
store.add(item);





request.onsuccess = ()=>{


console.log(
"✅ CLOTHING SAVED ID:",
request.result
);


resolve(request.result);


};





request.onerror = ()=>{


console.error(
"❌ SAVE ERROR:",
request.error
);


reject(request.error);


};




}

catch(error){


console.error(
"❌ ADD CLOTHING FAILED:",
error
);


reject(error);


}



});


}









// ==========================
// GET ALL CLOTHES
// ==========================


export function getClothes(database){


return new Promise((resolve,reject)=>{


try{


const transaction =
database.transaction(
"wardrobe",
"readonly"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.getAll();





request.onsuccess = ()=>{


console.log(
"👕 CLOTHES FOUND:",
request.result
);



resolve(
request.result || []
);



};





request.onerror = ()=>{


reject(request.error);


};



}

catch(error){


reject(error);


}



});


}









// ==========================
// GET ONE CLOTHING
// ==========================


export function getClothing(database,id){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"wardrobe",
"readonly"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.get(id);



request.onsuccess = ()=>{


resolve(
request.result
);


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// UPDATE CLOTHING
// ==========================


export function updateClothing(database,item){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.put(item);



request.onsuccess = ()=>{


resolve();


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// DELETE CLOTHING
// ==========================


export function deleteClothing(database,id){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.delete(id);



request.onsuccess = ()=>{


console.log(
"🗑 Deleted"
);


resolve();


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// UPDATE LAUNDRY
// ==========================


export function updateLaundryStatus(
database,
id,
status
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.get(id);



request.onsuccess = ()=>{


const item =
request.result;



if(!item){


reject(
"Item not found"
);


return;


}



item.laundryStatus =
status;



store.put(item);



};



transaction.oncomplete = ()=>{


resolve();


};



transaction.onerror = ()=>{


reject(
transaction.error
);


};



});


}









// ==========================
// SAVE MEMORY
// ==========================


export function saveMemory(database,data){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"preferences",
"readwrite"
);



const store =
transaction.objectStore(
"preferences"
);



const request =
store.put({

id:data.id,

...data

});



request.onsuccess = ()=>{


resolve();


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// GET MEMORY
// ==========================


export function getMemory(database,id){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"preferences",
"readonly"
);



const store =
transaction.objectStore(
"preferences"
);



const request =
store.get(id);



request.onsuccess = ()=>{


resolve(
request.result || null
);


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// SAVE HISTORY
// ==========================


export function saveHistory(database,data){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"history",
"readwrite"
);



const store =
transaction.objectStore(
"history"
);



const request =
store.add({

outfit:data,

date:Date.now()

});



request.onsuccess = ()=>{


resolve();


};



request.onerror = ()=>{


reject(
request.error
);


};



});


}
