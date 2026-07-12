// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";



export async function askGemini(prompt, image){


try{


const parts = [

{
text: prompt
}

];




// Add image if available

if(image){


const base64 =
image.split(",")[1];


const mime =
image.split(",")[0]
.match(/:(.*?);/)[1];



parts.push({

inlineData:{

mimeType:mime,

data:base64

}

});


}






const response =
await fetch(

WORKER_URL,

{

method:"POST",

headers:{

"Content-Type":"application/json"

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







if(!response.ok){


throw new Error(

"Worker error: "+response.status

);


}







const data =
await response.json();






console.log(
"Gemini response:",
data
);






return (

data
.candidates?.[0]
?.content
?.parts?.[0]
?.text

|| ""

);



}

catch(error){


console.error(
"Gemini connection failed:",
error
);


throw new Error(
"Load failed"
);


}


}
