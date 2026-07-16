// =====================================
// FashionAI Ultimate
// dashboard.js
// Home Dashboard Controller
// =====================================


import {

getStatistics,
getAllClothes

}

from "./database.js";



import {

generateOutfit

}

from "./outfit-engine.js";



import {

getDailyRecommendation

}

from "./hybrid-ai.js";



import {

getTrendSummary

}

from "./trend-engine.js";




// =====================================
// Load Dashboard
// =====================================


export async function loadDashboard(){


try{


await loadStats();


await loadTodayOutfit();


await loadAssistantTip();


await loadTrend();


}


catch(error){


console.error(

"Dashboard Error",

error

);


}


}





// =====================================
// Wardrobe Statistics
// =====================================


async function loadStats(){



const stats =

await getStatistics();



const clothes =

document.getElementById(
"clothesCount"
);



const favorites =

document.getElementById(
"favoriteCount"
);



const outfits =

document.getElementById(
"outfitCount"
);




if(clothes)

clothes.textContent =
stats.clothes;



if(favorites)

favorites.textContent =
stats.favorites;



if(outfits)

outfits.textContent =
stats.outfits;



}





// =====================================
// Today's Outfit
// =====================================


async function loadTodayOutfit(){



const card =

document.getElementById(
"todayOutfit"
);



if(!card)

return;




try{


const outfit =

await generateOutfit();



card.innerHTML =

`

<h3>
Today's Look ✨
</h3>


<p>
${outfit.description}
</p>


<div class="outfitScore">

Style Score:
${outfit.score}/100

</div>

`;



}

catch{


card.innerHTML =

`

<p>
Add clothes to generate your first outfit.
</p>

`;



}



}






// =====================================
// AI Assistant Tip
// =====================================


async function loadAssistantTip(){


const element =

document.getElementById(
"assistantTip"
);



if(!element)

return;




const tip =

await getDailyRecommendation();



element.textContent =
tip;


}






// =====================================
// Trend Summary
// =====================================


async function loadTrend(){



const element =

document.getElementById(
"trendSummary"
);



if(!element)

return;




const trend =

await getTrendSummary();



element.textContent =

trend.message;



}






// =====================================
// Start Dashboard
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadDashboard();


}

);
