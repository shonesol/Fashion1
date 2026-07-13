// =====================================
// FashionAI Wardrobe Manager
// Displays and manages saved clothes
// =====================================


import {
    getAllClothes,
    deleteClothing
} from "./db.js";




// Elements

const wardrobeGrid =
document.getElementById(
"wardrobeGrid"
);


const searchInput =
document.getElementById(
"wardrobeSearch"
);


const categoryFilter =
document.getElementById(
"categoryFilter"
);





let wardrobeItems = [];





// =====================================
// Load Wardrobe
// =====================================


export async function loadWardrobe(){


    if(!wardrobeGrid){
        return;
    }



    wardrobeItems =
    await getAllClothes();



    displayWardrobe(
    wardrobeItems
    );

}





// =====================================
// Display Items
// =====================================


function displayWardrobe(items){


    wardrobeGrid.innerHTML="";



    if(items.length===0){


        wardrobeGrid.innerHTML=`

        <p>
        Your wardrobe is empty.
        Upload clothes to get started.
        </p>

        `;


        return;

    }





    items.forEach(item=>{


        const card =
        document.createElement(
        "div"
        );



        card.className =
        "clothing-card";



        card.innerHTML = `


        <img src="${item.image}">



        <div class="clothing-info">


        <h3>
        ${item.name}
        </h3>


        <p>
        Category: ${item.category}
        </p>


        <p>
        Color: ${item.color}
        </p>


        <p>
        Season: ${item.season}
        </p>



        <button class="delete-btn"
        data-id="${item.id}">

        🗑 Delete

        </button>


        </div>


        `;



        wardrobeGrid.appendChild(
        card
        );



    });





    activateDeleteButtons();


}







// =====================================
// Delete Buttons
// =====================================


function activateDeleteButtons(){


const buttons =
document.querySelectorAll(
".delete-btn"
);



buttons.forEach(button=>{


button.addEventListener(
"click",
async ()=>{


    const id =
    Number(
    button.dataset.id
    );



    await deleteClothing(
    id
    );



    loadWardrobe();


});


});


}







// =====================================
// Search
// =====================================


if(searchInput){


searchInput.addEventListener(
"input",
()=>{


    filterWardrobe();


});


}







// =====================================
// Category Filter
// =====================================


if(categoryFilter){


categoryFilter.addEventListener(
"change",
()=>{


    filterWardrobe();


});


}







function filterWardrobe(){


const search =
searchInput.value.toLowerCase();



const category =
categoryFilter.value;



const filtered =
wardrobeItems.filter(item=>{


const matchesSearch =

item.name
.toLowerCase()
.includes(search);



const matchesCategory =

category === ""
||
item.category === category;



return matchesSearch
&&
matchesCategory;



});



displayWardrobe(
filtered
);



}
