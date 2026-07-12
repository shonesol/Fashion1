// gemini-ai.js
// FashionAI Gemini Connection


const WORKER_URL =
"https://fashionai-api.shonesol28.workers.dev";





export async function askGemini(

prompt,

image=null

){



try{



let parts = [

{
text: prompt
}

];






// ADD IMAGE

if(image){



let base64 =
image.includes(",")

?

image.split(",")[1]

:

image;






let mimeType =
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








console.log(
"Worker status:",
response.status
);







const text =
await response.text();







console.log(
"Worker raw response:",
text
);








let data;


try{


data = JSON.parse(text);


}

catch{


throw new Error(
"Worker did not return JSON"
);


}








if(data.error){


throw new Error(

data.error.message ||

"Gemini API error"

);


}







const answer =

data

?.candidates?.[0]

?.content?.parts?.[0]

?.text;







if(!answer){


throw new Error(
"No Gemini answer"
);


}






return answer;



}

catch(error){



console.error(

"❌ Gemini Connection Error:",

error

);



throw error;


}



}
