// color-matching-ai.js
// FashionAI Color Compatibility System



// ==========================
// COLOR RULES
// ==========================


const colorRules = {


black:[
"white",
"grey",
"red",
"blue",
"gold",
"pink"
],



white:[
"black",
"blue",
"brown",
"green",
"grey"
],



blue:[
"white",
"black",
"grey",
"brown"
],



red:[
"black",
"white",
"blue"
],



green:[
"white",
"brown",
"black"
],



brown:[
"white",
"black",
"beige",
"green"
],



pink:[
"white",
"black",
"grey"
]

};









// ==========================
// CHECK COLOR MATCH
// ==========================


export function colorMatch(
color1,
color2
){



if(!color1 || !color2){

return false;

}



color1 =
color1.toLowerCase();



color2 =
color2.toLowerCase();





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
// OUTFIT COMPATIBILITY
// ==========================


export function checkOutfitCompatibility(
top,
bottom,
shoe
){



let score = 0;


let reasons=[];





// COLORS


if(
colorMatch(
top.color,
bottom.color
)

){


score += 40;


reasons.push(
"Top and bottom colors match"
);


}






if(
colorMatch(
bottom.color,
shoe.color
)

){


score += 30;


reasons.push(
"Shoes match the outfit"
);


}








// STYLE


if(
top.style === bottom.style
){


score +=20;


reasons.push(
"Styles are compatible"
);


}








// MATERIAL


if(
top.material &&
bottom.material &&
top.material===bottom.material
){


score+=10;


reasons.push(
"Materials work together"
);


}






return {


score:score,


reasons:reasons,


good:
score>=60


};



}
