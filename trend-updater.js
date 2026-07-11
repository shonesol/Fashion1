// trend-updater.js
// Automatic FashionAI Updates


import {
updateFashionTrends
}
from "./trend-engine.js";





export function startTrendUpdater(
database
){



// Update every 7 days


const lastUpdate =
localStorage.getItem(
"fashionTrendUpdate"
);




const now =
Date.now();





const week =
7 *
24 *
60 *
60 *
1000;





if(
!lastUpdate ||
now - lastUpdate > week
){



updateFashionTrends(
database
);



localStorage.setItem(

"fashionTrendUpdate",

now

);



}



}
