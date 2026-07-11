// wardrobe.js
// FashionAI Smart Wardrobe Display


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
deleteClothing,
updateLaundryStatus,
updateClothing
}
from "./db.js";




let database = null;





// ==========================
// CONNECT DATABASE
// ==========================


async function startWardrobe(){


try{


const user =
window.FashionAI.user;



database =
await getDatabase(
user.uid
);



console.log(
"✅ Wardrobe Connected"
);



loadWardrobe();



}


catch(error){


console.error(
"Wardrobe Error:",
error
);


}


}





window.addEventListener(

"FashionAIReady",

()=>{


startWardrobe();


}

);










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








// ==========================
// SEARCH
// ==========================


search?.addEventListener(

"input",

()=>{


loadWardrobe();


}

);





filter?.addEventListener(

"change",

()=>{


loadWardrobe();


}

);









// ==========================
// LOAD CLOTHES
// ==========================


async function loadWardrobe(){



if(!database)
return;





const clothes =
await getClothes(
database
);




let items =
[...clothes];






// SEARCH


if(search.value){


const word =
search.value
.toLowerCase();




items =
items.filter(item=>

(item.name || "")
.toLowerCase()
.includes(word)


||

(item.color || "")
.toLowerCase()
.includes(word)


||

(item.style || "")
.toLowerCase()
.includes(word)


);



}









// CATEGORY FILTER


if(

filter.value !== "All"

){


items =
items.filter(item=>

item.category === filter.value

);



}








displayWardrobe(items);



}









// ==========================
// DISPLAY
// ==========================


function displayWardrobe(items){



wardrobe.innerHTML="";





if(items.length===0){



wardrobe.innerHTML=

`

<div>

<h2>
👕 No clothes found
</h2>


<p>
Upload clothes to train FashionAI
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





card.innerHTML =


`

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
🎨 Color:
${item.color}

</p>



<p>
🧵 Material:
${item.material || "Unknown"}

</p>



<p>
Texture:
${item.texture || "Unknown"}

</p>



<p>
Style:
${item.style}

</p>



<p>
Laundry:
${item.laundryStatus}

</p>



<p>
Times worn:
${item.timesWorn || 0}

</p>




<button class="clean">

🧺 Clean

</button>


<button class="dirty">

👕 Dirty

</button>



<button class="delete">

🗑 Delete

</button>


`;







wardrobe.appendChild(card);









// CLEAN


card
.querySelector(".clean")
.onclick=async()=>{


await updateLaundryStatus(

database,

item.id,

"Clean"

);



loadWardrobe();


};







// DIRTY


card
.querySelector(".dirty")
.onclick=async()=>{


await updateLaundryStatus(

database,

item.id,

"Dirty"

);



loadWardrobe();


};







// DELETE


card
.querySelector(".delete")
.onclick=async()=>{


if(confirm(
"Delete this clothing?"
)){


await deleteClothing(

database,

item.id

);



loadWardrobe();


}


};



});



}








// AUTO UPDATE AFTER UPLOAD


window.addEventListener(

"clothingAdded",

()=>{


loadWardrobe();


}

);
