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





// Only available clothes

const cleanClothes =
clothes.filter(item=>

item.laundryStatus==="Clean"

);





if(cleanClothes.length===0){


return {

message:
"No clean clothes available."

};


}






// Categories


const tops =
cleanClothes.filter(item=>

item.category==="Top"

);



const bottoms =
cleanClothes.filter(item=>

item.category==="Bottom"

);



const shoes =
cleanClothes.filter(item=>

item.category==="Shoes"

);



const accessories =
cleanClothes.filter(item=>

item.category==="Accessories"

);









// Select best matches


const top =
chooseByStyle(
tops,
memory
);



const bottom =
chooseByStyle(
bottoms,
memory
);



const shoe =
chooseByStyle(
shoes,
memory
);





const accessory =
chooseByStyle(
accessories,
memory
);






return {


occasion:occasion,


style:
memory?.style ||
"Personal style",


top:top,


bottom:bottom,


shoe:shoe,


accessory:accessory,


message:

createAdvice(
top,
bottom,
shoe,
occasion
)


};



}









// ==========================
// STYLE MATCHING
// ==========================


function chooseByStyle(
items,
memory
){



if(items.length===0){

return null;

}





if(memory?.favoriteColor){



const match =
items.find(item=>

item.color
?.toLowerCase()
.includes(

memory.favoriteColor
.toLowerCase()

)

);



if(match){

return match;

}


}




return items[

Math.floor(

Math.random()*items.length

)

];


}









// ==========================
// AI STYLE MESSAGE
// ==========================


function createAdvice(
top,
bottom,
shoe,
occasion
){



return `

For your ${occasion} occasion,

I recommend:

${top?.name || "a top"}

with

${bottom?.name || "matching trousers"}

and

${shoe?.name || "suitable shoes"}.

This combination matches your wardrobe.

`;

}
