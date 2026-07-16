// =====================================
// FashionAI Ultimate
// app.js
// Main Application Controller
// =====================================



import {

initDatabase

}

from "./database.js";



import {

getWeather,
displayWeatherCard

}

from "./weather.js";



import {

initVoiceAssistant,
setupVoiceButton

}

from "./voice-assistant.js";





// =====================================
// App Start
// =====================================


document.addEventListener(

"DOMContentLoaded",

async()=>{


console.log(
"🚀 FashionAI Starting..."
);




try{


await initDatabase();


console.log(
"✅ Database Loaded"
);



}

catch(error){


console.error(
"Database failed",
error
);


}





registerServiceWorker();



setGreeting();



loadWeather();



initVoiceAssistant();



setupVoiceButton();



});







// =====================================
// Service Worker
// =====================================


function registerServiceWorker(){



if(
"serviceWorker" in navigator
){



navigator.serviceWorker.register(

"./service-worker.js"

)

.then(()=>{


console.log(
"✅ PWA Ready"
);


})

.catch(error=>{


console.error(
"SW Error",
error
);


});


}



}







// =====================================
// Greeting System
// =====================================


export function setGreeting(){


const element =

document.getElementById(

"greeting"

);



if(!element)

return;



const hour =

new Date()
.getHours();




let message;



if(hour < 12){


message =
"Good morning ✨";


}

else if(hour < 18){


message =
"Good afternoon ✨";


}

else{


message =
"Good evening ✨";


}




element.textContent =
message;



}







// =====================================
// Weather Loader
// =====================================


async function loadWeather(){


try{


const weather =
await getWeather();



displayWeatherCard(
weather
);



}

catch(error){


console.log(
"Weather unavailable"
);


}


}







// =====================================
// Toast System
// =====================================


export function showToast(

message

){



const toast =

document.createElement(
"div"
);



toast.className =
"toast";



toast.textContent =
message;



document.body.appendChild(
toast
);



setTimeout(()=>{


toast.remove();


},3000);



}







// =====================================
// Loading Screen
// =====================================


export function showLoading(

message="Loading..."

){



let loader =

document.getElementById(
"loader"
);



if(!loader){



loader =
document.createElement(
"div"
);



loader.id =
"loader";


document.body.appendChild(
loader
);



}



loader.innerHTML =

`

<div class="loaderBox">

<div class="spinner"></div>

<p>${message}</p>

</div>

`;



}





export function hideLoading(){


const loader =

document.getElementById(
"loader"
);



if(loader)

loader.remove();


}
