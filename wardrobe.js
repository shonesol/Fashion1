// wardrobe.js
// FashionAI Smart Wardrobe


import {
getClothes,
deleteClothing,
updateClothing,
updateLaundryStatus
}
from "./db.js";



let database = null;



// ==========================
// CONNECT DATABASE
// ==========================


window.addEventListener(
"FashionAIConnected",
(event)=>{


database =
event.detail.database;


loadWardrobe();


});





window.addEventListener(
"clothingAdded",
()=>{


loadWardrobe();


});




// ==========================
// ELEMENTS
// ==========================


const wardrobe =
document.getElementById(
"wardrobe"
);


const search =
document.getElementById(
"searchClothes"
);


const filter =
document.getElementById(
"categoryFilter"
);





if(search){

search.oninput =
loadWardrobe;

}



if(filter){

filter.onchange =
loadWardrobe;

}







// ==========================
// LOAD
// ==========================


async function loadWardrobe(){


if(!database){

return;

}



const clothes =
await getClothes(
database
);



let items=[...clothes];





// SEARCH

if(search?.value){


const text =
search.value
.toLowerCase();



items =
items.filter(item=>

item.name
?.toLowerCase()
.includes(text)

||

item.color
?.toLowerCase()
.includes(text)

||

item.category
?.toLowerCase()
.includes(text)

);


}




// FILTER

if(
filter &&
filter.value!=="All"
){


items =
items.filter(item=>

item.category===filter.value

);


}



displayWardrobe(items);


}







// ==========================
// DISPLAY
// ==========================


function displayWardrobe(items){



if(!wardrobe){

return;

}



wardrobe.innerHTML="";





if(items.length===0){


wardrobe.innerHTML=`

<div>

<h2>
👕 Your wardrobe is empty
</h2>

<p>
Add clothes using FashionAI
</p>


</div>

`;

return;


}





items.forEach(item=>{



const card =
document.createElement(
"div"
);



card.className =
"wardrobe-card";




card.innerHTML=`

<img 
src="${item.image}"
class="wardrobe-image"
>



<h3>
${item.name}
</h3>


<p>
Category:
${item.category}
</p>


<p>
Color:
${item.color}
</p>


<p>
Material:
${item.material}
</p>


<p>
Texture:
${item.texture}
</p>


<p>
Style:
${item.style}
</p>


<p>
Status:
${item.laundryStatus}
</p>



<button class="wear">

👕 Wear

</button>


<button class="clean">

🧺 Clean

</button>


<button class="delete">

🗑 Delete

</button>


`;



wardrobe.appendChild(card);






// WEAR BUTTON


card.querySelector(".wear")
.onclick=async()=>{


item.timesWorn++;


item.lastWorn =
Date.now();



await updateClothing(
database,
item
);



loadWardrobe();


};






// CLEAN BUTTON


card.querySelector(".clean")
.onclick=async()=>{


await updateLaundryStatus(

database,

item.id,

"Clean"

);


loadWardrobe();


};






// DELETE


card.querySelector(".delete")
.onclick=async()=>{


if(
confirm(
"Delete this clothing?"
)

){


await deleteClothing(

database,

item.id

);



loadWardrobe();


}



};



});



}
