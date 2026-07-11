// occasion-weather-ai.js
// FashionAI Weather + Occasion Intelligence


import {
getClothes,
getMemory
}
from "./db.js";





// ==========================
// GET SMART OUTFIT ADVICE
// ==========================


export async function getOutfitAdvice(

database,

weather,

occasion

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







const available =

clothes.filter(item =>

item.laundryStatus==="Clean"

);







if(available.length===0){


return {

message:

"🧺 No clean clothes available. Please wash some clothes first."

};


}








let scored = [];








available.forEach(item=>{


let score = 0;






// WEATHER MATCH


if(weather==="cold"){


if(

item.category==="Jacket" ||

item.category==="Hoodie" ||

item.category==="Sweater"

){


score +=40;


}


}







if(weather==="hot"){


if(

item.category==="T-Shirt" ||

item.category==="Dress" ||

item.category==="Shorts"

){


score +=40;


}


}









// OCCASION MATCH


if(occasion==="work"){



if(

item.style==="Formal" ||

item.style==="Elegant"

){


score +=35;


}



}








if(occasion==="party"){



if(

item.style==="Elegant" ||

item.style==="Fashion"

){


score +=35;


}



}









if(occasion==="travel"){



if(

item.category==="Jacket" ||

item.category==="Shoes"

){


score +=25;


}



}









// USER STYLE MEMORY


if(

memory?.style &&

item.style===memory.style

){


score +=30;


}









// FAVORITE COLOR


if(

memory?.favoriteColor &&

item.color

?.toLowerCase()

.includes(

memory.favoriteColor.toLowerCase()

)

){


score +=20;


}







scored.push({

item,

score


});



});









scored.sort(

(a,b)=>

b.score-a.score

);







const outfit =

scored[0]?.item || available[0];







return {


item:outfit,



score:

scored[0]?.score || 0,



message:

`

✨ FashionAI Smart Outfit



Weather:

${weather}



Occasion:

${occasion}



I recommend:

👕 ${outfit.name}



🎨 Color:

${outfit.color}



Style:

${outfit.style}



This outfit matches your wardrobe and your personal fashion taste.

`

};



}
