// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";



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




// IMAGE HANDLING

if(image){


let base64=image;

let mimeType="image/jpeg";



if(image.includes(",")){


const split=image.split(",");


base64=split[1];


mimeType =
split[0]
.match(/data:(.*);base64/)
?.[1]
||
"image/jpeg";


}



parts.push({

inlineData:{

mimeType:mimeType,

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






console.log(
"Worker status:",
response.status
);





const text =
await response.text();





console.log(
"Worker response:",
text
);






let data;


try{


data=JSON.parse(text);


}

catch(e){


throw new Error(
"Worker returned invalid JSON: "+text
);


}






if(!response.ok){


throw new Error(
text
);


}







const answer =
data?.candidates?.[0]
?.content?.parts?.[0]
?.text;






if(!answer){


console.log(
"Full Gemini response:",
data
);


throw new Error(
"No AI response received"
);


}






return answer;



}

catch(error){


console.error(
"Gemini Error:",
error
);



return null;


}



}
