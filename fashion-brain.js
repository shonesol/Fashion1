 // fashion-brain.js
// FashionAI Personal Stylist Intelligence


import {
getMemory,
getClothes
}
from "./db.js";





// ==========================
// MAIN AI DECISION ENGINE
// ==========================


export async function fashionBrain(
database,
message
){



const text =
message.toLowerCase();




// Get user memory

const userStyle =
await getMemory(
database,
"userStyle"
);





// Get wardrobe

const clothes =
await getClothes(
database
);





// Available clothes only

const cleanClothes =
clothes.filter(item=>

item.laundryStatus==="Clean"

);






// ==========================
// OUTFIT REQUEST
// ==========================


if(
text.includes("wear") ||
text.includes("outfit") ||
text.includes("dress")
){



return createOutfitSuggestion(

cleanClothes,

userStyle

);



}







// ==========================
// COLOR QUESTION
// ==========================


if(
text.includes("color")
){



if(userStyle?.favoriteColor){


return `Your preferred color is ${userStyle.favoriteColor}. I will prioritize it when creating outfits.`;

}



return "I am still learning your favorite colors. Tell me the colors you enjoy wearing.";


}







// ==========================
// STYLE QUESTION
// ==========================


if(
text.includes("style")
){



if(userStyle?.style){


return `Your fashion style is ${userStyle.style}. I will use this when suggesting clothes.`;

}



return "Tell me your preferred style, for example elegant, casual, sporty or streetwear.";


}






return "I am learning your fashion personality. You can ask me for outfit ideas, color matching or wardrobe advice.";

}









// ==========================
// OUTFIT CREATION
// ==========================


function createOutfitSuggestion(

clothes,

memory

){



if(
clothes.length===0
){


return "You do not have clean clothes available. Please update your laundry status.";

}






let selected =
clothes[0];





// Match favorite color

if(memory?.favoriteColor){



const match =
clothes.find(item=>

item.color
?.toLowerCase()
.includes(
memory.favoriteColor
.toLowerCase()
)

);



if(match){

selected=match;

}


}






return `I recommend your ${selected.color} ${selected.name}. It matches your ${memory?.style || "personal"} style.`;

}
