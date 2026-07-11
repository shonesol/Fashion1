// gemini-ai.js
// FashionAI Gemini Connection


const GEMINI_KEY =
"YOUR_GEMINI_API_KEY";



const MODEL =
"gemini-1.5-flash";





export async function askGemini(
prompt,
image=null
){



try{


let parts=[
{
text:prompt
}
];




// Add image if available

if(image){


const base64 =
image.split(",")[1];



parts.push({

inlineData:{

mimeType:"image/jpeg",

data:base64

}

});


}




const response =
await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`,

{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:JSON.stringify({

contents:[

{

parts:parts

}

]

})


}

);





const data =
await response.json();





return (

data
.candidates?.[0]
?.content
?.parts?.[0]
?.text

||
"AI could not respond"

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
error
);


return null;


}



}
