// =====================================
// FashionAI Ultimate
// gemini-ai.js - Part 1
// Gemini AI Client
// =====================================



const API_URL =
"/api/gemini";



// =====================================
// Ask Gemini
// =====================================

export async function askGemini(

prompt,

image=null

){


try{


const response =
await fetch(

API_URL,

{

method:"POST",

headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({


prompt,

image


})


}

);





if(!response.ok){


throw new Error(

"AI request failed"

);


}




const data =
await response.json();




return parseAIResponse(
data
);



}

catch(error){


console.error(

"Gemini Error:",

error

);



return null;


}


}




// =====================================
// Parse Response
// =====================================


function parseAIResponse(data){



if(!data)
return null;



let text =
data.text
||
data.response
||
data.content;



if(!text)
return data;



try{


return JSON.parse(
text
);



}

catch{


return {


text

};


}



}

// =====================================
// FashionAI Ultimate
// gemini-ai.js - Part 2
// Advanced Gemini Functions
// =====================================



// =====================================
// Fashion Chat
// =====================================

export async function askFashionAI(

question

){


const prompt =

`
You are FashionAI,
a premium AI fashion stylist.

Answer this fashion question:

${question}

Give practical advice.
`;



return await askGemini(
prompt
);


}





// =====================================
// Outfit Advice
// =====================================

export async function getAIOutfitAdvice(

wardrobe,

occasion

){


const prompt =

`
Create an outfit recommendation.

Occasion:
${occasion}


Wardrobe:

${JSON.stringify(
wardrobe
)}


Return:

{
"outfit":"",
"reason":"",
"stylingTips":[]
}

`;



return await askGemini(
prompt
);


}





// =====================================
// Image Preparation
// =====================================

export function prepareImage(

base64

){



if(!base64)
return null;



return base64.replace(

/^data:image\/\w+;base64,/,

""

);


}





// =====================================
// Retry System
// =====================================

export async function retryGemini(

prompt,

image=null,

attempts=3

){



for(
let i=0;
i<attempts;
i++
){



const result =
await askGemini(

prompt,

image

);



if(result){

return result;

}



await wait(
1000*(i+1)
);



}



return null;


}





// =====================================
// Delay Helper
// =====================================

function wait(ms){


return new Promise(

resolve=>

setTimeout(
resolve,
ms
)

);


}





// =====================================
// AI Availability Check
// =====================================

export async function checkAIStatus(){


try{


const response =
await fetch(
API_URL,
{

method:"HEAD"

}

);



return response.ok;



}

catch{


return false;


}


}
