// =====================================
// FashionAI Ultimate
// offline-engine.js
// =====================================


export function fashionFallback(query){

const text = query.toLowerCase();


if(text.includes("office")){

return "For office wear try a clean shirt, trousers, loafers, and neutral colors.";

}


if(text.includes("wedding")){

return "Choose elegant fabrics, balanced colors, and formal accessories.";

}


if(text.includes("casual")){

return "Try jeans, comfortable tops, sneakers, and simple layers.";

}


if(text.includes("color")){

return "Neutral colors like beige, black, white and navy are easy to combine.";

}


return null;

}
