 // fashion-memory.js
// FashionAI Personal Learning System



import {

getMemory,

saveMemory,

getClothes

}

from "./db.js";









// ==========================
// SAVE USER STYLE MEMORY
// ==========================


export async function saveUserPreference(

database,

data

){



await saveMemory(

database,

{

id:"userStyle",


...data,


updatedAt:Date.now()

}

);



console.log(

"🧠 FashionAI memory updated"

);



}









// ==========================
// GET USER STYLE
// ==========================


export async function getUserPreference(

database

){



return await getMemory(

database,

"userStyle"

);



}









// ==========================
// LEARN FROM WARDROBE
// ==========================


export async function learnFromWardrobe(

database

){



const clothes =

await getClothes(

database

);





if(!clothes.length){


return null;


}







let colors={};

let styles={};

let categories={};









clothes.forEach(item=>{





if(item.color){


const color =

item.color.toLowerCase();


colors[color]=

(colors[color] || 0)+1;


}








if(item.style){


styles[item.style]=

(styles[item.style] || 0)+1;


}








if(item.category){


categories[item.category]=

(categories[item.category] || 0)+1;


}



});









const favoriteColor =

getMostUsed(colors);



const favoriteStyle =

getMostUsed(styles);



const favoriteCategory =

getMostUsed(categories);








await saveUserPreference(

database,

{


favoriteColor,


style:

favoriteStyle,


favoriteCategory,



totalClothes:

clothes.length



}

);








return {


favoriteColor,


favoriteStyle,


favoriteCategory


};



}









// ==========================
// LEARN FROM WEARING
// ==========================


export async function rememberOutfit(

database,

outfit

){



const memory =

await getUserPreference(

database

);






let history =

memory?.outfits || [];






history.push({


outfit,


date:Date.now()


});







await saveUserPreference(

database,

{


...memory,


outfits:history


}

);



}









// ==========================
// FIND MOST USED
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
