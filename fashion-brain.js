// fashion-brain.js
// FashionAI Personal Stylist Intelligence


import {

getMemory,

getClothes

}

from "./db.js";



import {

generateOutfit

}

from "./outfit-generator.js";








// ==========================
// MAIN AI DECISION ENGINE
// ==========================


export async function fashionBrain(

database,

message

){



if(!message){

return "Please tell me what you need help with.";

}




const text =

message.toLowerCase();





const userStyle =

await getMemory(

database,

"userStyle"

);





const clothes =

await getClothes(

database

);





const cleanClothes =

clothes.filter(item=>

item.laundryStatus==="Clean"

);









// GREETING


if(

text.includes("hello") ||

text.includes("hi") ||

text.includes("hey")

){


return "Hello. I am FashionAI, your personal stylist. I can help you choose outfits, match colors and manage your wardrobe.";

}









// OUTFIT REQUEST


if(

text.includes("wear") ||

text.includes("outfit") ||

text.includes("dress") ||

text.includes("what should i put on")

){



const outfit =

await generateOutfit(

database,

"Daily"

);



return outfit.message;



}









// WARDROBE QUESTION


if(

text.includes("wardrobe") ||

text.includes("clothes")

){



return `You have ${cleanClothes.length} clean clothes available. I can create outfits from them.`;



}









// COLOR QUESTION


if(

text.includes("color") ||

text.includes("colour")

){



if(userStyle?.favoriteColor){


return `Your favorite color is ${userStyle.favoriteColor}. I will use it when selecting outfits.`;


}



return "I am learning your favorite colors. Tell me which colors make you feel confident.";

}









// STYLE QUESTION


if(

text.includes("style") ||

text.includes("fashion personality")

){



if(userStyle?.style){


return `Your fashion style is ${userStyle.style}. I will personalize recommendations around it.`;

}



return "Tell me your fashion style. Examples: Elegant, Casual, Sporty, Streetwear.";

}









// OCCASION


if(

text.includes("party") ||

text.includes("wedding") ||

text.includes("work")

){



return "Tell me the occasion details and I will create a suitable outfit.";

}









return (

"I am learning your fashion personality. Ask me about outfits, colors, trends, or your wardrobe."

);



}
