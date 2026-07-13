// database-manager.js
// FashionAI IndexedDB Manager


let database = null;


export function startDatabase(){

    return new Promise((resolve,reject)=>{


        const request =
        indexedDB.open(
            "FashionAI",
            1
        );


        request.onupgradeneeded = (event)=>{


            const db =
            event.target.result;


            if(!db.objectStoreNames.contains("wardrobe")){

                db.createObjectStore(
                    "wardrobe",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );

            }


            if(!db.objectStoreNames.contains("preferences")){

                db.createObjectStore(
                    "preferences",
                    {
                        keyPath:"id"
                    }
                );

            }


            if(!db.objectStoreNames.contains("history")){

                db.createObjectStore(
                    "history",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );

            }


        };


        request.onsuccess=(event)=>{


            database =
            event.target.result;


            console.log(
                "✅ Database Ready"
            );


            window.dispatchEvent(
                new CustomEvent(
                    "FashionAIReady",
                    {
                        detail:{
                            database
                        }
                    }
                )
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



export function getDatabase(){

    return database;

}
