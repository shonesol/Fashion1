// color-matching-ai.js
// FashionAI Advanced Color & Outfit Intelligence



// ==========================
// COLOR COMPATIBILITY DATABASE
// ==========================


const colorRules = {


black:[
"white",
"grey",
"red",
"blue",
"gold",
"pink",
"beige",
"purple"
],



white:[
"black",
"blue",
"brown",
"green",
"grey",
"gold",
"purple"
],



blue:[
"white",
"black",
"grey",
"brown",
"beige",
"gold"
],



red:[
"black",
"white",
"blue",
"gold"
],



green:[
"white",
"brown",
"black",
"beige"
],



brown:[
"white",
"black",
"beige",
"green",
"gold"
],



pink:[
"white",
"black",
"grey",
"purple"
],



purple:[
"gold",
"white",
"black",
"pink"
],



orange:[
"blue",
"white",
"black",
"gold"
],



gold:[
"black",
"white",
"purple",
"blue"
],



beige:[
"brown",
"black",
"white",
"gold"
]


};









// ==========================
// COLOR MATCH FUNCTION
// ==========================


export function colorMatch(

color1,

color2

){



if(!color1 || !color2){

return false;

}



color1 = color1
.toLowerCase()
.trim();



color2 = color2
.toLowerCase()
.trim();





// Same color

if(color1===color2){

return true;

}






return (

colorRules[color1]
?.includes(color2)

||

colorRules[color2]
?.includes(color1)

);



}









// ==========================
// FULL OUTFIT ANALYSIS
// ==========================


export function checkOutfitCompatibility(

top,

bottom,

shoe

){



let score = 0;


let reasons=[];





if(!top || !bottom || !shoe){


return {


score:0,


reasons:[

"Not enough clothing items"

],


good:false


};


}









// ==========================
// TOP + BOTTOM COLORS
// ==========================


if(

colorMatch(

top.color,

bottom.color

)

){


score +=40;


reasons.push(

"Top and bottom colors create harmony"

);


}

else{


reasons.push(

"Colors may need adjustment"

);


}









// ==========================
// SHOES MATCH
// ==========================


if(

colorMatch(

bottom.color,

shoe.color

)

){


score +=30;


reasons.push(

"Shoes complete the outfit"

);


}









// ==========================
// STYLE MATCH
// ==========================


if(

top.style &&

bottom.style &&

top.style.toLowerCase()

===

bottom.style.toLowerCase()

){



score +=15;


reasons.push(

"Fashion style is consistent"

);


}









// ==========================
// MATERIAL MATCH
// ==========================


if(

top.material &&

bottom.material &&

top.material

===

bottom.material

){



score +=10;


reasons.push(

"Materials work well together"

);


}









// ==========================
// PATTERN BONUS
// ==========================


if(

top.pattern === "Plain"

||

bottom.pattern === "Plain"

){


score +=5;


reasons.push(

"Simple patterns create balance"

);


}









// Maximum score

if(score>100){

score=100;

}







return {


score:score,


reasons:reasons,


good:

score>=60


};



}
