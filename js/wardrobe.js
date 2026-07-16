// =====================================
// FashionAI Ultimate
// wardrobe.js - Part 1
// Wardrobe Display System
// =====================================


import {

getAllClothes,
deleteClothing,
updateClothing

}

from "./database.js";



import {

showToast

}

from "./app.js";




// =====================================
// Elements
// =====================================


const wardrobeContainer =
document.getElementById(
"wardrobeContainer"
);



const searchInput =
document.getElementById(
"wardrobeSearch"
);



let wardrobeItems=[];




// =====================================
// Load Wardrobe
// =====================================

export async function loadWardrobe(){



if(!wardrobeContainer)
return;



try{


wardrobeItems =
await getAllClothes();



renderWardrobe(
wardrobeItems
);



}

catch(error){


console.error(
error
);


showToast(
"Unable to load wardrobe"
);


}


}





// =====================================
// Render Wardrobe
// =====================================

function renderWardrobe(

items

){



wardrobeContainer.innerHTML="";



if(!items.length){


wardrobeContainer.innerHTML =

`
<div class="emptyState">

<h3>Your wardrobe is empty</h3>

<p>Add your first clothing item.</p>

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
"clothingCard";



card.innerHTML =

`

<div class="favoriteIcon">

${item.favorite ? "❤️":"🤍"}

</div>


<img src="${item.image}">


<div class="clothingInfo">

<h4>${item.name}</h4>

<p>
${item.category}
</p>

<p>
${item.color}
</p>


<button 
class="deleteBtn"
data-id="${item.id}">
Delete
</button>

</div>

`;



wardrobeContainer.appendChild(
card
);



});



attachActions();

}





// =====================================
// Delete Button
// =====================================

function attachActions(){



document
.querySelectorAll(
".deleteBtn"
)
.forEach(button=>{


button.addEventListener(

"click",

async()=>{


const id =
Number(
button.dataset.id
);



if(
confirm(
"Delete this clothing item?"
)

){


await deleteClothing(
id
);



showToast(
"Item deleted"
);



loadWardrobe();



}


}

);



});


}





// =====================================
// Search Wardrobe
// =====================================

if(searchInput){


searchInput.addEventListener(

"input",

()=>{


const value =
searchInput.value
.toLowerCase();



const filtered =
wardrobeItems.filter(

item=>

item.name
.toLowerCase()
.includes(value)

||

item.category
.toLowerCase()
.includes(value)

||

item.color
.toLowerCase()
.includes(value)

);



renderWardrobe(
filtered
);



});


}

// =====================================
// FashionAI Ultimate
// wardrobe.js - Part 2
// Advanced Wardrobe Controls
// =====================================


import {

getClothingById,
increaseWearCount,
updateLaundryStatus

}

from "./database.js";




// =====================================
// Toggle Favorite
// =====================================

export async function toggleFavorite(id){


const item =
await getClothingById(id);



if(!item)
return;



item.favorite =
!item.favorite;



await updateClothing(
item
);



showToast(
item.favorite
?
"Added to favorites ❤️"
:
"Removed from favorites"
);



loadWardrobe();


}




// =====================================
// Edit Clothing
// =====================================

export async function editClothing(

id,

changes

){


const item =
await getClothingById(id);



if(!item)
return;



const updated = {


...item,

...changes


};



await updateClothing(
updated
);



showToast(
"Clothing updated"
);



loadWardrobe();


}





// =====================================
// Category Filter
// =====================================

export function filterByCategory(

category

){



const filtered =

wardrobeItems.filter(

item=>

item.category === category

);



renderWardrobe(
filtered
);



}





// =====================================
// Sort Wardrobe
// =====================================

export function sortWardrobe(

type

){


const sorted =
[...wardrobeItems];



if(type==="newest"){


sorted.sort(

(a,b)=>

b.createdAt-a.createdAt

);


}



if(type==="mostUsed"){


sorted.sort(

(a,b)=>

(b.timesWorn||0)

-

(a.timesWorn||0)

);


}



renderWardrobe(
sorted
);


}




// =====================================
// Mark As Worn
// =====================================

export async function wearClothing(

id

){


await increaseWearCount(
id
);



showToast(
"Wear history updated"
);



}




// =====================================
// Laundry Controls
// =====================================

export async function markLaundry(

id,

status

){


await updateLaundryStatus(

id,

status

);



showToast(

`Marked as ${status}`

);



loadWardrobe();


}




// =====================================
// Initialize Page
// =====================================

document.addEventListener(

"DOMContentLoaded",

()=>{


loadWardrobe();


}

);
