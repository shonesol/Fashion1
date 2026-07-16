// =====================================
// FashionAI Ultimate
// service-worker.js
// Progressive Web App Cache Engine
// =====================================



const CACHE_NAME =

"fashionai-v1";





const FILES_TO_CACHE = [


"./",

"./index.html",

"./wardrobe.html",

"./upload.html",

"./outfit-generator.html",

"./dashboard.html",


"./style.css",


"./js/app.js",

"./js/database.js",

"./js/upload.js",

"./js/wardrobe.js",

"./js/outfit-engine.js",

"./js/hybrid-ai.js",

"./js/offline-engine.js",

"./js/weather.js",

"./js/trend-engine.js",

"./js/voice-assistant.js"


];






// =====================================
// Install Service Worker
// =====================================


self.addEventListener(

"install",

event=>{


event.waitUntil(


caches.open(

CACHE_NAME

)

.then(cache=>{


return cache.addAll(

FILES_TO_CACHE

);


})


);



self.skipWaiting();


});







// =====================================
// Activate
// =====================================


self.addEventListener(

"activate",

event=>{


event.waitUntil(


caches.keys()

.then(keys=>{


return Promise.all(

keys.map(

key=>{


if(

key !== CACHE_NAME

){


return caches.delete(
key
);


}


}

)

);


})


);



self.clients.claim();


});







// =====================================
// Fetch Handler
// =====================================


self.addEventListener(

"fetch",

event=>{


event.respondWith(


caches.match(

event.request

)

.then(response=>{


return response ||

fetch(

event.request

)

.then(networkResponse=>{


return caches.open(

CACHE_NAME

)

.then(cache=>{


cache.put(

event.request,

networkResponse.clone()

);


return networkResponse;


});


})

.catch(()=>{


return caches.match(

"./index.html"

);


});


})


);


});
