// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";



export async function askGemini(
prompt,
image=null
){


let parts=[

{
text:prompt
}

];





if(image){


const base64 =
image.split(",")[1];


const mimeType =
image.substring(
5,
image.indexOf(";")
);



parts.push({

inlineData:{

mimeType:mimeType,

data:base64

}

});


}





const response = await fetch(

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







const data =
await response.json();



console.log(
"Gemini Data:",
data
);





const answer =

data
?.candidates?.[0]
?.content
?.parts?.[0]
?.text;






if(!answer){

throw new Error(
"Gemini returned no answer"
);

}




return answer;


}
