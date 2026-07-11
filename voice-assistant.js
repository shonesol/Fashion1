// voice-assistant.js
// FashionAI Voice Assistant


import {

getMemory,

saveMemory

}

from "./db.js";



import {

fashionBrain

}

from "./fashion-brain.js";







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





recognition.lang="en-US";



recognition.continuous=false;



recognition.interimResults=false;







recognition.start();









recognition.onresult = async(event)=>{



const message =

event.results[0][0].transcript;






const userText =

document.getElementById(

"userText"

);



if(userText){


userText.innerHTML = message;


}








if(!database){



speak(

"Please wait, FashionAI is connecting your wardrobe."

);



return;


}









// AI THINKING


const answer =

await fashionBrain(

database,

message

);









const voiceAnswer =

document.getElementById(

"voiceAnswer"

);



if(voiceAnswer){


voiceAnswer.innerHTML = answer;


}








// SAVE CHAT MEMORY


await saveConversation(

message,

answer

);






speak(answer);



};







recognition.onerror=(error)=>{


console.log(

"Voice Error:",

error

);



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





speech.rate=1;



speech.pitch=1;



speech.volume=1;





window.speechSynthesis.speak(

speech

);



}









// ==========================
// SAVE CONVERSATION MEMORY
// ==========================


async function saveConversation(

question,

answer

){



if(!database)

return;







const oldMemory =

await getMemory(

database,

"conversation"

);







let history =

oldMemory?.history || [];







history.push({


question:question,


answer:answer,


date:Date.now()


});








await saveMemory(

database,

{


id:"conversation",


history:history


}

);



}









// ==========================
// SAVE USER STYLE
// ==========================


export async function saveUserStyle(){



if(!database){


console.log(

"No database yet"

);


return;


}







await saveMemory(

database,

{


id:"userStyle",


style:"Elegant",


favoriteColor:"Black"


}

);







console.log(

"🧠 Fashion memory saved"

);



}
