// outfit-generator.js
// FashionAI Advanced Outfit Generator


import {
getClothes,
getPreference
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

await getPreference(

database,

"userStyle"

);








// Only clean clothes


const cleanClothes =

clothes.filter(item=>

item.laundryStatus === "Clean"

);







if(cleanClothes.length === 0){


return {


message:

"🧺 You don't have clean clothes available. Please wash some clothes first."


};


}









// Categories


const tops =

cleanClothes.filter(item=>

item.category === "Top"

);



const bottoms =

cleanClothes.filter(item=>

item.category === "Bottom"

);



const shoes =

cleanClothes.filter(item=>

item.category === "Shoes"

);



const accessories =

cleanClothes.filter(item=>

item.category === "Accessories"

);








// Choose items


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









// Check compatibility


let compatibility = {

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


occasion:occasion,



style:

memory?.style ||

"Personal Style",



top:top,


bottom:bottom,


shoe:shoe,


accessory:accessory,



compatibility:compatibility,



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
// SELECT BEST CLOTHING
// ==========================


function chooseBest(

items,

memory

){



if(!items || items.length===0){

return null;

}







// Match favorite color


if(memory?.favoriteColor){



const preferred =

items.find(item=>

item.color &&

item.color
.toLowerCase()
.includes(

memory.favoriteColor
.toLowerCase()

)

);



if(preferred){

return preferred;

}


}







// Match preferred style


if(memory?.style){



const styleMatch =

items.find(item=>

item.style === memory.style

);



if(styleMatch){

return styleMatch;

}



}








// Random choice


return items[

Math.floor(

Math.random()*items.length

)

];



}









// ==========================
// AI MESSAGE
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


✨ FashionAI Outfit Recommendation



Occasion:

${occasion}



👕 Top:

${top?.name || "No top available"}



👖 Bottom:

${bottom?.name || "No trousers/skirt available"}



👟 Shoes:

${shoe?.name || "No shoes available"}



👜 Accessory:

${accessory?.name || "No accessory needed"}




AI Match Score:

${compatibility.score}%



Why:

${compatibility.reasons.length

? compatibility.reasons.join(", ")

: "Basic wardrobe match"}

`;

}
