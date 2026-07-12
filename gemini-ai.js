// gemini-ai.js
// FashionAI Gemini Connection via Cloudflare Worker


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";




// ==========================
// SEND REQUEST TO GEMINI
// ==========================


export async function askGemini(

prompt,

image = null

){


try{



let parts = [

{

text:
prompt

}

];







// ==========================
// ADD IMAGE IF AVAILABLE
// ==========================


if(image){



let base64 =
image.includes(",")

?

image.split(",")[1]

:

image;





let mimeType =
image.match(
/data:(.*?);/
)?.[1]
||
"image/jpeg";






parts.push({

inlineData:{


mimeType:mimeType,


data:base64


}

});



}







console.log(
"📤 Sending request to Cloudflare..."
);







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









console.log(

"Cloudflare status:",

response.status

);







const raw = await response.text();





console.log(

"📥 Cloudflare Response:",

raw

);








if(!response.ok){


throw new Error(

"Worker Error: " + raw

);


}







let data;


try{


data = JSON.parse(raw);


}

catch(error){


throw new Error(

"Cloudflare did not return JSON"

);


}








// ==========================
// CHECK GEMINI RESPONSE
// ==========================


if(

data.error

){



throw new Error(

data.error.message ||

"Gemini API Error"

);


}








const answer =

data

?.candidates

?.[0]

?.content

?.parts

?.map(

p=>p.text

)

.join("");








if(!answer){


throw new Error(

"No Gemini response received"

);


}







console.log(

"🤖 Gemini Answer:",

answer

);






return answer.trim();



}

catch(error){



console.error(

"❌ Gemini Connection Failed:",

error

);



throw error;



}


}
