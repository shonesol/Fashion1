// app.js
// FashionAI Main Application Controller


import {
    startFashionAI
} from "./auth-manager.js";


// ==========================
// START FASHIONAI SYSTEM
// ==========================

startFashionAI();



// ==========================
// WHEN DATABASE IS READY
// ==========================

window.addEventListener(
    "FashionAIReady",
    ()=>{


        console.log(
            "✅ FashionAI App Ready"
        );


        const user =
        window.FashionAI.user;



        const database =
        window.FashionAI.database;



        console.log(
            "Logged in user:",
            user.email
        );


        console.log(
            "Local database connected:",
            database.name
        );



        // Notify other modules

        window.dispatchEvent(

            new CustomEvent(
                "FashionAIConnected",
                {

                    detail:{
                        user:user,
                        database:database
                    }

                }
            )

        );



    }
);



// ==========================
// APP ERROR HANDLER
// ==========================

window.addEventListener(
"error",
(event)=>{


console.error(
"FashionAI Error:",
event.error
);


}
);
