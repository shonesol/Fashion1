// fashion-memory.js
// FashionAI Personal Learning System


import {

getPreference,

savePreference,

getClothes

}

from "./db.js";






// ==========================
// SAVE USER STYLE
// ==========================


export async function saveUserPreference(

database,

data

){



await savePreference(

database,

"userStyle",

{

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



return await getPreference(

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






let colors={};

let styles={};






clothes.forEach(item=>{



if(item.color){


colors[item.color]=

(colors[item.color] || 0)+1;


}





if(item.style){


styles[item.style]=

(styles[item.style] || 0)+1;


}



});







const favoriteColor =

Object.keys(colors)

.sort(

(a,b)=>

colors[b]-colors[a]

)[0];






const favoriteStyle =

Object.keys(styles)

.sort(

(a,b)=>

styles[b]-styles[a]

)[0];







await saveUserPreference(

database,

{

favoriteColor:

favoriteColor || "Unknown",



style:

favoriteStyle || "Unknown"

}

);







return {

favoriteColor,

favoriteStyle

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

outfit:outfit,

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
