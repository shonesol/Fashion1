// =====================================
// FashionAI Ultimate
// weather.js - Part 1
// Weather Intelligence System
// =====================================



const WEATHER_API =

"https://api.open-meteo.com/v1/forecast";





// =====================================
// Get Location
// =====================================

export function getUserLocation(){


return new Promise(

(resolve,reject)=>{


if(!navigator.geolocation){


reject(
"Location unavailable"
);


return;


}



navigator.geolocation.getCurrentPosition(

position=>{


resolve({

latitude:
position.coords.latitude,


longitude:
position.coords.longitude


});


},


error=>{


reject(error);


}

);



});


}





// =====================================
// Fetch Weather
// =====================================

export async function getWeather(){


try{


const location =
await getUserLocation();



const response =
await fetch(

`${WEATHER_API}?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`

);



const data =
await response.json();



return {


temperature:

data.current_weather.temperature,


wind:

data.current_weather.windspeed,


condition:

getWeatherCondition(

data.current_weather.weathercode

)


};



}

catch(error){


console.warn(
"Weather unavailable"
);



return {


temperature:25,


wind:0,


condition:"Clear"


};



}


}




// =====================================
// Weather Code Translator
// =====================================

function getWeatherCondition(

code

){


if(code===0)

return "Sunny";


if(code<3)

return "Partly Cloudy";


if(code<60)

return "Rain";


if(code<80)

return "Snow";


return "Cloudy";


}
// =====================================
// FashionAI Ultimate
// weather.js - Part 2
// Weather Styling Intelligence
// =====================================



// =====================================
// Weather Outfit Advice
// =====================================

export function getWeatherOutfitAdvice(

weather

){


if(!weather)

return "Choose an outfit you feel confident wearing.";





const temperature =
weather.temperature;



const condition =
weather.condition
.toLowerCase();





if(condition.includes("rain")){


return {

recommendation:

"Wear a light waterproof jacket, covered shoes and quick-drying fabrics.",


category:

"Rainy Weather"


};


}





if(temperature >= 30){


return {


recommendation:

"Choose breathable clothes like cotton, linen, light colors and comfortable shoes.",


category:

"Hot Weather"


};


}





if(temperature <= 15){


return {


recommendation:

"Layer your outfit with sweaters, jackets, warm fabrics and closed shoes.",


category:

"Cold Weather"


};


}





return {


recommendation:

"Use a balanced outfit with light layers and comfortable fabrics.",


category:

"Normal Weather"


};


}





// =====================================
// Weather Card Renderer
// =====================================

export function displayWeatherCard(

weather

){



const card =

document.getElementById(
"weatherCard"
);



if(!card || !weather)

return;




card.innerHTML =

`

<div class="weatherIcon">

🌤️

</div>


<h3>

${weather.condition}

</h3>


<p>

${weather.temperature}°C

</p>


<span>

${getWeatherOutfitAdvice(weather)
.recommendation}

</span>

`;



}





// =====================================
// Weather Category
// =====================================

export function classifyWeather(

temperature

){


if(temperature>=30)

return "hot";


if(temperature<=15)

return "cold";


return "mild";


}





// =====================================
// Auto Weather Style
// =====================================

export function weatherStyleTags(

weather

){



const type =

classifyWeather(
weather.temperature
);



const styles={


hot:[

"Light colors",

"Cotton",

"Breathable"

],



cold:[

"Layers",

"Jackets",

"Warm fabrics"

],



mild:[

"Smart casual",

"Light layers"

]

};



return (

styles[type]

||
[]

);


}
