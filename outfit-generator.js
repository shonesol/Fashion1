// outfit-generator.js
// FashionAI Advanced Outfit Generator


import {

getClothes,

getMemory

}

from "./db.js";



import {

checkOutfitCompatibility

}

from "./color-matching-ai.js";









// ==========================
// GENERATE OUTFIT
// ==========================


export async function generateOutfit(

database,

occasion="Casual"

){



const clothes =

await getClothes(

database

);






const memory =

await getMemory(

database,

"userStyle"

);








// Available clothes


const cleanClothes =

clothes.filter(item=>

item.laundryStatus === "Clean"

);








if(cleanClothes.length===0){


return {


message:

"🧺 No clean clothes available. Please wash some clothes first."

};


}








// Categories


const tops =

cleanClothes.filter(item=>

item.category

?.toLowerCase()

==="top"

);







const bottoms =

cleanClothes.filter(item=>

item.category

?.toLowerCase()

==="bottom"

);



const shoes =

cleanClothes.filter(item=>

item.category

?.toLowerCase()

==="shoes"

);





const accessories =

cleanClothes.filter(item=>

item.category

?.toLowerCase()

==="accessories"

);








// Select clothes


const top =

chooseBest(

tops,

memory

);



const bottom =

chooseBest(

bottoms,

memory

);



const shoe =

chooseBest(

shoes,

memory

);



const accessory =

chooseBest(

accessories,

memory

);








// Compatibility


let compatibility={


score:0,


reasons:[]

};







if(top && bottom && shoe){


compatibility =

checkOutfitCompatibility(

top,

bottom,

shoe

);


}








return {


occasion,


style:

memory?.style ||

"Personal Style",



top,


bottom,


shoe,


accessory,



compatibility,



message:

createAdvice(

top,

bottom,

shoe,

accessory,

occasion,

compatibility

)


};



}









// ==========================
// AI SELECTION
// ==========================


function chooseBest(

items,

memory

){



if(!items.length)

return null;








let best =

items[0];



let score = 0;







items.forEach(item=>{


let itemScore=0;






// Favorite colour


if(

memory?.favoriteColor &&

item.color

?.toLowerCase()

.includes(

memory.favoriteColor.toLowerCase()

)

){


itemScore +=5;


}







// Style


if(

memory?.style &&

item.style

?.toLowerCase()

.includes(

memory.style.toLowerCase()

)

){


itemScore+=3;


}







// Newer clothes


if(

(item.timesWorn || 0)<3

){


itemScore+=2;


}








if(itemScore>score){


score=itemScore;

best=item;


}



});








return best;



}









// ==========================
// CREATE MESSAGE
// ==========================


function createAdvice(

top,

bottom,

shoe,

accessory,

occasion,

compatibility

){



return `


✨ FashionAI Recommendation


Occasion:

${occasion}



👕 Top:

${top?.name || "Not available"}



👖 Bottom:

${bottom?.name || "Not available"}



👟 Shoes:

${shoe?.name || "Not available"}



👜 Accessory:

${accessory?.name || "None"}



🎯 Match Score:

${compatibility.score || 0}%



Reason:

${
compatibility.reasons?.join(", ")
||
"AI selected based on your wardrobe"

}



`;

}
