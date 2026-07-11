// wardrobe-intelligence.js
// FashionAI Wardrobe Analysis


import {
getClothes,
getMemory
}
from "./db.js";




// ==========================
// ANALYZE WARDROBE
// ==========================


export async function analyzeWardrobe(
database
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





const categories =
clothes.map(item=>

item.category

);





let missing=[];





// Check essential garments


if(
!categories.includes("Top")
){

missing.push(
"Basic tops or shirts"
);

}



if(
!categories.includes("Bottom")
){

missing.push(
"Trousers or skirts"
);

}



if(
!categories.includes("Shoes")
){

missing.push(
"Shoes"
);

}



if(
!categories.includes("Jacket")
){

missing.push(
"A jacket or outerwear"
);

}








let advice="";





if(missing.length>0){


advice =

`Your wardrobe needs:

${missing.join(", ")}

These items will help you create more outfits.`;


}

else{


advice =

"Your wardrobe has a good balance of clothing categories.";

}





return {


totalClothes:
clothes.length,


missingItems:
missing,


style:
memory?.style || "Unknown",


favoriteColor:
memory?.favoriteColor || "Unknown",


advice:advice


};



}
