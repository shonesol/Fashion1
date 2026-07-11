// wardrobe-intelligence.js
// FashionAI Advanced Wardrobe Analysis


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







if(clothes.length===0){


return {


totalClothes:0,


style:"Unknown",


favoriteColor:"Unknown",


advice:

"Your wardrobe is empty. Upload clothes so FashionAI can learn your style."

};


}









let categories=[];

let colors={};

let clean=0;

let dirty=0;







clothes.forEach(item=>{



// Categories

if(item.category){

categories.push(

item.category

);

}





// Colors

if(item.color){


colors[item.color]=

(colors[item.color] || 0)+1;


}








// Laundry

if(item.laundryStatus==="Clean"){


clean++;


}

else{


dirty++;


}



});









const favoriteColor =

getMostUsed(colors);








let missing=[];





if(!categories.includes("Top")){


missing.push("Tops/Shirts");


}



if(!categories.includes("Bottom")){


missing.push("Trousers/Skirts");


}



if(!categories.includes("Shoes")){


missing.push("Shoes");


}



if(!categories.includes("Jacket")){


missing.push("Jacket or Outerwear");


}









let advice = "";





if(missing.length > 0){



advice =

`

🧠 FashionAI Wardrobe Report



You have ${clothes.length} clothing items.



Your wardrobe is missing:

${missing.join(", ")}



Adding these pieces will help you create more outfit combinations.

`;



}

else{



advice =

`

🧠 FashionAI Wardrobe Report



Your wardrobe is well balanced.



You have:

${clothes.length} items

${clean} clean clothes

${dirty} clothes needing washing



Your strongest color is ${favoriteColor}.



`;



}








return {


totalClothes:

clothes.length,



cleanClothes:

clean,



dirtyClothes:

dirty,



missingItems:

missing,



style:

memory?.style || "Learning...",



favoriteColor:

memory?.favoriteColor || favoriteColor,



advice:advice



};



}









// ==========================
// FIND MOST USED COLOR
// ==========================


function getMostUsed(data){



let result="Unknown";


let highest=0;





Object.entries(data)

.forEach(([key,value])=>{



if(value>highest){


highest=value;


result=key;


}



});





return result;



}
