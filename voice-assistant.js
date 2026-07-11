// voice-assistant.js
// FashionAI Voice Assistant


import {
getPreference,
savePreference
}
from "./db.js";


import {
generateOutfit
}
from "./outfit-generator.js";



let database = null;





// ==========================
// GET DATABASE
// ==========================


window.addEventListener(

"FashionAIConnected",

(event)=>{


database =
event.detail.database;



console.log(
"🎙️ Voice database connected"
);



}

);








// ==========================
// START VOICE
// ==========================


export function startListening(){



const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;





if(!SpeechRecognition){


speak(
"Voice recognition is not supported on this device."
);


return;


}







const recognition =

new SpeechRecognition();




recognition.lang =
"en-US";



recognition.continuous=false;



recognition.interimResults=false;






recognition.start();







recognition.onresult = async(event)=>{



const message =

event.results[0][0].transcript;




document.getElementById(
"userText"
).innerHTML = message;





const answer =

await fashionBrain(
message
);






document.getElementById(
"voiceAnswer"
).innerHTML = answer;





speak(answer);



};




}









// ==========================
// FASHION AI THINKING
// ==========================


async function fashionBrain(message){



message =
message.toLowerCase();






if(
message.includes("hello")
||
message.includes("hi")
){


return (

"Hello. I am FashionAI, your personal fashion assistant. How can I help you?"

);


}








if(
message.includes("wear")
||
message.includes("outfit")
){



const outfit =

await generateOutfit(

database,

"Casual"

);



return outfit.message;



}








if(
message.includes("color")
){


return (

"I can help you match colors. Tell me the clothes you want to combine."

);


}








if(
message.includes("style")
){



const memory =

await getPreference(

database,

"userStyle"

);




return (

"Your saved style is "

+
(memory?.style || "not learned yet")

);



}








return (

"I am learning your fashion preferences. Ask me about outfits, colors, clothes or style."

);



}









// ==========================
// VOICE RESPONSE
// ==========================


export function speak(message){



const speech =

new SpeechSynthesisUtterance(
message
);



speech.rate = 1;



speech.pitch = 1;



window.speechSynthesis.speak(
speech
);



}









// ==========================
// SAVE USER STYLE MEMORY
// CALL THIS AFTER LOGIN
// ==========================


export async function saveUserStyle(){



if(!database){

console.log(
"No database yet"
);


return;


}





await savePreference(

database,

"userStyle",

{

style:"Elegant",

favoriteColor:"Black"

}

);



console.log(
"🧠 Fashion memory saved"
);



}
