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
// GET AI MEMORY
// ==========================


export function getMemory(

database,

id

){


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
