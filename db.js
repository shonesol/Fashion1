// db.js
// FashionAI Local Database Functions


// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(
    database,
    clothing
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



const item = {


...clothing,


laundryStatus:
clothing.laundryStatus || "Clean",


timesWorn:
clothing.timesWorn || 0,


favorite:
clothing.favorite || false,


lastWorn:
null,


lastWashed:
new Date().toISOString(),


createdAt:
Date.now()


};



const request =
store.add(item);



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






// ==========================
// GET ALL CLOTHES
// ==========================

export function getClothes(database){


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
store.getAll();



request.onsuccess=()=>{


resolve(
request.result || []
);


};



request.onerror=()=>{


reject(
request.error
);


};



});


}






// ==========================
// GET SINGLE CLOTHING
// ==========================

export function getClothing(
database,
id
){


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






// ==========================
// UPDATE CLOTHING
// ==========================

export function updateClothing(
database,
item
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
store.put(item);



request.onsuccess=()=>{


resolve();


};



request.onerror=()=>{


reject(
request.error
);


};



});


}






// ==========================
// DELETE CLOTHING
// ==========================

export function deleteClothing(
database,
id
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
store.delete(id);



request.onsuccess=()=>{


resolve();


};



request.onerror=()=>{


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



request.onsuccess=()=>{


const item =
request.result;



if(item){


item.laundryStatus =
status;



if(status==="Clean"){


item.lastWashed =
new Date().toISOString();


item.timesWorn=0;


}



store.put(item);


}



};



transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}






// ==========================
// SAVE WEAR HISTORY
// ==========================

export function saveWearHistory(
database,
outfit
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
[
"history",
"wardrobe"
],
"readwrite"
);



const history =
transaction.objectStore(
"history"
);



history.add({

outfit:outfit,

date:Date.now()

});



const wardrobe =
transaction.objectStore(
"wardrobe"
);



outfit.items?.forEach(item=>{


const request =
wardrobe.get(item.id);



request.onsuccess=()=>{


const clothing =
request.result;



if(clothing){


clothing.timesWorn =
(clothing.timesWorn || 0)+1;


clothing.lastWorn =
Date.now();


wardrobe.put(clothing);


}



};


});



transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}






// ==========================
// SAVE AI MEMORY
// ==========================

export function saveMemory(
database,
data
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"memory",
"readwrite"
);



const store =
transaction.objectStore(
"memory"
);



store.put({

id:data.id,

...data

});



transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}






// ==========================
// GET AI MEMORY
// ==========================

export function getMemory(
database,
id
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"memory",
"readonly"
);



const store =
transaction.objectStore(
"memory"
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
