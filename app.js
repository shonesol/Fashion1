// app.js
// FashionAI Main Application


import {
startFashionAI
}
from "./auth-manager.js";
import {
startTrendUpdater
}
from "./trend-updater.js";

import {
startListening
}
from "./voice-assistant.js";




// ==========================
// START FASHIONAI SYSTEM
// ==========================

startFashionAI();




// ==========================
// DATABASE READY
// ==========================


window.addEventListener(
"FashionAIReady",
()=>{


console.log(
"✅ FashionAI is ready"
);



console.log(
"User:",
window.FashionAI.user.email
);



console.log(
"Database:",
window.FashionAI.database.name
);




window.dispatchEvent(

new CustomEvent(
"FashionAIConnected",
{

detail:{

user:
window.FashionAI.user,


database:
window.FashionAI.database


}

}

)

);



});








// ==========================
// VOICE BUTTON CONNECTION
// ==========================


document.addEventListener(
"DOMContentLoaded",
()=>{


const voiceBtn =
document.getElementById(
"voiceBtn"
);



if(voiceBtn){


voiceBtn.addEventListener(
"click",
()=>{


startListening();


}

);


console.log(
"🎙️ Voice button connected"
);


}


});
