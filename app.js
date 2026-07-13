// app.js
// FashionAI Main Controller


import {
    startFashionAI
} from "./auth-manager.js";


import {
    startDatabase
} from "./database-manager.js";


import {
    generateOutfit
} from "./outfit-generator.js";


import {
    saveOutfitHistory
} from "./outfit-history.js";



console.log(
    "🚀 FashionAI app.js loaded"
);




// ==========================
// INITIALIZE FASHIONAI
// ==========================

async function initFashionAI(){

    try{


        // Start local database first
        const database =
        await startDatabase();



        // Start authentication
        await startFashionAI();



        window.FashionAI =
        window.FashionAI || {};



        // Store database globally
        window.FashionAI.database =
        database;



        console.log(
            "✅ Database connected",
            database
        );



        console.log(
            "✅ FashionAI initialized",
            window.FashionAI
        );



        // Send database to other files
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



    }

    catch(error){


        console.error(
            "❌ FashionAI startup failed:",
            error
        );


    }

}



initFashionAI();




// ==========================
// LISTEN FOR READY
// ==========================

window.addEventListener(
    "FashionAIReady",
    (event)=>{


        console.log(
            "✅ FashionAI ready",
            event.detail.database
        );


    }
);




// ==========================
// CREATE OUTFIT BUTTON
// ==========================

document.addEventListener(
"DOMContentLoaded",
()=>{


const outfitBtn =
document.getElementById(
"outfitBtn"
);



if(outfitBtn){



outfitBtn.onclick =
async()=>{


const box =
document.getElementById(
"outfitResult"
);



if(box){

box.innerHTML =
"🤖 Creating outfit...";

}



try{


const database =
window.FashionAI?.database;



if(!database){

throw new Error(
"Database not ready"
);

}



const outfit =
await generateOutfit(
    database,
    "Casual"
);



await saveOutfitHistory(
    database,
    outfit
);



if(box){

box.innerHTML =
outfit.message ||
JSON.stringify(outfit);

}



}

catch(error){


console.error(
"❌ Outfit error:",
error
);



if(box){

box.innerHTML =
"❌ Outfit failed: " +
error.message;

}



}



};



}



});
