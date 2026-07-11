// outfit-history.js
// FashionAI Outfit Memory System



import {

saveMemory,

getMemory

}

from "./db.js";









// ==========================
// SAVE OUTFIT HISTORY
// ==========================


export async function saveOutfitHistory(

database,

outfit

){



let memory =

await getMemory(

database,

"outfitHistory"

);






let history =

memory?.history || [];







history.push({


outfit: outfit,


date: Date.now()



});







// Keep last 50 outfits


if(history.length > 50){


history = history.slice(-50);


}








await saveMemory(

database,

{


id:"outfitHistory",


history:history



}

);



console.log(

"👗 Outfit saved to history"

);



}









// ==========================
// GET HISTORY
// ==========================


export async function getOutfitHistory(

database

){



const memory =

await getMemory(

database,

"outfitHistory"

);





return memory?.history || [];



}









// ==========================
// CHECK RECENT OUTFITS
// ==========================


export async function wasRecentlyWorn(

database,

itemName

){



const history =

await getOutfitHistory(

database

);








return history.some(record=>{


return (

JSON.stringify(record.outfit)

.includes(itemName)

);



});



}
