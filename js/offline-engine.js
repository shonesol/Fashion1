// =====================================
// FashionAI Ultimate
// offline-engine.js - Part 1
// Offline Fashion Knowledge Engine
// =====================================



// =====================================
// Fashion Knowledge Base
// =====================================


const fashionKnowledge = {


"office":

"Choose a clean professional outfit. Try a fitted shirt or blouse with tailored trousers, a pencil skirt, or a smart dress. Add simple accessories.",


"wedding":

"For weddings, choose elegant fabrics, balanced colors, and polished shoes. Avoid wearing the same attention-grabbing colors as the couple.",


"casual":

"For casual days combine comfortable pieces like jeans, relaxed shirts, sneakers, and light layers.",


"black outfit":

"Black is versatile. Add gold accessories, beige, white, or bright colors to create contrast.",


"white shirt":

"A white shirt works with almost everything. Pair it with jeans for casual style or trousers for a formal look.",


"blue jeans":

"Blue jeans match well with white, black, beige, grey, and earth tones.",


"summer":

"Choose breathable fabrics like cotton and linen with lighter colors for hot weather.",


"winter":

"Layer sweaters, jackets, coats, and scarves while keeping colors balanced.",


"rain":

"Choose practical footwear, light jackets, and fabrics that dry quickly.",


"interview":

"For interviews choose professional colors like navy, black, grey, or beige with clean fitting clothes.",


"date":

"For a date choose something comfortable, confident, and suitable for the location.",


"party":

"For parties use statement pieces, elegant accessories, and colors that express personality.",


"travel":

"For travel prioritize comfort with stylish layers and versatile pieces.",


"red dress":

"A red dress already makes a statement. Keep accessories simple with gold, black, or nude tones.",


"green clothes":

"Green pairs beautifully with beige, white, brown, and gold accents.",


"brown clothes":

"Brown works well with cream, beige, black, and earthy colors.",


"gold accessories":

"Gold accessories add warmth and elegance to neutral colors and evening outfits.",


"shoes":

"Choose shoes based on occasion. Sneakers for casual, loafers for smart casual, and formal shoes for professional looks."

};




// =====================================
// Search Offline Knowledge
// =====================================


export function fashionFallback(

question

){



const text =
question.toLowerCase();



for(

const key in fashionKnowledge

){


if(
text.includes(key)
){


return fashionKnowledge[key];


}


}



return null;


}





// =====================================
// Add Custom Knowledge
// =====================================


export function addFashionKnowledge(

keyword,

answer

){


fashionKnowledge[keyword]
=
answer;


}

// =====================================
// FashionAI Ultimate
// offline-engine.js - Part 2
// Expanded Fashion Knowledge
// =====================================



const advancedFashionKnowledge = {


"what should i wear today":

"Check your occasion and weather first. Pick a clean base outfit, then add one statement piece.",


"how to match colors":

"Use balanced combinations. Neutrals like black, white, beige and grey combine easily with stronger colors.",


"what matches black":

"Black matches with white, gold, beige, red, blue and almost all neutral colors.",


"what matches white":

"White works with black, navy, denim, beige, brown and bright colors.",


"what matches beige":

"Beige pairs well with brown, white, black, gold and soft earth tones.",


"what matches navy":

"Navy looks excellent with white, beige, grey and brown.",


"formal outfit":

"For formal style choose structured clothing, clean shoes, minimal accessories and elegant colors.",


"smart casual":

"Combine formal and relaxed pieces: blazer with jeans, shirt with chinos, or a dress with simple shoes.",


"minimal style":

"Choose simple shapes, neutral colors and quality basics that mix easily.",


"street style":

"Try relaxed fits, sneakers, layered pieces and expressive accessories.",


"elegant style":

"Focus on fitted clothing, refined colors, quality fabrics and simple accessories.",


"how to look expensive":

"Prioritize good fit, clean clothes, coordinated colors and simple quality accessories.",


"small wardrobe":

"Build around versatile basics: white shirt, jeans, black trousers, neutral jacket and comfortable shoes.",


"closet organization":

"Arrange clothes by category, color and season. Keep frequently used items easy to access.",


"shoe matching":

"Match shoes with the outfit mood. Formal clothes need polished shoes, casual outfits work with sneakers.",


"bag matching":

"Neutral bags match most outfits. Use statement bags to add personality.",


"jewelry":

"Match jewelry with the occasion. Keep professional looks subtle and use stronger pieces for events.",


"accessories":

"Accessories should complete an outfit, not overpower it.",


"summer outfit":

"Use lightweight fabrics, breathable clothing and brighter colors.",


"rainy season":

"Choose jackets, covered shoes and fabrics that handle moisture well.",


"winter outfit":

"Layer sweaters, coats and scarves while maintaining color balance.",


"office shoes":

"Choose comfortable professional shoes like loafers, flats or clean formal shoes.",


"weekend":

"Relaxed jeans, comfortable tops and casual footwear work well.",


"airport outfit":

"Choose comfortable layers, stretch fabrics and easy footwear.",


"date night":

"Choose an outfit that fits the location and makes you feel confident.",


"clean clothes":

"Store clean clothes separately and wash items based on fabric needs.",


"denim":

"Denim pairs well with white, black, beige and other casual colors.",


"leather jacket":

"A leather jacket works well with jeans, boots and simple shirts.",


"sneakers":

"Sneakers work best with casual, streetwear and smart casual outfits.",


"heels":

"Heels add elegance to dresses, formal outfits and evening looks.",


"belt":

"Match belts with shoes for a more polished appearance.",


"layering":

"Layer pieces with different lengths and textures to create depth."

};




// =====================================
// Merge Knowledge
// =====================================

Object.assign(

fashionKnowledge,

advancedFashionKnowledge

);



// =====================================
// Knowledge Count
// =====================================

export function getKnowledgeCount(){


return Object.keys(
fashionKnowledge
).length;


}
// =====================================
// FashionAI Ultimate
// offline-engine.js - Part 3
// Final Offline Fashion Brain
// =====================================



// =====================================
// Outfit Templates
// =====================================


const outfitTemplates = {


office:[

{
top:"White shirt",
bottom:"Black trousers",
shoes:"Loafers",
style:"Professional"
},

{
top:"Blouse",
bottom:"Pencil skirt",
shoes:"Flats",
style:"Elegant office"
}

],



casual:[

{
top:"T-shirt",
bottom:"Jeans",
shoes:"Sneakers",
style:"Relaxed"
},

{
top:"Casual shirt",
bottom:"Chinos",
shoes:"Sneakers",
style:"Smart casual"
}

],



wedding:[

{
top:"Elegant dress",
bottom:"",
shoes:"Formal shoes",
style:"Celebration"
},

{
top:"Formal suit",
bottom:"",
shoes:"Dress shoes",
style:"Classic"
}

],



travel:[

{
top:"Comfortable shirt",
bottom:"Stretch pants",
shoes:"Sneakers",
style:"Travel"
}

]

};




// =====================================
// Get Outfit Template
// =====================================

export function getOfflineOutfit(

occasion

){


return (

outfitTemplates[
occasion.toLowerCase()
]

||

outfitTemplates.casual

);

}





// =====================================
// Clothing Care Rules
// =====================================


const careRules = {


silk:

"Hand wash or use gentle cleaning. Avoid harsh chemicals.",


cotton:

"Cotton is durable and can usually handle normal washing.",


denim:

"Wash less frequently to preserve color and shape.",


leather:

"Keep leather dry and use appropriate conditioners.",


wool:

"Use gentle washing and avoid high heat."

};





// =====================================
// Fabric Care Advice
// =====================================

export function getCareAdvice(

material

){


return (

careRules[
material.toLowerCase()
]

||

"Follow the clothing label instructions."

);

}





// =====================================
// Style Rules
// =====================================


export function getStyleTip(){


const tips=[


"Good fit improves every outfit.",


"Neutral colors create more outfit options.",


"Accessories can transform a simple look.",


"Quality basics build a strong wardrobe.",


"Confidence is the most important style element.",


"Balance loose and fitted pieces.",


"Choose clothes suitable for the occasion."

];



return tips[

Math.floor(
Math.random()
*
tips.length
)

];

}





// =====================================
// Complete Offline Search
// =====================================

export function searchFashionKnowledge(

query

){


const result =
fashionFallback(
query
);



if(result)

return result;



return getStyleTip();

}
