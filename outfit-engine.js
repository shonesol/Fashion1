// outfit-engine.js
// FashionAI Outfit Recommendation


import {
getClothes
}
from "./db.js";




export async function recommendOutfit(
database,
occasion="Casual"
){



const clothes =
await getClothes(
database
);




// Only clean clothes

const available =
clothes.filter(item=>

item.laundryStatus==="Clean"

);





const tops =
available.filter(item=>

item.category==="Top"

);



const bottoms =
available.filter(item=>

item.category==="Bottom"

);



const shoes =
available.filter(item=>

item.category==="Shoes"

);





return {


top:
matchColor(tops),


bottom:
matchColor(bottoms),


shoe:
matchColor(shoes)



};



}






function matchColor(items){


if(items.length===0){

return null;

}


return items[
Math.floor(
Math.random()*items.length
)
];


}
