// voice-assistant.js
// FashionAI Voice Assistant


import {
getMemory,
saveMemory
}
from "./db.js";



let database = null;



window.addEventListener(
"FashionAIConnected",
(event)=>{


database =
event.detail.database;


});




// ==========================
// VOICE INPUT
// ==========================


export function startListening(){



const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(!SpeechRecognition){


speak(
"Sorry, voice recognition is not supported on this device."
);


return;


}



const recognition =
new SpeechRecognition();



recognition.lang =
"en-US";


recognition.start();




recognition.onresult =
async(event)=>{


const text =
event.results[0][0].transcript;



console.log(
"User:",
text
);



const answer =
await fashionBrain(
text
);



speak(answer);


};



}





// ==========================
// VOICE OUTPUT
// ==========================


export function speak(message){


const speech =
new SpeechSynthesisUtterance(
message
);



speech.rate = 1;


speech.pitch = 1;


speechSynthesis.speak(
speech
);


}







// ==========================
// FASHION BRAIN
// ==========================


async function fashionBrain(message){



message =
message.toLowerCase();





if(message.includes("wear")){


return await outfitAdvice();


}



if(message.includes("color")){


return "I can help you match colors. Tell me the occasion and I will suggest an outfit.";


}



if(message.includes("hello")
||
message.includes("hi")
){


return "Hello. I am FashionAI, your personal wardrobe assistant. How can I help you today?";


}




return "I am learning your fashion style. Please tell me more about your preferences.";



}







// ==========================
// OUTFIT ADVICE
// ==========================


async function outfitAdvice(){



if(!database){

return "Your wardrobe is not connected yet.";


}



const memory =
await getMemory(
database,
"userStyle"
);





if(memory){


return `Based on your style preference, I recommend choosing a ${memory.style} outfit today.`;



}



return "I need to learn your style first. Tell me your favourite colors and fashion style.";


}
