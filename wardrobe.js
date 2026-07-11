// wardrobe.js
// FashionAI Smart Wardrobe Display


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


window.addEventListener(

"FashionAIReady",

(event)=>{



database =

event.detail.database;



console.log(

"✅ Wardrobe Database Connected"

);



loadWardrobe();



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
// EVENTS
// ==========================


search?.addEventListener(

"input",

loadWardrobe

);





filter?.addEventListener(

"change",

loadWardrobe

);









// ==========================
// LOAD WARDROBE
// ==========================


async function loadWardrobe(){



if(!database){

console.log(

"No wardrobe database"

);

return;

}





try{



const clothes =

await getClothes(

database

);







let items =

[...clothes];








// SEARCH


const word =

search?.value

?.toLowerCase()

.trim();







if(word){



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



||



(item.category || "")

.toLowerCase()

.includes(word)



);



}









// FILTER


if(

filter &&

filter.value !== "All"

){



items =

items.filter(item=>



item.category === filter.value



);



}







displayWardrobe(items);



}

catch(error){



console.error(

"Wardrobe loading error:",

error

);



}



}









// ==========================
// DISPLAY CLOTHES
// ==========================


function displayWardrobe(items){



if(!wardrobe)

return;







wardrobe.innerHTML="";








if(items.length===0){



wardrobe.innerHTML =

`

<div class="empty-wardrobe">

<h2>
👕 No clothes found
</h2>

<p>
Upload clothing to start FashionAI
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



card.className=

"wardrobe-card";







card.innerHTML =

`

<img

src="${item.image || ""}"

class="wardrobe-image"

onerror="this.style.display='none'"

>


<h3>

${item.name || item.type}

</h3>


<p>
👕 Category:
${item.category || "Unknown"}
</p>


<p>
🎨 Color:
${item.color || "Unknown"}
</p>


<p>
🧵 Material:
${item.material || "Unknown"}
</p>


<p>
〰️ Texture:
${item.texture || "Unknown"}
</p>


<p>
✨ Style:
${item.style || "Unknown"}
</p>


<p>
🧺 Laundry:
${item.laundryStatus || "Clean"}
</p>


<p>
👟 Times worn:
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


card.querySelector(

".clean"

)

.onclick = async()=>{


await updateLaundryStatus(

database,

item.id,

"Clean"

);



loadWardrobe();


};








// DIRTY


card.querySelector(

".dirty"

)

.onclick = async()=>{


await updateLaundryStatus(

database,

item.id,

"Dirty"

);



loadWardrobe();


};









// DELETE


card.querySelector(

".delete"

)

.onclick = async()=>{


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









// AUTO REFRESH AFTER UPLOAD


window.addEventListener(

"clothingAdded",

()=>{


loadWardrobe();


}

);
