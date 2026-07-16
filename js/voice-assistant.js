// =====================================
// FashionAI Ultimate
// voice-assistant.js - Part 1
// Voice Fashion Assistant
// =====================================


import {

askHybridAI

}

from "./hybrid-ai.js";




// =====================================
// Browser Support
// =====================================


const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;




let recognition;



let isListening=false;




// =====================================
// Initialize Voice
// =====================================

export function initVoiceAssistant(){



if(!SpeechRecognition){


console.warn(

"Speech recognition unavailable"

);


return false;


}



recognition =
new SpeechRecognition();



recognition.continuous =
false;


recognition.interimResults =
false;


recognition.lang =
"en-US";





recognition.onstart =
()=>{


isListening=true;


showVoiceStatus(
"Listening..."
);


};





recognition.onend =
()=>{


isListening=false;


showVoiceStatus(
""
);


};






recognition.onerror =
(error)=>{


console.error(
"Voice Error",
error
);


showVoiceStatus(
"Voice error"
);


};





recognition.onresult =
async(event)=>{


const text =

event.results[0][0]
.transcript;



await processVoiceQuestion(
text
);



};





return true;


}




// =====================================
// Start Listening
// =====================================

export function startVoiceAssistant(){



if(!recognition)

initVoiceAssistant();



if(
recognition &&
!isListening
){


recognition.start();


}


}





// =====================================
// Process Question
// =====================================

async function processVoiceQuestion(

question

){



speak(

"I am thinking about your style."

);



const response =

await askHybridAI(
question
);



if(response){


const answer =

response.answer
||
response;



speak(
answer
);


}



}





// =====================================
// Text To Speech
// =====================================

export function speak(

text

){


if(!window.speechSynthesis)

return;



const speech =

new SpeechSynthesisUtterance(
text
);



speech.rate =
1;


speech.pitch =
1;



speechSynthesis.speak(
speech
);


}





// =====================================
// Status Display
// =====================================

function showVoiceStatus(

message

){


const status =

document.getElementById(
"voiceStatus"
);



if(status)

status.textContent =
message;


}
// =====================================
// FashionAI Ultimate
// voice-assistant.js - Part 2
// Voice Commands & Memory
// =====================================



import {

generateOutfit

}

from "./outfit-engine.js";



// =====================================
// Voice Command Router
// =====================================

export async function handleVoiceCommand(

command

){



const text =
command.toLowerCase();




// Create outfit

if(

text.includes("create outfit")

||

text.includes("make outfit")

){



const outfit =
await generateOutfit();



return

`I created a ${outfit.name}. ${outfit.description}`;


}




// Wardrobe

if(

text.includes("my wardrobe")

||

text.includes("show clothes")

){


return

"Opening your wardrobe.";

}




// Style advice

if(

text.includes("what should i wear")

){


return

"Tell me the occasion and weather, and I will create the perfect look.";


}




// Favorites

if(

text.includes("favorite")

){


return

"Your favorite clothing pieces are available in your favorites section.";


}




return null;


}





// =====================================
// Smart Conversation
// =====================================

export async function voiceConversation(

message

){


const commandResult =

await handleVoiceCommand(
message
);



if(commandResult){


speak(
commandResult
);


return commandResult;


}



return null;


}





// =====================================
// Stop Listening
// =====================================

export function stopVoiceAssistant(){


if(

recognition

&&

isListening

){


recognition.stop();


}


}





// =====================================
// Voice Button Setup
// =====================================

export function setupVoiceButton(){


const button =

document.getElementById(
"voiceButton"
);



if(button){


button.addEventListener(

"click",

()=>{


startVoiceAssistant();


}

);


}


}
