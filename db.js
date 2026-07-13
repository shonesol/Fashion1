// =====================================
// FashionAI Offline Database
// IndexedDB Manager
// =====================================


const DATABASE_NAME = "FashionAI_DB";

const DATABASE_VERSION = 1;

const STORE_NAME = "wardrobe";


let database;



// Open Database

export function openDB(){

    return new Promise((resolve,reject)=>{


        if(database){

            resolve(database);

            return;

        }



        const request =
        indexedDB.open(
            DATABASE_NAME,
            DATABASE_VERSION
        );



        request.onupgradeneeded = (event)=>{


            database =
            event.target.result;



            if(
            !database.objectStoreNames.contains(STORE_NAME)
            ){

                const store =
                database.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );


                store.createIndex(
                    "category",
                    "category",
                    {
                        unique:false
                    }
                );


                store.createIndex(
                    "color",
                    "color",
                    {
                        unique:false
                    }
                );


            }


        };




        request.onsuccess = (event)=>{


            database =
            event.target.result;


            resolve(database);


        };




        request.onerror = ()=>{


            reject(
            "Database failed to open"
            );


        };



    });

}





// =====================================
// Save Clothing Item
// =====================================


export async function addClothing(clothing){


    const db =
    await openDB();



    return new Promise((resolve,reject)=>{


        const transaction =
        db.transaction(
            STORE_NAME,
            "readwrite"
        );



        const store =
        transaction.objectStore(
            STORE_NAME
        );



        const request =
        store.add(clothing);



        request.onsuccess=()=>{


            resolve(true);


        };



        request.onerror=()=>{


            reject(
            "Could not save clothing"
            );


        };


    });


}






// =====================================
// Get All Clothes
// =====================================


export async function getAllClothes(){


    const db =
    await openDB();



    return new Promise((resolve,reject)=>{


        const transaction =
        db.transaction(
            STORE_NAME,
            "readonly"
        );



        const store =
        transaction.objectStore(
            STORE_NAME
        );



        const request =
        store.getAll();



        request.onsuccess=()=>{


            resolve(
            request.result
            );


        };



        request.onerror=()=>{


            reject([]);


        };



    });



}






// =====================================
// Delete Clothing
// =====================================


export async function deleteClothing(id){


    const db =
    await openDB();



    return new Promise((resolve,reject)=>{


        const transaction =
        db.transaction(
            STORE_NAME,
            "readwrite"
        );



        const store =
        transaction.objectStore(
            STORE_NAME
        );



        const request =
        store.delete(id);



        request.onsuccess=()=>{


            resolve(true);


        };



        request.onerror=()=>{


            reject(false);


        };


    });


}






// =====================================
// Clear Entire Wardrobe
// =====================================


export async function clearWardrobe(){


    const db =
    await openDB();



    return new Promise((resolve,reject)=>{


        const transaction =
        db.transaction(
            STORE_NAME,
            "readwrite"
        );



        const store =
        transaction.objectStore(
            STORE_NAME
        );



        const request =
        store.clear();



        request.onsuccess=()=>{


            resolve(true);


        };



        request.onerror=()=>{


            reject(false);


        };


    });



}
