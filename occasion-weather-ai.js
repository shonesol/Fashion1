// occasion-weather-ai.js
// FashionAI Weather + Occasion Intelligence


import {
getClothes,
getMemory
}
from "./db.js";




// ==========================
// GET WEATHER ADVICE
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
clothes.filter(item=>

item.laundryStatus==="Clean"

);





if(available.length===0){


return {

message:
"No clean clothes available."

};


}







// WEATHER LOGIC


let recommended = [];





if(weather==="cold"){


recommended =
available.filter(item=>

item.category==="Jacket" ||

item.category==="Hoodie" ||

item.category==="Sweater"

);


}



else if(weather==="hot"){


recommended =
available.filter(item=>

item.category==="T-Shirt" ||

item.category==="Dress" ||

item.category==="Shorts"

);


}



else{


recommended =
available;


}








// OCCASION FILTER


if(occasion==="work"){


recommended =
recommended.filter(item=>

item.style==="Formal" ||

item.style==="Elegant"

);


}





if(occasion==="party"){


recommended =
recommended.filter(item=>

item.style==="Elegant" ||

item.style==="Fashion"

);


}








const outfit =

recommended[0]
||
available[0];






return {


item:outfit,


message:

`

For a ${occasion} event with ${weather} weather,

I recommend your ${outfit.color} ${outfit.name}.

This matches your ${memory?.style || "personal"} style.

`

};



}
