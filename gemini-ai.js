// gemini-ai.js
// FashionAI Gemini Connection via Cloudflare Worker


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";




// ==========================
// ASK GEMINI AI
// ==========================


export async function askGemini(

prompt,

image=null

){


try{


let imageData = null;



if(image){


imageData =

image.includes(",")

?

image.split(",")[1]

:

image;


}






const response = await fetch(

WORKER_URL,

{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

prompt:prompt,

image:imageData

})


}

);







const data = await response.json();







if(data.error){


console.error(

"Worker Error:",

data.error

);


return "AI error";



}









return (

data.result

||

"AI could not respond"

);



}

catch(error){


console.error(

"Gemini Connection Failed:",

error

);


return "AI connection failed";


}



}
