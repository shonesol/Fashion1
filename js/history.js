// =====================================
// FashionAI Ultimate
// history.js - Part 1
// Outfit History Memory
// =====================================


import {

getOutfits,
saveOutfit

}

from "./database.js";


import {

getOutfits

}

from "./database.js";

// =====================================
// Save Worn Outfit
// =====================================

export async function saveWearHistory(

outfit

){


const historyItem = {


...outfit,


wornAt:

new Date()
.toISOString(),


timestamp:

Date.now()


};



return await saveOutfit(
historyItem
);


}




// =====================================
// Get Recent Outfits
// =====================================

export async function getRecentOutfits(

limit=10

){



const outfits =
await getOutfits();



return outfits

.sort(

(a,b)=>

b.timestamp-a.timestamp

)

.slice(
0,
limit
);


}





// =====================================
// Get Outfit Count
// =====================================

export async function getOutfitCount(){


const outfits =
await getOutfits();



return outfits.length;


}




// =====================================
// Find Frequently Used Items
// =====================================

export async function getMostUsedItems(){


const outfits =
await getOutfits();



const usage={};



outfits.forEach(outfit=>{


if(!outfit.items)
return;



outfit.items.forEach(item=>{


usage[item.id] =

(usage[item.id] || 0)+1;



});


});



return usage;


}

// =====================================
// FashionAI Ultimate
// history.js - Part 2
// Style Memory & Analytics
// =====================================


import {

getAllClothes

}

from "./database.js";




// =====================================
// Style Statistics
// =====================================

export async function getStyleStatistics(){



const clothes =
await getAllClothes();



const styles={};

const colors={};

const categories={};



clothes.forEach(item=>{


if(item.style){

styles[item.style] =
(styles[item.style] || 0)+1;

}



if(item.color){

colors[item.color] =
(colors[item.color] || 0)+1;

}



if(item.category){

categories[item.category] =
(categories[item.category] || 0)+1;

}



});



return {


styles,

colors,

categories


};


}





// =====================================
// Weekly Wear Report
// =====================================

export async function weeklyWearReport(){


const outfits =
await getOutfits();



const weekAgo =
Date.now()
-
(7*24*60*60*1000);



const recent =
outfits.filter(

item=>

item.timestamp > weekAgo

);



return {


totalLooks:
recent.length,


averagePerDay:

Math.round(

recent.length/7

),


message:

recent.length

?

"You are exploring your wardrobe well."

:

"Try creating more outfit combinations."



};


}





// =====================================
// Favorite Looks History
// =====================================

export async function getFavoriteLooks(){


const outfits =
await getOutfits();



return outfits.filter(

outfit=>

outfit.favorite === true

);


}





// =====================================
// AI Memory Summary
// =====================================

export async function createFashionMemory(){


const stats =
await getStyleStatistics();



return {


favoriteColors:

Object.keys(
stats.colors
)
.slice(0,5),


favoriteStyles:

Object.keys(
stats.styles
)
.slice(0,5),


wardrobeSize:

Object.values(
stats.categories
)
.reduce(

(a,b)=>

a+b,

0

)


};


}
