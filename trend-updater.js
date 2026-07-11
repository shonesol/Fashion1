// trend-updater.js
// Automatic FashionAI Trend Updates


import {
updateFashionTrends
}
from "./trend-engine.js";


import {
savePreference,
getPreference
}
from "./db.js";






// ==========================
// START TREND UPDATER
// ==========================


export async function startTrendUpdater(

database

){



try{



const user =
window.FashionAI.user;



const userKey =

"fashionTrendUpdate_" + user.uid;





const lastUpdate =

localStorage.getItem(
userKey
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

now - Number(lastUpdate) > week

){





console.log(
"🌍 Updating FashionAI trends..."
);





const trends =

await updateFashionTrends(

database

);






await savePreference(

database,

"fashionTrends",

{

data:trends,

updatedAt:now

}

);







localStorage.setItem(

userKey,

now

);






console.log(
"✅ Fashion trends updated"
);





}

else{


console.log(
"✅ Fashion trends already updated"
);



}



}



catch(error){



console.error(

"Trend update error:",

error

);



}



}
