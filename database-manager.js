// database-manager.js
// FashionAI Permanent User Storage (IndexedDB)


let database = null;


const DATABASE_VERSION = 8;



// ==========================
// OPEN USER DATABASE
// ==========================

export function getDatabase(userId){

    return new Promise((resolve, reject)=>{


        if(!userId){

            reject("Missing User ID");

            return;

        }



        const request = indexedDB.open(
            "FashionAI_" + userId,
            DATABASE_VERSION
        );



        request.onupgradeneeded = (event)=>{


            const db = event.target.result;



            // WARDROBE STORAGE

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
                    "category",
                    {
                        unique:false
                    }
                );


                wardrobe.createIndex(
                    "color",
                    "primaryColor",
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


                wardrobe.createIndex(
                    "material",
                    "material",
                    {
                        unique:false
                    }
                );


            }




            // OUTFIT HISTORY

            if(!db.objectStoreNames.contains("history")){


                db.createObjectStore(
                    "history",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );


            }




            // SAVED PLANS

            if(!db.objectStoreNames.contains("plans")){


                db.createObjectStore(
                    "plans",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );


            }




            // AI MEMORY

            if(!db.objectStoreNames.contains("preferences")){


                db.createObjectStore(
                    "preferences",
                    {
                        keyPath:"id"
                    }
                );


            }




            // PROFILE

            if(!db.objectStoreNames.contains("profile")){


                db.createObjectStore(
                    "profile",
                    {
                        keyPath:"id"
                    }
                );


            }


        };





        request.onsuccess = (event)=>{


            database = event.target.result;



            // CONNECT GLOBAL DATABASE

            window.FashionAI =
            window.FashionAI || {};



            window.FashionAI.database =
            database;



            console.log(
                "✅ FashionAI Database Ready:",
                database.name
            );



            resolve(database);



        };





        request.onerror = ()=>{


            console.error(
                "❌ Database error:",
                request.error
            );


            reject(request.error);


        };



    });

}







// ==========================
// GET CURRENT DATABASE
// ==========================

export function getCurrentDatabase(){


    return database;


}







// ==========================
// CLOSE DATABASE
// ==========================

export function closeDatabase(){


    if(database){


        database.close();


        database = null;


        if(window.FashionAI){

            window.FashionAI.database = null;

        }


    }


}







// ==========================
// DELETE DATABASE
// ==========================

export function deleteUserDatabase(userId){


    return new Promise((resolve,reject)=>{


        const request =
        indexedDB.deleteDatabase(
            "FashionAI_" + userId
        );



        request.onsuccess = ()=>{


            console.log(
                "🗑 FashionAI database deleted"
            );


            resolve();


        };




        request.onerror = ()=>{


            reject(request.error);


        };



    });


}
