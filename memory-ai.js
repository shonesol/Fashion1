// memory-ai.js
// FashionAI Automatic Learning System


import {

getClothes,

saveMemory,

getMemory

}

from "./db.js";







// ==========================
// LEARN USER STYLE
// ==========================


export async function learnUserStyle(

database

){



const clothes =

await getClothes(

database

);






if(clothes.length===0){

return null;

}







let colors={};

let styles={};

let categories={};







clothes.forEach(item=>{



// COLORS


if(item.color){


let color =

item.color.toLowerCase();


colors[color] =

(colors[color] || 0)+1;


}







// STYLES


if(item.style){


let style =

item.style;


styles[style] =

(styles[style] || 0)+1;


}







// CATEGORIES


if(item.category){


categories[item.category] =

(categories[item.category] || 0)+1;


}



});









const favoriteColor =

getMostUsed(colors);



const favoriteStyle =

getMostUsed(styles);



const favoriteCategory =

getMostUsed(categories);









const memory = {


id:"userStyle",


favoriteColor:


favoriteColor || "Unknown",



style:


favoriteStyle || "Personal Style",



favoriteCategory:


favoriteCategory || "Mixed",



learnedAt:

Date.now()



};







await saveMemory(

database,

memory

);






return memory;



}









// ==========================
// FIND MOST USED
// ==========================


function getMostUsed(data){



let result=null;


let highest=0;





Object.keys(data).forEach(key=>{


if(data[key]>highest){


highest=data[key];


result=key;


}



});





return result;



}
