// =====================================
// FashionAI Ultimate
// outfit-page.js
// Outfit Generator UI Controller
// =====================================


import {

generateOutfit

}

from "./outfit-engine.js";



import {

saveOutfit

}

from "./database.js";





// =====================================
// Elements
// =====================================


const generateButton =

document.getElementById(
"generateOutfit"
);



const occasionSelect =

document.getElementById(
"occasionSelect"
);



const outfitContainer =

document.getElementById(
"generatedOutfit"
);



const scoreElement =

document.getElementById(
"outfitScore"
);







// =====================================
// Generate Button
// =====================================


if(generateButton){


generateButton.addEventListener(

"click",

async()=>{


await createOutfit();


}

);


}







// =====================================
// Create Outfit
// =====================================


async function createOutfit(){



try{


const occasion =

occasionSelect.value;



const outfit =

await generateOutfit({

occasion

});





displayOutfit(
outfit
);



await saveOutfit({

...outfit,

occasion,

favorite:false

});




}

catch(error){


console.error(

error

);



if(outfitContainer){


outfitContainer.innerHTML =

`

<p>
Add clothing items before generating outfits.
</p>

`;

}


}



}







// =====================================
// Display Outfit
// =====================================


function displayOutfit(

outfit

){



const items =

outfit.items || [];





if(outfitContainer){


outfitContainer.innerHTML =


`

<h3>
${outfit.name}
</h3>


<div class="generatedItems">


${

items.map(item=>


`

<div class="miniClothing">


<img src="${item.image}">


<p>
${item.name}
</p>


<span>
${item.color}
</span>


</div>


`

).join("")

}


</div>


<p>

${outfit.description}

</p>


`;



}




if(scoreElement){


scoreElement.textContent =

`${outfit.score}/100`;


}



}
